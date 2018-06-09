<template>
  <div class="query-result">
    <h1>{{$router.params.userId}}</h1>
  </div>
</template>

<script>

  export default {
    name: 'QueryResult',
    components:{
    },
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
.query-result{
  flex:1;
}

</style>
