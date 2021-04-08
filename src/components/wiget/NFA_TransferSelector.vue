<template>
  <el-row type="flex" justify="center" gutter="16">
    <el-col>
      <el-input
          placeholder="从"
      v-model="start"/>
    </el-col>
    <el-col>
      <el-input
          placeholder="到"
      v-model="end"/>
    </el-col>
    <el-col>
      <el-input
          placeholder="转移方式"
      v-model="char_ls"/>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "NFA_TransferSelector",
  data: function () {
    return {
      start: null,
      end: null,
      char_ls: ''
    }
  }
}
</script>

<style scoped>

</style>