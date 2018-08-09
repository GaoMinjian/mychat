<template>
  <div>
    <div id="main">
      <h2>账号登录</h2>
      <div id="input-box">
        <mt-field label="账号" placeholder="请输入账号" v-model="account"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      </div>
    </div>
    <mt-button id="login-btn" size="normal" type="primary" @click.native="clickLogin">登录</mt-button>
    <div id="option">
      <router-link to="register">
        <p>注册账号</p>
      </router-link>
      <router-link to="#">
        <p>找回密码</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import storage from '../assets/js/storage'
import {MessageBox} from 'mint-ui'

export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: '',
      username: ''
    }
  },
  sockets: {
    loginRes (value) {
      if (value.state) {
        this.username = value.res
        // this.$store.state.username = value.res
        // this.$store.state.account = this.account
        // this.$store.state.password = this.password
        storage.set('username', value.res)
        storage.set('headshow', value.headshow)
        storage.set('account', this.account)
        this.$socket.emit('reqLatestPrivateHistory', this.account)
        this.$router.push({
          path: 'message'
        })
      } else if (value.res == 'account') {
        MessageBox('账号不存在，请先注册账号！')
      } else {
        MessageBox('密码错误，请重新尝试！')
      }
    }
  },
  methods: {
    clickLogin: function () {
      if (this.account == '') {
        MessageBox('请输入账号')
      } else if (this.password == '') {
        MessageBox('请输入密码')
      } else {
        this.$socket.emit('login', {account: this.account, password: this.password})
      }
    }

  }
}
</script>

<style scoped lang="less">
#main{
  margin-top: 15vh;
}
#input-box{
  margin-top: 8vh;
}
#login-btn{
  margin-top: 8vh;
  width:70vw;
}
#option {
  margin-top: 2vh;
  a {
    display: inline-block;
    text-decoration: none;
    /*border-left: 1px solid;*/
    font-size: .8em;
  }
}
</style>
