<template>
  <el-row type="flex" justify="center" gutter="16">
    <el-col
      span="2">
      <p style="margin: 0; text-align: center; height: 100%; line-height: 100%;">{{ node }}</p>
    </el-col>
    <el-col
      v-for="(method, index) in methods"
      :key="index">
      <el-input
        :placeHolder="method"
        ref="selectors"
        v-model="linkData[index]"/>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "DFA_TransferSelector",
  data: function () {
    return {
      linkData: []
    }
  },
  props: {
    'node': String,
    'methods': Array
  }
}
</script>

<style scoped>

</style>