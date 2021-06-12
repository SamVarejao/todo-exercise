<template>
  <div class="wrapper">
    <div class="itemDiv">
      <p>{{ task }}</p>
      <p>{{ completion }}%</p>
      <p>{{ start }}</p>
      <p>{{ due }}</p>
      <p>{{ priority }}</p>
      <p>{{ status }}</p>

      <button @click="deleteItem">Delete</button>
    </div>
    <div class="editDiv">
      <form v-on:submit="editItem">
        <label for="completion">Completion: </label>
        <select v-model="selected" @change="percentVal">
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

        <label for="start">Start: </label>
        <input type="date" name="start" />

        <label for="due">Due: </label>
        <input type="date" name="due" />

        <label for="priority">Priority: </label>
        <select v-model="selected" @change="priorityVal">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label for="status">Status: </label>
        <select v-model="selected" @change="statusVal">
          <option selected value="Not started">Not started</option>
          <option value="Started">Started</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">Edit</button>
      </form>
    </div>
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
      let id=this.id;

      let data = { completion, start, due, priority, status, id};
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

<style>
.itemDiv {
  display: flex;
  border: 1px solid black;
  margin: 20px auto 0px;
}
.itemDiv p{
  margin-left:20px ;
}
.editDiv {
  display: flex;
  border: 1px solid black;
  margin: 0px auto 20px;
}
</style>
