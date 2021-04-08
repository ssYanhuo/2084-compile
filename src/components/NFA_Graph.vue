<template>
  <el-card header="NFA 确定化">
    <el-row type="flex" justify="center" gutter="16">
      <el-col>
        <div style="display: none">
          <div>
            <p>转移方式：</p>
            <el-input
                :rows="10"
                placeholder="用空格分隔的转移方式名（单个字母）"
                v-model="chars"/>
          </div>
          <div>
            <p>转移过程（用e来代替ε）：
              <el-button
                  @click="selectorCount ++"
                  icon="el-icon-plus"
                  type="primary" circle
                  size="mini"
                  style="float: right; margin-right: 4px"/>
              <el-button
                  v-if="selectorCount > 1"
                  @click="selectorCount --"
                  icon="el-icon-minus"
                  type="danger" circle
                  size="mini"
                  style="float: right; margin-right: 16px"/>
            </p>
            <NFA_TransferSelector
                v-for="n in selectorCount"
                :key="n"
                ref="NFA_TransferSelectors"
                @keypress.enter.native="selectorCount ++"/>
          </div>
        </div>
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
    <el-row>
      <el-card shadow="never">
        <el-table
          :data="tableData">
          <el-table-column
              v-for="(tableCol, i) in tableCols"
              :key="i"
              :prop="tableCol.id"
              :label="tableCol.name"/>
        </el-table>
      </el-card>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="submit">提交</el-button>
      <!--      <el-button type="primary" @click="drawTest">绘图</el-button>-->
    </el-row>
  </el-card>
</template>

<script>
import NFA_TransferSelector from "@/components/wiget/NFA_TransferSelector";
import vis from 'vis'

