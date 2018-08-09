<template>
    <div id="about">
      <mt-header style="background-color: black" fixed title="关于V信">
        <router-link to="/setting" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <img src="../assets/images/green.jpg"/>
      <div>
        <mt-cell class="tab-item" title="去评分" is-link></mt-cell>
        <mt-cell class="tab-item" title="功能介绍" is-link></mt-cell>
        <mt-cell class="tab-item" @click.native="kill" title="投诉" is-link></mt-cell>
      </div>
      <br/>
      <div>
        <mt-cell class="tab-item" title="版本更新" is-link></mt-cell>
      </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  name: 'about',
  methods: {
    kill () {
      Toast('律师函警告！')
      this.$router.push({
        path: '/'
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
