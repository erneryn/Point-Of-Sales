<template>
  <v-app>
    <v-content>
     <router-view/>
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: "App",

  components: {
  
  },

  data: ()=> ({
  
  }),


  computed:{
    
  },

  created(){
    this.$store.dispatch('fetchData')
  }

};
</script>
<style lang="scss">

</style>
