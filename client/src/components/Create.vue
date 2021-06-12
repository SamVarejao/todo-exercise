<template>
  <div>
    <p>Create task:</p>
    <form v-on:submit="create">
      <label for="task">Task: </label>
      <input type="text" name="task" required />

      <label for="completion">Completion: </label>
      <select v-model="selected" @change="percentVal" required>
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
      <input type="date" name="start" required />

      <label for="due">Due: </label>
      <input type="date" name="due" required />

      <label for="priority">Priority: </label>
      <select v-model="selected" @change="priorityVal" required>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label for="status">Status: </label>
      <select v-model="selected" @change="statusVal" required>
        <option selected value="Not started">Not started</option>
        <option value="Started">Started</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit">New task</button>
    </form>
    {{ errors }}
  </div>
</template>

<script>
import axios from "axios";
import { bus } from '../main'
export default {
  name: "Create",
  data() {
    return {
      errors: null,
      priVal: "null",
      statVal: "Not started",
    };
  },
  methods: {
    create: function(e) {
      e.preventDefault();

      let task = e.target.elements.task.value;
      let completion = this.percVal;
      let start = e.target.elements.start.value;
      let due = e.target.elements.due.value;
      let priority = this.priVal;
      let status = this.statVal;

      let data = { task, completion, start, due, priority, status };
      if (!task || !completion || !start || !due || !priority || !status) {
        this.errors = "Please enter all fields";
      } else {
        axios
          .post("/api/create", data)
          .then(() => {
            bus.$emit("loadNew");
            console.log("New task created");
          })
          .catch((error) => {
            this.errors = error;
          });
      }
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
};
</script>

<style></style>
