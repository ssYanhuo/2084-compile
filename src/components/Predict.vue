<template>
  <div>
    <v-parallax src="../assets/module-bg-s.png" height="400">
      <div style="width: 100%; height: 100%; background-image: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 100%);">
        <v-container>
          <v-row
              align="center"
              justify="center">
            <v-col
                class="text-left"
                cols="10"
                md="11">
              <h1 class="text-h4 font-weight-bold mt-12 black--text text-md-h3">
                预测分析法
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-parallax>
    <v-container style="margin-top: -240px">
      <v-row justify="center">
        <v-col cols="12">
          <v-card :style="{padding: cardPadding + 'px' }">
            <v-row justify="center">
              <v-col cols="12" md="4">
                <div>
                  <p>源数据：</p>
                  <v-textarea  outlined height="320" no-resize label="文法输入" v-model="grammar"/>
                  <v-text-field outlined label="分析字符串" v-model="analyzeString"/>
                </div>
                <div style="text-align: center">
                  <p>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn :loading="isLoading" dark fab id="btn-run" :color="btnColor" style="margin: 0 8px"
                               v-bind="attrs" v-on="on" @click="submit" >
                          <v-icon dark>{{ btnIcon }}</v-icon>
                        </v-btn>
                      </template>
                      <span>提交</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn dark fab color="cyan" :href="blobLink" :download="blobName" style="margin: 0 8px"
                               v-bind="attrs" v-on="on">
                          <v-icon dark>mdi-download</v-icon>
                        </v-btn>
                      </template>
                      <span>保存数据到本地</span>
                    </v-tooltip>
                  </p>
                </div>
              </v-col>
              <v-col cols="12" md="8">
                <p>结果：</p>
                <v-card outlined height="520">
                  <div style="height: 100%">
                    <v-container fluid>
                      <v-row>
                        <v-col cols="2">
                          <v-btn @click="i++">+1</v-btn>
                          <div style="height: 400px">
                            <transition-group style="bottom: 0; position: absolute" name="stack" tag="ul">
                              <li style="list-style: none" class="stack-item my-2" v-for="item in stepStack[i]" :key="item">
                                <v-btn autocapitalize="off" color="primary" outlined>{{ item }}</v-btn>
                              </li>
                            </transition-group>
                          </div>
                        </v-col>
                        <v-col cols="10">
                          <v-row>
                            <v-col cols="12">
                              <div>
                                <transition-group style="right: 0" name="string" tag="div" dir="rtl">
                                  <v-btn outlined color="primary" class="string-item mx-2" v-for="item in stepString[i]" :key="item">{{ item }}</v-btn>
                                </transition-group>
                              </div>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12">
                              <p>{{ stepNote[i] }}</p>
                              <v-simple-table>
                                <template v-slot:default>
                                  <thead>
                                  <tr>
                                    <th
                                        class="text-center text-body-1 font-weight-bold"
                                        v-for="(tableCol, index) in tableCols"
                                        :key="index"
                                        :prop="tableCol">
                                      {{ tableCol }}
                                    </th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr v-for="(data, index) in tableData" :key="index" class="text-center">
                                    <td v-for="(v, k) in data"
                                        :key="k">
                                      {{ v }}
                                    </td>
                                  </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                  <v-overlay absolute :value="showOverlay">
                    <p>等待输入……</p>
                  </v-overlay>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Predict",
  computed: {
    cardPadding() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
        case "xl":
        case "md":
          return 48
        case "xs":
          return 16
        default:
          return 32
      }
    }
  },
  data: function () {
    return {
      isLoading: false,
      btnIcon: 'mdi-check',
      btnColor: 'primary',
      snackbar: false,
      snackbarMessage: '',
      grammar: '',
      analyzeString: '',
      showOverlay: true,
      result: '',
      tab: '',
      tableCols: [],
      tableData: [],
      stepStack: [],
      stepString: [],
      stepNote: [],
      stepPage: 0,
      pageCount: 0,
      i: 0
    };
  },
  methods:{
    submit() {
      this.isLoading = true;
      let data = {
        Result: this.grammar.replace(/(\n[\s\t]*\r*\n)/g, '\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '').replace(/(^\s+)|(\s+$)/g,"").replaceAll('\t', '').split('\n'),
        grals: this.analyzeString
      }
      let that = this
      that.$axios({
        url: '/api_Predict/TempAPI',
        method: 'post',
        data: data,
        paramsSerializer: function (params) {
          return that.$qs.stringify(params, { indices: false })
        }
      })
          .then(function (result) {
            console.log(result)
            that.showOverlay = false
            that.isLoading = false
            that.result = result.data
            that.showTable(that.result.FORMresult)
            that.showStep(that.result.AnalyProcess)
          })
          .catch(function (err) {
            console.log(err)
            that.isLoading = false
          })
    },
    showTable(data){
      this.tableCols = []
      this.tableData = []
      // data[0][0] = "非终结符\\终结符"
      data[0][0] = ''
      this.tableCols = data[0]
      let that = this
      data.forEach(function (e, index) {
        if(index){
          that.tableData.push(e)
        }
      })
    },
    showStep(data){
      let that = this
      that.i = 0
      that.stepStack = []
      that.stepString = []
      that.stepNote = []
      that.stepPage = 0
      that.pageCount = 0
      data.forEach(function (step) {
        that.stepStack.push(step[0].split('\n').reverse())
        that.stepString.push(step[1].split('').reverse())
        that.stepNote.push(step[2])
      })
    }
  }
}
</script>

<style scoped>
/deep/ .v-parallax__content {
  padding: 0 !important;
}

/deep/ .v-input--selection-controls {
  margin-top: 0 !important;
}

/deep/ th {
  border: thin solid rgba(0, 0, 0, 0.06);
}
/deep/ td {
  border: thin solid rgba(0, 0, 0, 0.06);
}
.stack-item {
  transition: all 0.5s;
}
.stack-enter {
  opacity: 0;
  transform: translateY(-30px);
}
.stack-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.stack-leave-active {
  position: absolute;
}
.string-item {
  transition: all 0.5s;
}
.string-enter {
  opacity: 0;
  transform: translateX(30px);
}
.string-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.string-leave-active {
  position: absolute;
}
</style>