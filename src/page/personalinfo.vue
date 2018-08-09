<template>
  <div id="personalinfo">
    <mt-header style="background-color: black" fixed title="个人信息">
      <router-link to="/me" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div>
      <mt-cell class="tab-item" title="头像" to="/changeheadshow" is-link>
        <span><img class="headshow" :src=headshow /></span>
      </mt-cell>
      <mt-cell class="tab-item" title="名字" is-link @click.native="setUsername">
        <span>{{username}}</span>
      </mt-cell>
      <mt-cell class="tab-item" title="账号">
        <span>{{account}}</span>
      </mt-cell>
      <mt-cell class="tab-item" title="我的二维码" is-link>
        <span><img src="../assets/images/code.png" width="18" height="18"></span>
      </mt-cell>
      <mt-cell class="tab-item" title="更多" is-link></mt-cell>
    </div>
    <br/>
    <div>
      <mt-cell class="tab-item" title="我的地址" is-link></mt-cell>
    </div>
  </div>

</template>

<script>
import headshow from '../assets/js/headshow'
import storage from '../assets/js/storage'
import {MessageBox} from 'mint-ui'
import {Toast} from 'mint-ui'
export default {
  name: 'prsonalinfo',
  data () {
    return {
      username: '',
      account: '',
      headshow: ''
    }
  },
  mounted: function () {
    this.account = storage.get('account')
    this.username = storage.get('username')
    this.headshow = headshow[storage.get('headshow')].url
  },
  methods: {
    setUsername () {
      MessageBox.prompt('请输入新昵称', '修改昵称').then(({value, action}) => {
        this.$socket.emit('setUsername', {account: storage.get('account'), username: value})
        storage.set('username', value)
        Toast('修改昵称成功')
      })
    }
  }
}
</script>

<style scoped lang="less">
.headshow{
  width: 52px;
  height: 52px;
  border-radius: 5px;
  margin: 10px 0;
}

.tab-item{
  text-align: left;
}
</style>
