<template>
  <div id="conversation">
    <div id="header">
      <mt-header fixed title="公共聊天室">
        <router-link to="/message" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div id="conversation-box">
      <div v-for="amsg in msgList" :key="amsg.time" :class="amsg.self ? 'self' : 'other'" class="chat-line-box">
        <img v-if="!amsg.self" :src=getHeadshow(amsg.account) />
        <div  class="msg-box">
          <div v-if="amsg.self" class="info">{{amsg.time}} {{username}}</div>
          <div v-else class="info">{{amsg.username}} {{amsg.time}}</div>
          <p class="msg-content">{{amsg.content}}</p>
        </div>
        <img v-if="amsg.self" :src=headshow />
      </div>
      <div style="height: 7vh"></div>
    </div>
    <div id="msg-input-box">
      <input v-model="msg" type="text" id="msg-input"/>
      <div class="option" v-if="msg==''">
        <img src="../assets/images/emo_gray.png"/>
        <img src="../assets/images/more.png"/>
      </div>
      <div class="option" v-else>
        <input id="send" type="button" value="发送" @click="clickSend"/>
      </div>
    </div>
  </div>
</template>

<script>
import storage from '../assets/js/storage'
import headshow from '../assets/js/headshow'
export default {
  name: 'groupchat',
  data () {
    return {
      msg: '',
      username: '',
      headshow: '',
      usersinfo: [],
      msgList: []
    }
  },
  created () {
    this.username = storage.get('username')
    this.headshow = headshow[storage.get('headshow')].url
    this.usersinfo = this.$store.state.usersinfo
    this.$socket.emit('reqGroupHistory')
  },
  sockets: {
    getGroupMsg (data) {
      this.msgList.push({
        time: data.time,
        username: data.username,
        account: data.account,
        content: data.content,
        self: false
      })
    },
    getGroupHistory (data) { // 得到历史记录并更改self
      this.msgList = data
      for (var i = 0; i < data.length; i++) {
        if (this.msgList[i].account == storage.get('account')) {
          this.msgList[i].self = true
        } else {
          this.msgList[i].self = false
        }
      }
    }
  },
  methods: {
    getUsername (account) { // 获取群聊中他人信息对应的用户名及头像(貌似无法在{{}}中调用)
      // console.log(this.usersinfo[account].name)
      return this.usersinfo[account].username
    },
    getHeadshow (account) {
      return headshow[this.usersinfo[account].headshow].url
    },
    setTime: function (value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    clickSend () {
      var t = new Date().getTime()
      this.msgList.push(
        {
          time: this.$options.methods.setTime(t),
          username: this.username,
          account: storage.get('account'),
          content: this.msg,
          self: true
        }
      )
      // this.$store.state.theother.msgHistory = this.msg
      this.$socket.emit('sendGroupMsg', {time: this.$options.methods.setTime(t), username: this.username, account: storage.get('account'), content: this.msg})
      this.msg = ''
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/css/chat.less";
</style>
