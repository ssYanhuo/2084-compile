<template>
  <el-card header="NFA 确定化">
    <el-row type="flex" justify="center" gutter="16">
      <el-col>
        <div>
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

      </el-col>
      <el-col>
        <el-card shadow="never">
          <div id="graph"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button type="primary" @click="drawTest">绘图</el-button>
    </el-row>
  </el-card>
</template>

<script>
import NFA_TransferSelector from "@/components/wiget/NFA_TransferSelector";
export default {
  name: "NFA",
  components: {NFA_TransferSelector},
  data: function () {
    return {
      chars: "",
      selectorCount: 1,
    };
  },
  methods: {
    submit() {
      let params = {
        TransferOfNum: 0,
        TransferOneByOne: [],
        NodeOfNum: 0,
      }
      let selectors = this.$refs.NFA_TransferSelectors
      let transferArrows = []
      let transfers = this.chars.split(' ')
      let nodes = new Set()
      selectors.forEach(function (selector) {
        let transferArrow = {}
        transferArrow.start = selector.start
        transferArrow.end = selector.end
        transferArrow.char_ls = selector.char_ls
        transferArrows.push(transferArrow)
        nodes.add(selector.start)
        nodes.add(selector.end)
      })
      params.NodeOfNum = nodes.size
      params.TransferOneByOne = transfers
      params.TransferOfNum = transfers.length
      transferArrows.push({
        start: 0,
        end: 0,
        char_ls: '#'
      })
      let that = this
      that.$axios({
        url: '/api_NFA/NFA_def',
        params: params,
        method: "post",
        data: transferArrows,
        paramsSerializer: function (params) {
          return that.$qs.stringify(params, { indices: false })
        }
      })
      .then(function (result) {
        that.drawGraph(that, transfers, result.data.Calculate, result.data.PrintResultJSon)
      })
      .catch(function (err){
        alert(err)
      });
    },
    getIdInStates(states, mState){
      for(let i = 0; i < states.length; i++){
        if (states[i].sort().toString() === mState.sort().toString()){
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
          [-1],[1],[3],//上面闭包集合中的每个元素Move(a)
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
    drawGraph: function (context, transferMethods, epsilon, result) {
      let container = document.getElementById("graph")
      console.log(epsilon)
      let states = []
      result.forEach(function (step){
        states.push(step[0])
      })
      let nodes = new context.$vis.DataSet([])
      for(let i = 0; i < result.length; i++){
        let node = {id: i, label: 'S' + i}
        if(i === 0){
          node.color = {
            background: '#97fc97',
            border: '#2ae82a',
            highlight: {
              background: '#97fc97',
              border: '#2ae82a'
            }
          }
        }
        if(states[i].indexOf(result.length - 1) !== -1){
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
      let edges = new context.$vis.DataSet([])
      result.forEach(function (step){
        let origin = step[0]
        let transfers = []
        for(let i = 1; i < step.length; i += origin.length + 2){
          transfers.push(step.slice(i, i + origin.length + 2))
        }
        for(let i = 0; i < transfers.length; i++){
          //TODO 获取每步的连线，和尚未经过e的情况
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
            color:{
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
        height: "600",
        manipulation: {
          enabled: true,
          initiallyActive: true,
          addNode: true,
          addEdge: true,
          editNode: function(edgeData,callback) {
            if (edgeData.from === edgeData.to) {
              let r = confirm("Do you want to connect the node to itself?");
              if (r === true) {
                callback(edgeData);
              }
            }
            else {
              callback(edgeData);
            }
          },
          editEdge: true,
          deleteNode: true,
          deleteEdge: true,
        },
      }
      let network = new context.$vis.Network(container, data, options)
      network.setOptions(options)
    },
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>