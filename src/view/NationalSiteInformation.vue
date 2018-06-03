<template>
  <div class="national-site-information">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'NationalSiteInformation',
  data () {
    return {
      msg:"全国站点信息 NationalSiteInformation"
    }
  }
}
</script>

<style scoped>
.national-site-information{
  flex:1;
}
</style>
