<template>
    <div id="changeheadshow">
      <mt-header style="background-color: black" fixed title="个人头像">
        <router-link to="/personalinfo" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div id="headshow_choice">
        <mt-swipe @change="handleChange" :auto="0">
          <mt-swipe-item v-for="item in this.headshow">
            <img :src=item.url />
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <mt-button type="default" @click.native="setHeadshow">设置为头像</mt-button>
    </div>
</template>

<script>
import headshow from '../assets/js/headshow'
import {Toast} from 'mint-ui'
import storage from '../assets/js/storage'
export default {
  name: 'changeheadshow',
  data () {
    return {
      headshow: [],
      index: ''
    }
  },
  created () {
    this.headshow = headshow
  },
  methods: {
    handleChange (index) {
      this.index = index
    },
    setHeadshow () {
      if (this.index != storage.get('headshow')) {
        this.$socket.emit('setHeadshow', {headshow: this.index, account: storage.get('account')})
        storage.set('headshow', this.index)
      }
      Toast('设置头像成功')
    }
  }
}
</script>

<style scoped lang="less">
#headshow_choice{
  margin: 10vh 0;
  width: 100vw;
  height: 60vh;
}
</style>
