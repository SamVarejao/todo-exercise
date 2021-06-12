<template>
  <div class="login">
    <h1>login</h1>

    <form v-on:submit="login">
      <label for="email">email: </label>
      <input type="email" name="email" autofocus required />
      <label for="password">password: </label>
      <input type="password" name="password" required />
      <button type="submit">Login</button>
    </form>

    <p>
      New here? <span> <router-link to="/register">Register!</router-link></span>
    </p>
    {{ errors }}
  </div>
</template>
<script>
import router from "../router";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return { errors: "" };
  },
  methods: {
    login: function(e) {
      e.preventDefault();

      let email = e.target.elements.email.value;
      let password = e.target.elements.password.value;
      if (!email || !password) {
        this.error = "All fields must be filled";
      } else {
        let login = () => {
          let data = {
            email,
            password,
          };
          axios
            .post("/api/login", data)
            .then(() => {
              console.log("Log in successful");
              router.push("/list");
            })
            .catch((error) => {
              console.log(error.response.data[1].Error);
              this.errors = error.response.data[1].Error;
            });
        };

        login();
      }
    },
  },
};
</script>
