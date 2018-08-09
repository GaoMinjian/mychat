<template>
  <div id="unfinished">
    <mt-header style="background-color: black" fixed title="未完成页面">
      <router-link to="/message" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <h1>页面未完成！</h1>
  </div>
</template>

<script>
export default {
  name: 'unfinished'
}
</script>

<style scoped>

</style>
