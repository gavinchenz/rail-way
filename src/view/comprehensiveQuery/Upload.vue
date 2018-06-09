<template>
  <div class="my-upload">
    <h1>{{$router.params.userId}}</h1>
  </div>
</template>

<script>

  export default {
    name: 'Upload',
    components:{
    },
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
.my-upload{
  flex:1;
}

</style>