export default {
  name: "NFA",
  components: {NFA_TransferSelector},
  data: function () {
    return {
      chars: "",
      selectorCount: 1,
      nodeName: [],
      originNodes: new this.$vis.DataSet([]),
      originEdges: new this.$vis.DataSet([]),
      tableData: [],
      tableCols: []
    };
  },
  methods: {
    submit() {
      console.log(this.originNodes.get())
      let params = {
        TransferOfNum: 0,
        TransferOneByOne: [],
        NodeOfNum: 0,
      }
      let transferArrows = []
      let transfers = new Set()
      params.NodeOfNum = this.originNodes.get().length
      this.originEdges.get().forEach(function (edge) {
        if (!edge.hasHidden){//不是折叠边，直接添加
          transferArrows.push({
            char_ls: edge.label,
            start: edge.from,
            end: edge.to
          })
          if (edge.label !== 'e' && edge.label !== "e") {
            transfers.add(edge.label)
          }
        } else{
          edge.hiddenEdges.forEach(function (hiddenEdge){//是折叠边，添加所有被折叠的边
            transferArrows.push({
              char_ls: hiddenEdge.label,
              start: hiddenEdge.from,
              end: hiddenEdge.to
            })
            if (hiddenEdge.label !== 'e' && hiddenEdge.label !== "e") {
              transfers.add(hiddenEdge.label)
            }
          })
        }

      })
      transferArrows.push({
        start: 0,
        end: 0,
        char_ls: '#'
      })
      params.TransferOneByOne = Array.from(transfers)
      params.TransferOfNum = params.TransferOneByOne.length
      let that = this
      that.$axios({
        url: '/api_NFA/NFA_def',
        params: params,
        method: "post",
        data: transferArrows,
        paramsSerializer: function (params) {
          return that.$qs.stringify(params, {indices: false})
        }
      })
          .then(function (result) {
            that.drawGraph(that, Array.from(transfers), result.data.Calculate, result.data.PrintResultJSon, that.originNodes)
            that.drawTable(that, Array.from(transfers), result.data.Calculate, result.data.PrintResultJSon)
          })
          .catch(function (err) {
            console.log(err)
            alert(err)
          });
    },
    getIdInStates(states, mState) {
      for (let i = 0; i < states.length; i++) {
        if (states[i].sort().toString() === mState.sort().toString()) {
          return i
        }
      }
      return -1
    },
    drawTest: function () {
      let context = this
      let transferMethods = ['a', 'b']
      let epsilon = [
        [0, 1, 2],
        [1, 2],
        [2],
        [3],
        [4],
        [5, 6, 7],
        [6, 7],
        [7]
      ]
      let result = [
        [
          [0, 1, 2],//初始状态的epsilon闭包运算结果
          [-1], [1], [3],//上面闭包集合中的每个元素Move(a)
          [1, 3],//Move(a)的最终结果
          //单个状态的epsilon运算在Calculate接口中传出调用
          [1, 2, 3],//Move(a)最终结果的epsilon闭包运算
          [-1],//
          [1],//
          [4],//                      下面这部分是b字符的运算，和上面a字符类似
          [1, 4],//
          [1, 2, 4]//
        ],
        [
          [1, 2, 3],
          [1],
          [3],
          [5],
          [1, 3, 5],
          [1, 2, 3, 5, 6, 7],
          [1],
          [4],
          [-1],
          [1, 4],
          [1, 2, 4]
        ],
        [
          [1, 2, 4],
          [1],
          [3],
          [-1],
          [1, 3],
          [1, 2, 3],
          [1],
          [4],
          [5],
          [1, 4, 5],
          [1, 2, 4, 5, 6, 7]
        ],
        [
          [1, 2, 3, 5, 6, 7],
          [1],
          [3],
          [5],
          [-1],
          [6],
          [-1],
          [1, 3, 5, 6],
          [1, 2, 3, 5, 6, 7],
          [1],
          [4],
          [-1],
          [-1],
          [6],
          [-1],
          [1, 4, 6],
          [1, 2, 4, 6, 7]
        ],
        [
          [1, 2, 4, 5, 6, 7],
          [1],
          [3],
          [-1],
          [-1],
          [6],
          [-1],
          [1, 3, 6],
          [1, 2, 3, 6, 7],
          [1],
          [4],
          [5],
          [-1],
          [6],
          [-1],
          [1, 4, 5, 6],
          [1, 2, 4, 5, 6, 7]
        ],
        [
          [1, 2, 4, 6, 7],
          [1],
          [3],
          [-1],
          [6],
          [-1],
          [1, 3, 6],
          [1, 2, 3, 6, 7],
          [1],
          [4],
          [5],
          [6],
          [-1],
          [1, 4, 5, 6],
          [1, 2, 4, 5, 6, 7]
        ],
        [
          [1, 2, 3, 6, 7],
          [1],
          [3],
          [5],
          [6],
          [-1],
          [1, 3, 5, 6],
          [1, 2, 3, 5, 6, 7],
          [1],
          [4],
          [-1],
          [6],
          [-1],
          [1, 4, 6],
          [1, 2, 4, 6, 7]
        ]
      ]
      this.drawGraph(context, transferMethods, epsilon, result)
    },
    drawGraph: function (context, transferMethods, epsilon, result, originNodes) {
      let container = document.getElementById("graph")
      console.log(epsilon)
      let states = []
      result.forEach(function (step) {
        states.push(step[0])
      })
      let nodes = new vis.DataSet([])
      for (let i = 0; i < result.length; i++) {
        let node = {id: i, label: 'S' + i}
        if (i === 0) {
          node.color = {
            background: '#97fc97',
            border: '#2ae82a',
            highlight: {
              background: '#97fc97',
              border: '#2ae82a'
            }
          }
        }
        if (states[i].indexOf(originNodes.get().length - 1) !== -1) {
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
      }
      let edges = new vis.DataSet([])
      result.forEach(function (step) {
        let origin = step[0]
        let transfers = []
        for (let i = 1; i < step.length; i += origin.length + 2) {
          transfers.push(step.slice(i, i + origin.length + 2))
        }
        for (let i = 0; i < transfers.length; i++) {
          let found = false
          if(context.getIdInStates(states, origin) === context.getIdInStates(states, transfers[i].slice(-1)[0])){
            let id = context.getIdInStates(states, origin)
            edges.forEach(function (edge){
              if(edge.from === id && edge.to === id){
                edge.label += '|' + transferMethods[i]
                edges.update(edge)
                found = true
              }
            })
          }
          if (found === true){continue}
          edges.add({
            from: context.getIdInStates(states, origin),
            to: context.getIdInStates(states, transfers[i].slice(-1)[0]),
            label: transferMethods[i],
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
          })
        }
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
    getNewNodeId: function () {
      for (let i = 0; i < this.nodeName.length; i++) {
        if (this.nodeName[i] !== true) {
          this.nodeName[i] = true
          return i
        }
      }
      return -1
    },
    drawTable: function (context, transferMethods, epsilon, result) {
      context.tableCols = []
      context.tableData = []
      context.tableCols.push({name: 'I', id: 'I'})
      transferMethods.forEach(function (transferMethod){
        context.tableCols.push({name: 'ε-closure(move(I,' +transferMethod + '))', id: 'm' + transferMethod})
      })
      let states = []
      result.forEach(function (step) {
        states.push(step[0])
      })
      result.forEach(function (step, stepIndex) {
        let row = {};
        row['I'] = 'S' + stepIndex + '=' + '{' + states[stepIndex] + '}';
        transferMethods.forEach(function (transferMethod, methodIndex) {
          row['m' + transferMethod] = 'S' + context.getIdInStates(states, step[(methodIndex + 1) * (step[0].length + 2)]) + '=' + '{' + step[(methodIndex + 1) * (step[0].length + 2)] + '}'
        })
        console.log(context.tableData)
        context.tableData.push(row)
      })
    }
  },
  mounted() {
    let that = this
    for (let i = 0; i < 26; i++) {
      this.nodeName[i] = false
    }
    this.nodeName[0] = this.nodeName[1] = true
    this.originNodes = new this.$vis.DataSet([
      {id: 0, label: '0'},
      {id: 1, label: '1'}
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
      //启用节点编辑功能
      manipulation: {
        enabled: true,
        initiallyActive: true,
        addNode: function (nodeData, callback) {
          let id = that.getNewNodeId()
          if (id === -1) {
            alert("节点数量超过上限")
            callback(null)
          } else {
            nodeData.label = id.toString()
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
        editNode: undefined,
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