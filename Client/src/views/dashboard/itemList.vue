<template>
  <v-card class="ma-2">
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-card-title>
      <modalAdd></modalAdd>
      <v-btn class="ml-2" @click="deleteItem" v-if="selected.length !== 0" rounded color="error" dark>Delete {{selected.length}} Item</v-btn>
      <v-spacer></v-spacer>
      <div class="filter">
        <v-select
          v-model="filtered"
          :items="categories"
          label="By Category"
          multiple
          chips
          hint="Choose categories"
          persistent-hint
        ></v-select>
      </div>
      <div class="stock ml-4">
        <v-select
          v-model="stocks"
          :items="options"
          label="By Stock"
          hint="Select options"
          persistent-hint
        ></v-select>
      </div>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :single-select="singleSelect"
      item-key="_id"
      show-select
      class="elevation-1"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.prize="{ item }">
        Rp. {{new Intl.NumberFormat().format(item.prize)}}
      </template>
       <template v-slot:item.cost="{ item }">
        Rp. {{new Intl.NumberFormat().format(item.cost)}}
      </template>
        <template v-slot:item.margin="{ item }">
        {{(((item.prize - item.cost)/item.prize)*100).toString().slice(0,4)}}%
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import modalAdd from "@/components/addItem.vue";
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
    filtered: [],
    options: ["", "less than 5", "less than 10", "more than 10"],
    headers: [
      {
        text: "Item Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Category", value: "category.name", sortable: false },
      { text: "Prize", value: "prize" },
      { text: "Cost", value: "cost" },
      { text: "Margin" , value: "margin"},
      { text: "Stock", value: "stock" },
    ]
  }),
  computed: {
    desserts() {
      if (this.filtered.length == 0 && this.stocks.length == 0) {
        return this.$store.state.allItem;
      } else if (this.filtered.length !== 0 && this.stocks.length !== 0) {
        return this.$store.state.allItem
          .filter((e) => this.filtered.includes(e.category.name))
          .filter((e) => {
            switch (this.stocks) {
              case "more than 10":
                return e.stock > 10;
              case "less than 10":
                return e.stock <= 10;
              case "less than 5":
                return e.stock <= 5;
              default:
                return e;
            }
          });
      } else if (this.filtered.length !== 0 && this.stocks.length == 0) {
        return this.$store.state.allItem.filter((e) =>
          this.filtered.includes(e.category.name)
        );
      } else {
        return this.$store.state.allItem.filter((e) => {
          switch (this.stocks) {
            case "more than 10":
              return e.stock > 10;
            case "less than 10":
              return e.stock <= 10;
            case "less than 5":
              return e.stock <= 5;
            default:
              return e;
          }
        });
      }
    },
    categories() {
      return this.$store.state.allCategory.map((e) => e.name);
    },
  },

  methods: {
    newItem() {
      console.log([...this.dessert].slice(2));
      this.dessert = this.dessert.slice(2);
    },
    deleteItem(){
      const willDelete = this.selected.map(e => e._id)
      axios.delete("http://localhost:3000/items",{ data :{ itemId : willDelete}})
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
