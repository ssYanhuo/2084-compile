<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list nav dense>
        <v-list-item-group color="primary">
          <v-list-item
              link
              @click="routeTo('home'); drawer = false">
            <v-list-item-icon>
              <v-icon> mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>主页</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-subheader>
            词法分析
          </v-subheader>
          <v-list-item
              v-for="item in drawerItems.lexical"
              :key="item.title"
              link
              @click="routeTo(item.route)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-subheader>
            语法分析
          </v-subheader>
          <v-list-item
              v-for="item in drawerItems.grammar"
              :key="item.title"
              link
              @click="routeTo(item.route)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

      </v-list>
    </v-navigation-drawer>
    <v-app-bar app :elevate-on-scroll="appbarMode[getAppbarMode(route)]" :color="appbarColor[getAppbarMode(route)]" :dark="appbarMode[getAppbarMode(route)]" :style="appbarStyle[getAppbarMode(route)]">
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <div class="d-flex align-center">
        <v-toolbar-title>易编 - 编译原理可视化平台</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn
          href="#"
          text>
        <span class="mr-2">登录</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
        <keep-alive>
          <router-view/>
        </keep-alive>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  components: {},
  data: () => ({
    drawer: false,
    drawerItems: {
      lexical: [
        {title: '正则表达式转 NFA', icon: 'mdi-regex', route: 'regex2NFA'},
        {title: 'NFA 确定化', icon: 'mdi-check', route: 'nfa2DFA'},
        {title: 'DFA 最小化', icon: 'mdi-minus', route: 'dfaMinimize'},
      ],
      grammar: [
        {title: '计算 First 集合', icon: 'mdi-numeric-1-circle', route: 'calculateFirst'},
        {title: '计算 Follow 集合', icon: 'mdi-arrow-right-circle', route: 'calculateFollow'},
        {title: '消除左递归', icon: 'mdi-backburger', route: 'elr'},
        {title: 'LL1 文法判断', icon: 'mdi-code-tags-check', route: 'll1'},
        {title: '递归下降分析', icon: 'mdi-arrow-down-circle'},
        {title: '预测分析法', icon: 'mdi-google-analytics', route: 'predict'},
      ],
    },
    appbarStyle: [
      'backdrop-filter: blur(30px)',
      ''
    ],
    appbarColor: [
      '#1867C060',
      'white'
    ],
    appbarMode: [
        true,
        false
    ],
    route: '',
  }),
  methods: {
    getAppbarMode: function (route){
      if(route === 'home' || route === ' ' || !route || route.length === 0){
        return 0;
      }else {
        return 1;
      }
    },
    routeTo: function (route) {
      this.route = route
      this.$router.push(route)
    }
  },
  mounted() {
    this.route = this.$route.path.substr(1)
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
