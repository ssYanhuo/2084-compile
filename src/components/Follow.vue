<template>
  <div>
    <v-parallax src="../assets/module-bg-s.png" height="400">
      <div
          style="width: 100%; height: 100%; background-image: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 100%);">
        <v-container>
          <v-row
              align="center"
              justify="center">
            <v-col
                class="text-left"
                cols="10"
                md="12">
              <h1 class="text-h4 font-weight-bold mt-12 black--text text-md-h3">
                计算 Follow 集合
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
                  <v-card flat height="520">
                    <v-textarea  outlined height="520" background-color="blue-grey darken-4" dark no-resize placeholder="输入规则"/>
                    <div style="margin: 16px; position: absolute; bottom: 0; right: 0; text-align: center">
                    <p>
                      <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn :loading="isLoading" dark fab id="btn-run" :color="btnColor" style="margin: 0 8px"
                                 v-bind="attrs" v-on="on" @click="submit" >
                            <v-icon dark>{{ btnIcon }}</v-icon>
                          </v-btn>
                        </template>
                        <span>提交</span>
                      </v-tooltip>
                    </p>
                    <p>
                      <v-tooltip left>
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
                  </v-card>
                </div>
              </v-col>
              <v-col cols="12" md="8">
                <p>结果：</p>
                <v-card outlined height="520">
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
  name: "Follow",
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
    };
  },
  methods:{
    submit() {}

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
</style>