<template>
    <div id="setting">
      <mt-header style="background-color: black" fixed title="设置">
        <router-link to="/me" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div>
        <mt-cell class="tab-item" title="账号与安全" is-link></mt-cell>
      </div>
      <br/>
      <div>
        <mt-cell class="tab-item" title="帮助与反馈" is-link></mt-cell>
        <mt-cell class="tab-item" title="关于V信" to="/about" is-link>
          <span>beta版本0.2.0</span>
        </mt-cell>
      </div>
      <br/>
      <mt-button @click.native="popupLogoff = true" size="large" style="background-color: white">退出登录</mt-button>
      <div>
        <mt-popup v-model="popupLogoff" position="bottom" class="mint-popup-bottom">
          <div class="popup-option explanation"><p>退出后不会删除任何历史数据，下次登录依然可以使用本账号</p></div>
          <div class="popup-option logoff" @click="logoff">退出登录</div>
          <div class="popup-option cancel" @click="popupLogoff = false">取消</div>
        </mt-popup>
      </div>
    </div>
</template>

<script>
export default {
  name: 'setting',
  data () {
    return {
      popupLogoff: false
    }
  },
  methods: {
    logoff () {
      sessionStorage.clear()
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

//popup样式
.mint-popup-bottom {
  width: 100%;
  background-color: #f5f5f5;
  .picker-slot-wrapper, .picker-item {
    backface-visibility: hidden;
  }
  .popup-option{
    padding: 0.9rem;
    background-color: white;
  }
  .explanation{
    font-size: 0.8rem;
    color: gray;
    border-bottom: 1px solid lightgrey;
  }
  .logoff{
    color: red;
    margin-bottom: 5px;
  }
}
</style>
