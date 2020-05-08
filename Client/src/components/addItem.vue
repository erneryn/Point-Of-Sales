<template>
  <div class="ml-2">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" rounded color="secondary" dark>Add New</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add New Item</span>
        </v-card-title>
        <v-card-text>
          <v-form 
          lazy-validation
          v-model="valid"
          ref="form"
          >
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Item Name *" :rules="nameRules" v-model="name" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Prize *" :rules="prizeRules" prefix="Rp" v-model="prize" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Cost *" :rules="prizeRules" prefix="Rp" v-model="cost" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Stock *" v-model="stock" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="categories"
                  v-model="category"
                  item-text="name"
                  item-value="_id"
                  label="Category"
                  single-line
                  :rules="[v => !!v || 'category is required']"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          </v-form>
          <small>* indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeForm"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click.prevent="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    valid:true,
    name:"",
    cost:"",
    prize:"",
    category:"",
    stock:"",
    nameRules:[ v => !!v || 'Name is required'],
    prizeRules:[ v => !!v || "Prize & Cost required"]
  }),
  computed:{
      categories(){
          return this.$store.state.allCategory
      }
  },
  
  methods:{
      submit(){
          if(this.$refs.form.validate()){
          this.$axios.post('/items',{
              name: this.name,
              cost: this.cost,
              prize: this.prize,
              stock: this.stock,
              categoryId: this.category
          }).then(()=>{
              this.dialog = false
              this.$refs.form.reset()
              this.$store.dispatch('fetchData')
          }).catch(err=>{
            console.log(err)
          })
          } 
      },
      closeForm(){
        this.dialog = false
        this.$refs.form.reset()
      }
  }
};
</script>

<style></style>
