<template>
  <div>
    <mt-header style="background-color: black" fixed title="我"></mt-header>
    <div>
      <mt-cell class="tab-item headshow-box" :title=username :label=account to="personalinfo" is-link>
        <img class="headshow" slot="icon" :src='headshow'>
        <span><img src="../assets/images/code.png" width="18" height="18"/></span>
      </mt-cell>
    </div>
    <br/>
    <div>
      <mt-cell class="tab-item" title="钱包" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/wallet.png" width="24" height="24">
      </mt-cell>
      </div>
      <br/>
    <div>
      <mt-cell class="tab-item" title="收藏" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/collection.png" width="24" height="24">
      </mt-cell>
      <mt-cell class="tab-item" title="相册" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/album.png" width="24" height="24">
      </mt-cell>
      <mt-cell class="tab-item" title="卡包" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/cards.png" width="24" height="24">
      </mt-cell>
      <mt-cell class="tab-item" title="表情" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/emotion.png" width="24" height="24">
      </mt-cell>
    </div>
      <br/>
    <div>
      <mt-cell class="tab-item" title="设置" to="/setting" is-link>
        <img slot="icon" src="../assets/images/setting.png" width="24" height="24">
      </mt-cell>
    </div>
    <tabbar selected="me"></tabbar>
  </div>
</template>

<script>
import tabbar from '../components/tabbar'
import tabcontainer from '../components/tab-container'
import storage from '../assets/js/storage'
import headshow from '../assets/js/headshow'
export default {
  name: 'me',
  data () {
    return {
      account: '',
      username: '',
      headshow: ''
    }
  },
  components: {tabbar: tabbar, 'tab-container': tabcontainer},
  mounted: function () {
    //console.log(this.$store.state)
    this.account = storage.get('account')
    this.username = storage.get('username')
    this.headshow = headshow[storage.get('headshow')].url
  }

}
</script>

<style scoped lang="less" type="text/less">

.headshow{
  width: 52px;
  height: 52px;
  border-radius: 5px;
  margin: 10px 0px;
  margin-right: 3px;
}
.tab-item{
  text-align: left;
  vertical-align: middle;
}
</style>
<style lang="less">
  .mint-cell-label{
    display: inline-block !important;
  }
</style>
