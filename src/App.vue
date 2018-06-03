<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  width:100%;
  height:100%;
  background: url(./assets/images/bg-03.jpg) no-repeat;
  background-size:cover;
}
</style>
