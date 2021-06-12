<template>
  <div class="list">
    <button @click="logout">Logout</button>
    <Create></Create>
    <Item></Item>
  </div>
</template>

<script>
import Item from "../components/Item.vue";
import Create from "../components/Create.vue";
import axios from "axios";
import router from '../router';
export default {
  name: "List",
  components: { Item, Create },
  methods: {
    logout: function() {
      axios.get("/api/logout").then(() => 
      {
          console.log("User logout");
          router.push("/");
      });
    },
  },
};
</script>

<style></style>
