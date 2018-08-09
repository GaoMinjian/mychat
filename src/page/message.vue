<template>
  <div id="message">
    <mt-header style="background-color: black" fixed title="vchat"></mt-header>
    <div class="chatList"><!--群聊-->
      <div class="chatGoup" @click="joinGroup">
        <img src="../assets/fail.png">
        <div class="info">
          <div class="info-top">
            <span class="chatTitle">公共聊天室</span>
            <span class="latestTime">{{latestGroupTime}}</span>
          </div>
          <div class="latestMsg">{{latestGroupName}}：{{latestGroupMsg}}</div>
        </div>
      </div>
    </div>
    <br/>
    <div class="chatList"><!--私聊-->
      <div v-for="item in latestPrivate" :key="item.otheraccount" class="chatGoup privatechat" @click="joinConversation(item.othername,item.otheraccount)">
        <img :src=getHeadshow(item.otheraccount) />
        <div class="info">
          <div class="info-top">
            <span class="chatTitle">{{item.othername}}</span>
            <span class="latestTime">{{item.latestmsg.time}}</span>
          </div>
          <div class="latestMsg">{{item.latestmsg.content}}</div>
        </div>
      </div>
    </div>
    <tabbar selected="message"></tabbar>
  </div>
</template>

<script>
import tabbar from '../components/tabbar'
import storage from '../assets/js/storage'
import headshow from '../assets/js/headshow'
export default {
  name: 'message',
  components: {tabbar: tabbar},
  data () {
    return {
      latestGroupName: '',
      latestGroupMsg: '',
      latestGroupTime: '',
      latestPrivate: [],
      usersinfo: []
    }
  },
  sockets: {
    getLatestGroupMsg (data) {
      this.latestGroupMsg = data.content
      this.latestGroupTime = data.time
      this.latestGroupName = data.username
    },
    getLatestPrivateHistory (data) { // data: {otherinfo,latestmsg}
      this.latestPrivate = data
    }
  },
  // 这两个接收都是在update
  created () {
    this.usersinfo = this.$store.state.usersinfo
    this.$socket.emit('reqLatestGroupMsg')
    this.$socket.emit('reqLatestPrivateHistory', storage.get('account'))
  },
  methods: {
    getHeadshow (account) {
      return headshow[this.usersinfo[account].headshow].url
    },
    joinGroup () {
      this.$socket.emit('reqGroupHistory')
      this.$router.push({
        path: 'groupchat'
      })
    },
    joinConversation (name, account) {
      if (storage.get('account') != '') {
        this.$socket.emit('getPrivateHistory', {
          selfaccount: storage.get('account'),
          otheraccount: account
        })
      }
      storage.set('othername', name)
      storage.set('otheraccount', account)
      storage.set('otherheadshow', this.usersinfo[account].headshow)
      // console.log(this.$store.state.theother.username,this.$store.state.theother.account)
      this.$router.push({
        path: 'conversation'
      })
    }
  }
}
</script>

<style scoped lang="less">

.tab-item{
text-align: left;
  img{
    height: 48px;
    width: 48px;
    border-radius: 5px;
    margin: 5px 0px;
  }
}
.chatList{
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
}
  .chatGoup{
    text-align: left;
    background-color: white;
    padding: 3px;
    img{
      display: inline-block;
      border-radius: 3px;
      width: 48px;
      height: 48px;
      margin: 4px 5px 0;
    }
  }
  .privatechat{
    border-bottom: 1px solid lightgrey;
  }
  .info{
    display: inline-block;
    width: 82%;
    /*background-color: red;*/
    vertical-align: top;
    margin: 8px 0;
   }
  .info-top{
    vertical-align: top;
    margin-bottom: 4px;
  }
  .latestTime{
    float: right;
    color: gray;
    font-size: .7rem;
  }
.latestMsg {
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .9rem;
  color: gray;
}
</style>
