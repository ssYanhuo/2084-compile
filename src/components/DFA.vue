<template>
  <el-card header="DFA 最小化">
    <el-row type="flex" justify="center" gutter="16">
      <el-col>
        <div>
          <div>
            <p>转移方式：</p>
            <el-input
                :rows="10"
                placeholder="用空格分隔的转移方式名（单个字母）"
                v-model="DFA_methodsRaw"
                @blur="parseMethods"/>
          </div>
          <div>
            <p>节点名称：</p>
            <el-input
                :rows="10"
                placeholder="用空格分隔的节点名（单个字母）"
                v-model="DFA_nodesRaw"
            @blur="parseNodes"/>
          </div>
          <div>
            <p>状态设置：</p>
            <el-row type="flex" justify="center">
              <el-input
                style="margin-right: 8px"
                placeHolder="开始状态"
                v-model="DFA_start"/>
              <el-input
                style="margin-left: 8px"
                placeholder="结束状态（用空格分隔）"
                v-model="DFA_endRaw"
              @blur="parseEnd"/>
            </el-row>
          </div>
          <div>
            <p>转移过程：</p>
            <el-input
              disabled
              value="添加节点和转移方式后编辑转移过程"
              v-if="DFA_nodes.length <= 0 || DFA_methods.length <= 0"/>
            <DFA_TransferSelector
                v-else
            v-for="(node, index) in DFA_nodes"
            :key="index"
            :methods="DFA_methods"
            :node="node"
            ref="DFA_TransferSelectors"/>
          </div>
        </div>

      </el-col>
      <el-col>
        <el-card shadow="never">
          <div id="graph"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="submit">提交</el-button>
    </el-row>
  </el-card>
</template>

<script>
import DFA_TransferSelector from "@/components/wiget/DFA_TransferSelector";
import vis from "vis";
export default {
  name: "DFA",
  components: {DFA_TransferSelector},
  data: function () {
    return {
      DFA_methodsRaw: '',
      DFA_methods: [],
      DFA_nodesRaw: '',
      DFA_nodes: [],
      DFA_start: '',
      DFA_endRaw: '',
      DFA_end: [],
      DFA_linkData: [],
    };
  },
  methods:{
    drawGraph(context, states, linkData, start, end, methods) {
      let container = document.getElementById("graph")
      let nodes = new vis.DataSet([])
      states.forEach(function (state, index) {
        let node = {id: index, label: 'S' + index}
        if(index === start){
          node.color = {
            background: '#97fc97',
            border: '#2ae82a',
            highlight: {
              background: '#97fc97',
              border: '#2ae82a'
            }
          }
        }
        if(end.indexOf(index) !== -1){
          node.color = {
            background: '#fc9797',
            border: '#e92b2b',
            highlight: {
              background: '#fc9797',
              border: '#e92b2b'
            }
          }
        }
        nodes.add(node)
      })
      let edges = new vis.DataSet([])
      linkData.forEach(function (linkGroup, indexOfGroup) {
        linkGroup.forEach(function (link, indexOfLink){
          let edge = {
            from: states[indexOfGroup],
            to: link,
            label: methods[indexOfLink],
            arrows: {
              to: {
                enabled: true,
                type: "arrow",
                scaleFactor: 0.5
              }
            },
            color:{
              color: '#000000'
            }
          }
          edges.add(edge)
        })
      })
      let data = {
        nodes: nodes,
        edges: edges
      }
      let options = {
        height: "600"
      }
      new vis.Network(container, data, options)
    },
    submit() {
      let params = {
        DFA_EndList_ls: this.DFA_end,
        DFA_StartState_ls: this.DFA_start,
        DFA_StateList_ls: this.DFA_nodes,
        EndCount_ls: this.DFA_end.length,
        SignCount_ls: this.DFA_methods.length,
        Sign_ls: this.DFA_methods,
        StateCount_ls: this.DFA_nodes.length
      }
      let DFA_AdjacencyTable_ls = []
      this.$refs.DFA_TransferSelectors.forEach(function (selector){
        DFA_AdjacencyTable_ls.push(selector.linkData)
      })
      let that = this
      that.$axios({
        url: '/api_DFA/Min_NFA_Input',
        params: params,
        method: "post",
        data: DFA_AdjacencyTable_ls,
        paramsSerializer: function (params) {
          return that.$qs.stringify(params, { indices: false })
        }
      })
      .then(function (result) {
        that.drawGraph(that, result.data.StateListNum, result.data.AdjacencyRelation, result.data.StartStatic, result.data.EndStatic, that.DFA_methods)
      })
      .catch(function (err) {
        alert(err)
      })
    },
    parseMethods() {
      this.DFA_methodsRaw = this.DFA_methodsRaw.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g,"")
      this.DFA_methods = this.DFA_methodsRaw.split(' ')
      if(this.DFA_methodsRaw.length === 0 || this.DFA_methodsRaw === ' '){
        this.DFA_methods = []
      }
    },
    parseNodes() {
      this.DFA_nodesRaw = this.DFA_nodesRaw.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g,"")
      this.DFA_nodes = this.DFA_nodesRaw.split(' ')
      if(this.DFA_nodesRaw.length === 0 || this.DFA_nodesRaw === ' '){
        this.DFA_nodes = []
      }
    },
    parseEnd(){
      this.DFA_endRaw = this.DFA_endRaw.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g,"")
      this.DFA_end = this.DFA_endRaw.split(' ')
      if(this.DFA_endRaw.length === 0 || this.DFA_endRaw === ' '){
        this.DFA_end = []
      }
    }

  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>