<template>
  <div id="conversation">
    <div id="header">
      <mt-header fixed :title=othername>
        <router-link to="/message" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div id="conversation-box">
      <div v-for="amsg in msgList" :key="amsg.time" :class="amsg.self ? 'self' : 'other'" class="chat-line-box">
        <img v-if="!amsg.self" :src=otherheadshow />
        <div  class="msg-box">
          <div v-if="amsg.self" class="info">{{amsg.time}} {{username}}</div>
          <div v-else class="info">{{othername}} {{amsg.time}}</div>
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
  name: 'conversation',
  data () {
    return {
      msg: '',
      username: '',
      othername: '',
      headshow: '',
      otherheadshow: '',
      msgList: []
    }
  },
  created () {
    this.username = storage.get('username')
    this.othername = storage.get('othername')
    this.headshow = headshow[storage.get('headshow')].url
    this.otherheadshow = headshow[storage.get('otherheadshow')].url
  },
  updated () {
    // document.getElementById('conversation-box').scrollIntoView()
    window.scrollTo(0, document.body.scrollHeight)
  },
  sockets: {
    connect: function () {
      console.log('conversation connected')
    },
    sendPrivateHistory (res) { // res:othername,chathistory
      this.msgList = res.chathistory
      storage.set('othername', res.othername)
    },
    sendToOther (res) {
      this.msgList = res
      console.log(storage.get('account'), res)
    }
  },
  methods: {
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
          self: true,
          content: this.msg
        }
      )
      // this.$store.state.theother.msgHistory = this.msg
      this.$socket.emit('sendMsg', {selfaccount: storage.get('account'), otheraccount: storage.get('otheraccount'), chathistory: this.msgList})
      this.msg = ''
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/css/chat";
</style>
