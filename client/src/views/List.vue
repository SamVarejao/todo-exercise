<template>
  <div class="list">
    <create></create>
    <div class="postList">
      <item-box
        v-for="(item, index) in items"
        v-bind:key="index"
        v-bind:keyNum="index"
        v-bind:task="item.task"
        v-bind:completion="item.completion"
        v-bind:start="item.start"
        v-bind:due="item.due"
        v-bind:priority="item.priority"
        v-bind:status="item.status"
        v-bind:id="item._id"
      >
      </item-box>
    </div>
  </div>
</template>

<script>
import Create from "../components/Create.vue";
import ItemBox from "../components/ItemBox.vue";

import { bus } from "../main";
import axios from "axios";

export default {
  name: "List",
  components: { ItemBox, Create },

  data() {
    return { items: null };
  },
  async created() {
    this.items = await axios.get("api/retrieve").then((response) => {
      return response.data;
    });

    bus.$on("loadNew", async () => {
      this.items = await axios.get("api/retrieve").then((response) => {
        return response.data;
      });
    });

    bus.$on("removeItem", (data) => {
      this.items.splice(data, 1);
      console.log(data);
    });
  },
};
</script>

<style scoped>
.list {
  overflow: hidden;
  height: 100vh;
}
.postList {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 80%;
}
</style>
