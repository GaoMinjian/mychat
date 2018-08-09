<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from './vuex/store'
import storage from './assets/js/storage'
import {MessageBox} from 'mint-ui'

export default {
  name: 'App',
  store,
  sockets: {
    allUsers (docs) {
      this.$store.state.allusers = docs
      for (var i = 0; i < docs.length; i++) {
        this.$store.state.usersinfo[docs[i].account] = docs[i]
      }
    }
  },
  created () {
    if (storage.get('account') == null) {
      if (this.$route.path != '/' && this.$route.path != '/login' && this.$route.path != '/register') {
        MessageBox('登录信息失效，请重新登录！')
        this.$router.push({
          path: 'login'
        })
      }
    } else {
      this.$socket.emit('saveSocketId', storage.get('account'))
      // this.socket.emit('getFriends', storage.get('account'))
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}
  body{
    background-color: #f5f5f5;
    margin: 0;
  }
</style>
