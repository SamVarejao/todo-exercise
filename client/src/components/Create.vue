<template>
  <div class="create">
    <form v-on:submit="create">
      <label for="task" class="gr1 gc1">Task: </label>
      <input
        type="text"
        maxlength="30"
        name="task"
        id="task"
        class="gr2 gc1"
        required
      />

      <label for="completion" class="gr1 gc2">Completion: </label>
      <select
        v-model="selected"
        @change="percentVal"
        id="completion"
        class="gr2 gc2"
        required
      >
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

      <label for="start" class="gr1 gc3">Start: </label>
      <input type="date" name="start" id="start" class="gr2 gc3" required />

      <label for="due" class="gr1 gc4">Due: </label>
      <input type="date" name="due" id="due" class="gr2 gc4" required />

      <label for="priority" class="gr1 gc5">Priority: </label>
      <select
        v-model="selected"
        @change="priorityVal"
        id="priority"
        class="gr2 gc5"
        required
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label for="status" class="gr1 gc6">Status: </label>
      <select
        v-model="selected"
        @change="statusVal"
        id="status"
        class="gr2 gc6"
        required
      >
        <option selected value="Not started">Not started</option>
        <option value="Started">Started</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit" class="gr2 gc8">New task</button>
      <button @click="logout" class="gr1 gc8">Logout</button>
    </form>
    {{ errors }}
  </div>
</template>

<script>
import axios from "axios";
import { bus } from "../main";
import router from "../router";

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
    logout: function() {
      axios.get("/api/logout").then(() => {
        console.log("User logout");
        router.push("/");
      });
    },
  },
};
</script>

<style scoped>
.create {
  background-color: white;
  height: 100px;
  width: 95vw;
  padding: 20px 10px;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.2);
}
form {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 50% 50%;
  row-gap: 5px;
  column-gap: 10px;
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
