<template>
  <div>
    <mt-header style="background-color: black" fixed title="通讯录"></mt-header>
    <div id="main">
      <div>
        <mt-cell-swipe class="tab-item" v-for="item in this.$store.state.allusers" :key="item.account" :right="[
      {
        content: '发消息',
        style: { background: '#47FA52', color: '#fff' },
        handler: () => chatting(item.name, item.account, item.headshow)
      }
    ]" :title=item.name>
          <span style="font-size: 14px">账号:{{item.account}}</span>
          <img class="headshow" slot="icon" src="../assets/fail.png" width="32" height="32">
        </mt-cell-swipe>

      </div>
    </div>
    <div></div>
    <tabbar selected="addressbook"></tabbar>
  </div>
</template>

<script>
import tabbar from '../components/tabbar'
import search from '../components/search'
import storage from '../assets/js/storage'
import headshow from '../assets/js/headshow'
export default {
  name: 'addressbook',
  components: {tabbar: tabbar, search: search},
  data () {
    return {
      allusers: []
    }
  },
  mounted () {
    var headshows = document.getElementsByClassName('headshow')
    for (var i = 0; i < this.$store.state.allusers.length; i++) {
      headshows[i].setAttribute('src', headshow[this.$store.state.allusers[i].headshow].url)
    }
  },
  methods: {
    chatting (name, account, headshownum) {
      if (storage.get('account') != '') {
        this.$socket.emit('getPrivateHistory', {
          selfname: storage.get('username'),
          selfaccount: storage.get('account'),
          othername: name,
          otheraccount: account
        })
      }
      storage.set('othername', name)
      storage.set('otheraccount', account)
      storage.set('otherheadshow', headshownum)
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
}

</style>
