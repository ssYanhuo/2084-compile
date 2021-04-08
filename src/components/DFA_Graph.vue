<template>
  <el-card header="DFA 最小化">
    <el-row type="flex" justify="center" gutter="16">
      <el-col>
          <p>源数据：</p>
          <el-card shadow="never">

            <div id="originGraph">

            </div>
          </el-card>
      </el-col>
      <el-col>
        <p>结果：</p>
        <el-card shadow="never">
          <div id="graph" style="height: 600px"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="submit">提交</el-button>
    </el-row>
    <el-dialog
        title="修改节点"
        :visible.sync="editNodeDialog"
        width="30%"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false">
      <span>设置节点类型</span>
      <span slot="footer">
        <el-button @click="editNode('normal')">设为普通节点</el-button>
        <el-button type="primary" @click="editNode('end')"> 设为终止节点</el-button>
        <el-button type="primary" @click="editNode('start')"> 设为起始节点</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import vis from "vis";
export default {
  name: "DFA",
  data: function () {
    return {
      editNodeDialog: false,
      editingNode: null,
      editingNodeCallback: null,
      DFA_methodsRaw: '',
      DFA_methods: [],
      DFA_nodesRaw: '',
      DFA_nodes: [],
      DFA_start: '',
      DFA_endRaw: '',
      DFA_end: [],
      DFA_linkData: [],
      originNodes: new this.$vis.DataSet([]),
      originEdges: new this.$vis.DataSet([]),
      nodeName: []
    };
  },
  methods:{
    editNode(type) {
      switch (type) {
        case 'start':
          this.editingNode.color = {
            background: '#97fc97',
            border: '#2ae82a',
            highlight: {
              background: '#97fc97',
              border: '#2ae82a'
            }
          }
          this.editingNode.typeOfNode = 'start'
          this.editingNodeCallback(this.editingNode)
          this.editNodeDialog = false
          break
        case 'end':
          this.editingNode.color = {
            background: '#fc9797',
            border: '#e92b2b',
            highlight: {
              background: '#fc9797',
              border: '#e92b2b'
            }
          }
          this.editingNode.typeOfNode = 'end'
          this.editingNodeCallback(this.editingNode)
          this.editNodeDialog = false
          break
        default:
          this.editingNode.color = {
            background: '#97c2fc',
            border: '#2B7CE9',
            highlight: {
              background: '#d2e5ff',
              border: '#2B7CE9'
            }
          }
          this.editingNode.typeOfNode = null
          this.editingNodeCallback(this.editingNode)
          this.editNodeDialog = false
          break
      }
    },
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
      this.DFA_methodsRaw = ''
      this.DFA_methods = []
      this.DFA_nodesRaw = ''
      this.DFA_nodes = []
      this.DFA_start = ''
      this.DFA_endRaw = ''
      this.DFA_end = []
      this.DFA_linkData = []
      let that = this
      let idToNodeIndex = {}
      this.originNodes.forEach(function (node){
        that.DFA_nodes.push(node.label)
        if(node.typeOfNode === 'end'){
          that.DFA_end.push(node.label)
        }
        if(node.typeOfNode === 'start'){
          that.DFA_start = node.label
        }
        idToNodeIndex[node.id] = that.DFA_nodes.length - 1
      })
      let signs = new Set()
      this.originEdges.forEach(function (edge) {
        //查找所有转移方式
        if(!edge.hasHidden){//没有折叠边，直接添加
          signs.add(edge.label)
        }else {//有折叠边，添加所有折叠边
          edge.hiddenEdges.forEach(function (edge){
            signs.add(edge.label)
          })
        }
      })
      this.DFA_methods = Array.from(signs)
      let methodToIndex = {}
      this.DFA_methods.forEach(function (method, index){
        methodToIndex[method] = index
      })
      let DFA_AdjacencyTable_ls = []
      for(let i = 0; i < that.DFA_nodes.length; i++){
        DFA_AdjacencyTable_ls.push([])
      }
      this.originEdges.forEach(function (edge){
        //查找所有边
        if(!edge.hasHidden){
          if(DFA_AdjacencyTable_ls[idToNodeIndex[edge.from]] === null){
            DFA_AdjacencyTable_ls[idToNodeIndex[edge.from]] = []
          }
          DFA_AdjacencyTable_ls[idToNodeIndex[edge.from]][methodToIndex[edge.label]] = that.DFA_nodes[idToNodeIndex[edge.to]]
        }else {
          edge.hiddenEdges.forEach(function (edge){
            if(DFA_AdjacencyTable_ls[idToNodeIndex[edge.from]] === null){
              DFA_AdjacencyTable_ls[idToNodeIndex[edge.from]] = []
            }
            DFA_AdjacencyTable_ls[idToNodeIndex[edge.from]][methodToIndex[edge.label]] = that.DFA_nodes[idToNodeIndex[edge.to]]
          })
        }
      })
      let params = {
        DFA_EndList_ls: this.DFA_end,
        DFA_StartState_ls: this.DFA_start,
        DFA_StateList_ls: this.DFA_nodes,
        EndCount_ls: this.DFA_end.length,
        SignCount_ls: this.DFA_methods.length,
        Sign_ls: this.DFA_methods,
        StateCount_ls: this.DFA_nodes.length
      }
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
    getNewNodeId: function () {
      for (let i = 0; i < this.nodeName.length; i++) {
        if (this.nodeName[i] !== true) {
        this.nodeName[i] = true
        return i
        }
      }
      return -1
    }

  },
  mounted() {
    let that = this
    for (let i = 0; i < 26; i++) {
      this.nodeName[i] = false
    }
    this.nodeName[0] = this.nodeName[1] = true
    this.originNodes = new this.$vis.DataSet([
      {id: 0, label: 'A'},
      {id: 1, label: 'B'}
    ])
    this.originEdges = new this.$vis.DataSet([
      {
        from: 0,
        to: 1,
        label: 'a',
        arrows: {
          to: {
            enabled: true,
            type: "arrow",
            scaleFactor: 0.5
          }
        },
        color: {
          color: '#000000'
        }
      }
    ])
    let container = document.getElementById("originGraph")
    let options = {
      height: "600",
      interaction: {
        multiselect: false
      },
      //启用编辑功能
      manipulation: {
        enabled: true,
        initiallyActive: true,
        addNode: function (nodeData, callback) {
          let id = that.getNewNodeId()
          if (id === -1) {
            alert("节点数量超过上限")
            callback(null)
          } else {
            nodeData.label = String.fromCharCode(id + 65)
            nodeData.id = id
            callback(nodeData)
          }
        },
        addEdge: function (edgeData, callback) {
          edgeData.label = prompt('输入转移方式', 'a')
          if (edgeData.label === null) {
            edgeData.label = 'a'
          }
          edgeData.arrows = {
            to: {
              enabled: true,
              type: "arrow",
              scaleFactor: 0.5
            }
          }
          edgeData.color = {
            color: '#000000'
          }
          //检查是否有重叠的边
          if(edgeData.from === edgeData.to){
            let found = false;
            that.originEdges.forEach(function (edge){
              if(edge.from === edgeData.from && edge.to === edgeData.to){
                //找到了一条可能重叠的边，直接把新的边加在旧边上
                if(!edge.hasHidden){
                  edge.hasHidden = true
                  edge.hiddenEdges = []
                  edge.hiddenEdges.push({
                    from: edge.from,
                    to: edge.to,
                    label: edge.label
                  })
                }
                edge.hiddenEdges.push(edgeData)
                edge.label += '|' + edgeData.label
                found = true
                that.originEdges.update(edge)
                console.log(edge)
              }
            })
            if(found){
              callback(null)
              return
            }
          }
          callback(edgeData)
        },
        editNode: function (data, callback){
          that.editNodeDialog = true
          that.editingNode = data
          that.editingNodeCallback = callback
        },
        editEdge: false,
        deleteNode: function (data, callback) {
          try{
            data.nodes.forEach(function (nodeId) {
              that.nodeName[nodeId] = false
            })
            callback(data)
          }catch (e) {
            console.log(e)
            callback(null)
          }

        },
        deleteEdge: function (data, callback){
          try{
            let targetEdge = null
            that.originEdges.forEach(function (edge){
              if(edge.id === data.edges[0]){
                targetEdge = edge
              }
            })
            if(targetEdge === null){
              callback(null)
              return
            }
            if(targetEdge.hasHidden !== true){//不是折叠边，直接删除
              callback(data)
            }else {//是折叠边，删除其中一个
              targetEdge.hiddenEdges.pop()
              let labels = []
              targetEdge.hiddenEdges.forEach(function (edge){
                labels.push(edge.label)
              })
              targetEdge.label = labels.join('|')
              if(targetEdge.hiddenEdges.length === 1){
                targetEdge.hasHidden = false
              }
              that.originEdges.update(targetEdge)
              callback(null)
            }
          }catch (e) {
            console.log(e)
            callback(null)
          }


        },
      },
    }
    let data = {
      nodes: this.originNodes,
      edges: this.originEdges
    }
    console.log(data)
    let network = new this.$vis.Network(container, data, options)
    console.log(network)
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>