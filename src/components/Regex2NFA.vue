<template>
  <el-card header="正则表达式转 NFA">
    <el-row type="flex" justify="center" gutter="16">
      <el-col>
        <p>正则表达式：</p>
        <el-input id="input-regx" type="text" v-model="inputRegex" placeholder="input regexp..." :disabled="buttonsDisabled"/>
      </el-col>
      <el-col>
        <p>要匹配的字符串：</p>
        <el-input id="input-text" type="text" v-model="inputMatch" placeholder="input text for match..." :disabled="buttonsDisabled">
          <template slot="append">
            <el-checkbox id="btn-back-track" :disabled="buttonsDisabled" v-model="isBackTrack">回溯</el-checkbox>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top: 32px">
      <el-button id="btn-run" type="primary">{{ btnText }}</el-button>
      <el-button id="btn-stop" type="danger">停止</el-button>
    </el-row>
    <el-row>
      <el-row type="flex" justify="space-between">
        <p>过程演示:</p>
        <div>
          <el-checkbox id="checkbox-physics" v-model="physicsEnabled" style="margin: 16px 8px">自动布局</el-checkbox>
          <el-link style="margin: 0 8px" type="primary" icon="el-icon-download" :href="blobLink" :download="blobName">保存数据到本地</el-link>
        </div>
      </el-row>
      <el-card shadow="never">
        <div id="result" style="margin: 8px; position: absolute"/>
        <div id="canvas" style="height: 360px"/>
      </el-card>
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
      physicsEnabled: true,
      blobLink: null,
      blobName: Date.now() + '.nfa'
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