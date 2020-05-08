<template>

  <div class="home">
<Header/>
    <router-view/>
</div>
 
</template>

<script>

import Header from "../views/partials/Header"

export default {
  name: "Home",
  components: {
    Header
  }
};
</script>
