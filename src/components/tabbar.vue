<template>
  <div>
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="message">
        <img slot="icon" src="../assets/images/msg.png">
        信息
      </mt-tab-item>
      <mt-tab-item id="addressbook">
        <img slot="icon" src="../assets/images/addressbook.png">
        通讯录
      </mt-tab-item>
      <mt-tab-item id="find">
        <img slot="icon" src="../assets/images/find.png">
        发现
      </mt-tab-item>
      <mt-tab-item id="me">
        <img slot="icon" src="../assets/images/me.png">
        我
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  data () {
    return {
    }
  },
  props: ['selected'],
  watch: {
    $route () {
      console.log('改变路由')
      this.selected = sessionStorage.getItem('pageUrl')
    },
    selected: function (val, oldVal) {
      // 这里就可以通过 val 的值变更来确定
      this.$router.push({
        path: val
      })
      this.titleText = sessionStorage.getItem('pageTitle')
    }
  }
}
</script>

<style scoped lang="less">

</style>
