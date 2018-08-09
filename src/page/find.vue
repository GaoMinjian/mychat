<template>
  <div>
    <mt-header style="background-color: black" fixed title="发现"></mt-header>
    <div>
      <mt-cell class="tab-item" title="朋友圈" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/moments.png" width="24" height="24">
      </mt-cell>
    </div>
    <br/>
    <div>
      <mt-cell class="tab-item" title="扫一扫" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/scan.png" width="24" height="24">
      </mt-cell>
      <mt-cell class="tab-item" title="摇一摇" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/shake.png" width="24" height="24">
      </mt-cell>
    </div>
    <br/>
    <div>
      <mt-cell class="tab-item" title="看一看" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/look.png" width="24" height="24">
      </mt-cell>
      <mt-cell class="tab-item" title="搜一搜" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/search.png" width="24" height="24">
      </mt-cell>
    </div>
    <br/>
    <div>
      <mt-cell class="tab-item" title="附近的人" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/near.png" width="24" height="24">
      </mt-cell>
      <mt-cell class="tab-item" title="漂流瓶" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/floater.png" width="24" height="24">
      </mt-cell>
    </div>
    <br/>
    <div>
      <mt-cell class="tab-item" title="购物" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/shopping.png" width="24" height="24">
      </mt-cell>
      <mt-cell class="tab-item" title="游戏" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/game.png" width="24" height="24">
      </mt-cell>
    </div>
    <br/>
    <div>
      <mt-cell class="tab-item" title="小程序" to="/unfinished" is-link>
        <img slot="icon" src="../assets/images/program.png" width="24" height="24">
      </mt-cell>
    </div>
    <div style="height: 5rem"></div>
    <tabbar selected="find"></tabbar>
  </div>
</template>

<script>
import tabbar from '../components/tabbar'
import tabcontainer from '../components/tab-container'
export default {
  name: 'conversation',
  components: {tabbar: tabbar, 'tab-container': tabcontainer},
}
</script>

<style scoped lang="less">
.tab-item{
  text-align: left;
  border-top: none;

}

</style>
