<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list
          nav>
        <v-list-item
            v-for="item in drawerItems"
            :key="item.title"
            link>
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
      <DFA/>
    </v-main>
  </v-app>
</template>

<script>
import DFA from './components/DFAMinimize'

export default {
  name: 'Regex2NFA',
  components: {
    DFA,
  },

  data: () => ({
    drawer: false,
    drawerItems: [
      {title: 'Home', icon: 'mdi-view-dashboard'},
      {title: 'About', icon: 'mdi-forum'},
    ],
  }),
};
</script>
