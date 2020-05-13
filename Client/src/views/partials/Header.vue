<template>
    <div>
   <v-app-bar app color="#ff793f" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>COFFEE SHOP POINT OF SALES</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="mr-5">Admin, hello user</v-toolbar-title>
      <v-btn @click="signOut" v-if="buttonSize == 'xs'" class="mr-2" x-small="" color="#ffda79" light>Log Out</v-btn>
      <v-btn @click="signOut" v-if="buttonSize !== 'xs'" small="" color="#ffda79" light>Log Out</v-btn>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list nav dense>
        <v-subheader>Menus</v-subheader>
        <v-list-group v-for="item in items" :key="item.title" no-action>
          <v-icon slot="prependIcon" :color="item.color">{{
            item.icon
          }}</v-icon>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.childs"
            :key="child.title"
            v-on:click="push(child.target)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name:'Header',
    data: () => ({
    drawer: false,
    item: 1,
    items: [
      {
        text: "Items",
        icon: "mdi-basket",
        color: "#ff5252",
        childs: [
          { title: "Item list", target:'Item' },
          { title: "Category", target:'category' },
          { title: "Discount" },
        ],
      },
      { 
        text: "Reports", 
        icon: "mdi-clipboard-text", 
        color: "#34ace0",
        childs: [
          { title: "Sales" },
          { title: "Sales by item" },
          { title: "Receipts" },
        ],
      },
      { text: "Conversions", icon: "mdi-flag" },
    ],
    isLogin : false
  }),

 

  methods:{
    push(target){
      this.$router.push({ name: target},()=>{})
    },
   signOut(){
      localStorage.clear()
      this.$router.push({path: '/login'})
    }
  },

  computed:{
    buttonSize () {
        return this.$vuetify.breakpoint.name
      },

      
  }
}
</script>

<style lang="scss" scoped>
.item {
  .v-list-item__icon {
    color: red;
  }
}
</style>