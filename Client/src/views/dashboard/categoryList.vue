<template>
<div>
    <v-row>
   
    <v-col :cols="6">
  <v-card class="ma-2">
    <v-card-title>
      Categories
      <v-spacer></v-spacer>

    </v-card-title>

    <v-card-title>
      <modalAdd></modalAdd>
      <v-btn class="ml-2" @click="deleteItem" v-if="selected.length !== 0" rounded color="error" dark>Delete {{selected.length}} Categories</v-btn>
    </v-card-title>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="categories"
      :single-select="singleSelect"
      item-key="_id"
      show-select
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
     
    </v-data-table>
  </v-card>
  </v-col>
   </v-row>
  </div>
</template>

<script>
import modalAdd from "@/components/addCat.vue";
import axios from 'axios'

export default {
  components: {
    modalAdd,
  },
  name: "itemList",
  data: () => ({
    search: "",
    singleSelect: false,
    loading: false,
    selected: [],
    stocks: "",
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Total Item", value: "items.length", sortable: false, align:"center" },
   
    ]
  }),
  computed: {
    categories() {
      return this.$store.state.allCategory
    
    }
  },

  methods: {
    deleteItem(){
      const willDelete = this.selected.map(e => e._id)
      axios.delete("http://localhost:3000/category",{ data :{ categoryId : willDelete}})
      .then(()=>{
        this.$store.dispatch('fetchData')
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.filter {
  width: 20vw;
}
</style>
