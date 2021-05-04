<template>
  <div>
    <div style="background: linear-gradient(rgb(24, 102, 192), rgb(85, 178, 240)); margin-top: -64px; padding-top: 64px">
      <v-container fluid>
        <v-row v-show="['xl', 'lg', 'md'].indexOf(this.$vuetify.breakpoint.name) !== -1" style="padding: 100px 200px">
          <v-col cols="6" >
            <h1 class="text-h1 white--text">易编-Eapile</h1>
            <h1 class="mt-8 text-h4 white--text">简易、轻量、多平台的编译原理可视化工具。</h1>
            <p><v-btn x-large class="mt-8" color="white" @click="scrollDown">Get Started!</v-btn></p>
          </v-col>
          <v-col cols="6">
            <div class="mt-16" ref="lottie1"/>
          </v-col>
        </v-row>
        <v-row v-show="['xl', 'lg', 'md'].indexOf(this.$vuetify.breakpoint.name) === -1" style="padding: 40px 50px">
          <v-col cols="12">
            <div ref="lottie2"/>
          </v-col>
          <v-col cols="12" >
            <h1 class="text-h4 white--text text-center">易编-Eapile</h1>
            <h1 class="mt-4 text-h6 white--text text-center">简易、轻量、多平台的编译原理可视化工具。</h1>
            <p class="text-center"><v-btn large class="mt-4" color="white" @click="scrollDown">Get Started!</v-btn></p>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container class="my-16">
      <v-row justify="center">
        <v-col class="text-center" cols="12" lg="3" md="6">
          <div style="display: inline-block">
            <v-img height="240" width="220" src="../assets/flex-study.svg"/>
            <p class="text-h6">灵活学习</p>
          </div>
        </v-col>
        <v-col class="text-center" cols="12" lg="3" md="6">
          <div style="display: inline-block">
            <v-img height="240" width="220" src="../assets/easy-teach.svg"/>
            <p class="text-h6">方便教学</p>
          </div>
        </v-col>
        <v-col class="text-center" cols="12" lg="3" md="6">
          <div style="display: inline-block">
            <v-img height="240" width="220" src="../assets/multi-platform.svg"/>
            <p class="text-h6">多平台</p>
          </div>
        </v-col>
        <v-col class="text-center" cols="12" lg="3" md="6">
          <div style="display: inline-block">
            <v-img height="240" width="220" src="../assets/visual.svg"/>
            <p class="text-h6">可视化</p>
          </div>
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
  import lottie from 'lottie-web'
  import lottieData from '../assets/anim/Blogging-Minimalistic/Blogging.json'
  export default {
    name: 'Home',
    data: () => ({

    }),
    methods: {
      scrollDown: function (){
        window.scrollTo(0, 600)
      }
    },
    computed: {
      height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 220
          case 'sm': return 400
          case 'md': return 500
          case 'lg': return 600
          case 'xl': return 800
          default: return 800
        }
      },
    },
    mounted() {
      lottie.loadAnimation({
        container: this.$refs.lottie1,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: lottieData
      })
      lottie.loadAnimation({
        container: this.$refs.lottie2,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: lottieData
      })
    }
  }
</script>
