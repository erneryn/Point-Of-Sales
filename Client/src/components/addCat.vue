<template>
  <div class="ml-2">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" rounded color="secondary" dark>Add New</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add New Category</span>
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
                <v-text-field label="Category Name *" :rules="nameRules" v-model="name" required></v-text-field>
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
    nameRules:[ v => !!v || 'Name is required'],
  }),
  computed:{
      categories(){
          return this.$store.state.allCategory
      }
  },
  
  methods:{
      submit(){
          if(this.$refs.form.validate()){
          this.$axios.post('/category',{
              name: this.name,
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
