<template>
  <div>
    <div style="background: linear-gradient(rgb(24, 102, 192), rgb(85, 178, 240)); margin-top: -64px; padding-top: 64px">
      <v-container fluid>
        <v-row style="padding: 100px 100px" justify="center">
          <v-col cols="8">
            <h1 class="text-h1 white--text text-center">易编-Eapile</h1>
            <h1 class="mt-8 text-h4 white--text text-center">简易、轻量、多平台的编译原理可视化工具。</h1>
            <p class="text-center"><v-btn x-large rounded outlined dark class="mt-16">Get Started!</v-btn></p>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container class="my-16">
      <v-row justify="center">
        <v-col cols="6">
          <h1 class="text-h4">标题标题标题</h1>
          <p class="mt-4">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
          <p class="mt-4">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
          <p class="mt-4">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
          <p class="mt-4">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
          <p class="mt-4">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="5">
          <v-card style="height: 360px">
            <p align="center">这里是视频</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-footer padless>
      <v-card flat tile width="100%" class="brown text-center">
        <v-card-text>
          <v-btn class="mx-4 white--text" icon href="https://github.com/ssYanhuo/2084-compile">
            <v-icon>
              mdi-github
            </v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon href="https://2084team.cn/">
            <v-icon>
              mdi-account-multiple
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-divider/>
        <v-card-text class="white--text">
          Copyright ©  {{ new Date().getFullYear() }} <strong>2084 Team</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>

</template>

<script>
  export default {
    name: 'Home',
    data: () => ({

    }),
  }
</script>
