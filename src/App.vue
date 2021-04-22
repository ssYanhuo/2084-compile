<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list
          nav
          dense>
        <v-list-item
            link
            @click="$router.push('home')">
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
            @click="$router.push(item.route)">
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
            @click="$router.push(item.route)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
        app
        color="white"
        light>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <div class="d-flex align-center">
        <v-toolbar-title>编译原理可视化平台</v-toolbar-title>
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
  components: {
  },
  data: () => ({
    drawer: false,
    drawerItems: {
      lexical: [
        {title: '正则表达式转 NFA', icon: 'mdi-code-tags-check', route: 'regex2NFA'},
        {title: 'NFA 确定化', icon: 'mdi-code-tags-check', route: 'nfa2DFA'},
        {title: 'DFA 最小化', icon: 'mdi-code-tags-check', route: 'dfaMinimize'},
      ],
      grammar: [
        {title: '预测分析法', icon: 'mdi-code-tags-check', route: 'predict'},
        {title: '消除左递归', icon: 'mdi-code-tags-check'},
        {title: 'LL1 文法判断', icon: 'mdi-code-tags-check'},
        {title: '递归下降分析', icon: 'mdi-code-tags-check'},
      ],
    },
  }),
  methods: {

  },
  mounted() {

  }
};
</script>
