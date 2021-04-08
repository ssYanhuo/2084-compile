<template>
  <el-card header="正则表达式转 NFA">
    <el-row type="flex" justify="center" gutter="16">
      <el-col>
        <p>正则表达式：</p>
        <el-input id="input-regx" type="text" v-model="inputRegex" placeholder="input regexp..." :disabled="buttonsDisabled"/>
        <p>要匹配的字符串：</p>
        <el-input id="input-text" type="text" v-model="inputMatch" placeholder="input text for match..." :disabled="buttonsDisabled">
          <template slot="append">
            <el-checkbox id="btn-back-track" :disabled="buttonsDisabled" v-model="isBackTrack">回溯</el-checkbox>
          </template>
        </el-input>
        <el-row type="flex" justify="center" style="margin-top: 32px">
          <el-button id="btn-run" type="primary">{{ btnText }}</el-button>
          <el-button id="btn-stop" type="danger">停止</el-button>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 32px">
          <div id="result" ></div>
        </el-row>
      </el-col>
      <el-col>
        <el-row type="flex" justify="space-between">
            <p>过程演示:</p>
            <el-checkbox id="checkbox-physics" v-model="physicsEnabled" style="margin: 16px 8px">自动布局</el-checkbox>

        </el-row>
        <el-card shadow="never">
          <div id="canvas" style="height: 360px"></div>
        </el-card>
      </el-col>
    </el-row>


  </el-card>
</template>

<script>
export default {
  name: "Regex2NFA",
  data: function (){
    return{
      inputRegex: '(a+|b)c',
      inputMatch: 'aac',
      isBackTrack: false,
      buttonsDisabled: false,
      btnText: "执行匹配",
      physicsEnabled: true
    }
  },
  mounted() {
    window.regexData = this.$data
    require('../lib/regexLib.js')
    require('../lib/renderer.js')
    require('../lib/simulator.js')
  }
}
</script>

<style scoped>
</style>