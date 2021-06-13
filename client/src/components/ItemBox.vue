<template>
  <div class="itemBox">
    <div class="itemDiv">
      <p class=" gc1">{{ task }}</p>
      <p class=" gc2">{{ completion }}%</p>
      <p class=" gc3">{{ start }}</p>
      <p class=" gc4">{{ due }}</p>
      <p class="gc5">{{ priority }}</p>
      <p class="gc6">{{ status }}</p>
      <button @click="deleteItem" class=" gc8">Delete</button>
    </div>
    <form v-on:submit="editItem">
      <select v-model="selected" class=" gc2" @change="percentVal">
        <option value="0">0%</option>
        <option value="10">10%</option>
        <option value="20">20%</option>
        <option value="30">30%</option>
        <option value="40">40%</option>
        <option value="50">50%</option>
        <option value="60">60%</option>
        <option value="70">70%</option>
        <option value="80">80%</option>
        <option value="90">90%</option>
        <option value="100">100%</option>
      </select>

      <input type="date" name="start" class=" gc3" />

      <input type="date" name="due" class=" gc4" />

      <select v-model="selected" class=" gc5" @change="priorityVal">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select v-model="selected" class=" gc6" @change="statusVal">
        <option selected value="Not started">Not started</option>
        <option value="Started">Started</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit" class=" gc8">Edit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { bus } from "../main";

export default {
  name: "ItemBox",
  data() {
    return {
      priVal: null,
      statVal: null,
      percVal: null,
    };
  },
  methods: {
    deleteItem: function(e) {
      e.preventDefault();
      const url = `/api/delete/${this.id}`;
      if (confirm("Are you sure?")) {
        axios
          .delete(url)
          .then(() => {
            bus.$emit("removeItem", this.keyNum);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    editItem: function(e) {
      e.preventDefault();

      let completion = this.percVal;
      let start = e.target.elements.start.value;
      let due = e.target.elements.due.value;
      let priority = this.priVal;
      let status = this.statVal;
      let id = this.id;

      let data = { completion, start, due, priority, status, id };
      console.log(data.due);

      axios
        .post("/api/edit", data)
        .then(() => {
          bus.$emit("loadNew");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    priorityVal: function() {
      this.priVal = this.selected;
    },
    statusVal: function() {
      this.statVal = this.selected;
    },
    percentVal: function() {
      this.percVal = this.selected;
    },
  },
  props: {
    keyNum: Number,
    task: String,
    completion: Number,
    start: String,
    due: String,
    priority: String,
    status: String,
    id: String,
  },
};
</script>

<style scoped>
.itemBox {
  margin-top: 1px;
  width: 95vw;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 10px;
}

.itemDiv {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 100%;
  row-gap: 5px;
  column-gap: 10px;
  background-color: rgba(0, 0, 0, 0.377);
  padding: 10px 10px;
  color: white;
  
}

form {
  background-color: rgba(0, 0, 0, 0.377);
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 100%;
  row-gap: 5px;
  column-gap: 10px;
  padding: 10px 10px;
}
.gc1 {
  grid-column: 1;
}
.gc2 {
  grid-column: 2;
}
.gc3 {
  grid-column: 3;
}
.gc4 {
  grid-column: 4;
}
.gc5 {
  grid-column: 5;
}
.gc6 {
  grid-column: 6;
}
.gc7 {
  grid-column: 7;
}
.gc8 {
  grid-column: 8;
}
.gr1 {
  grid-row: 1;
}
.gr2 {
  grid-row: 2;
}
</style>
