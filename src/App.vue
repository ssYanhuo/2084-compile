<template>
  <div id="app">
    <div class="banner-background">
    </div>
    <el-row type="flex" justify="center">
      <el-col span="16" style="margin-top: 10%">
        <NFA/>
      </el-col>
    </el-row>

  </div>
</template>

<style scoped>
.banner-background{
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #00adff, #8ad3ff);
  position: fixed;
}
</style>

<script>
import NFA from "@/components/NFA_Graph"

export default {
  name: 'App',
  components: {NFA}
}
</script>

