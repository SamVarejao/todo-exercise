<template>
  <div class="register">
    <h1>register</h1>
    <form v-on:submit="register">
      <label for="username">username: </label>
      <input type="text" name="username"  autofocus required/>

      <label for="email">email: </label>
      <input type="email" name="email" required/>

      <label for="password">password: </label>
      <input type="password" name="password" required/>

      <label for="password2">repeat password: </label>
      <input type="password" name="password2" required/>

      <button type="submit">Register</button>
    </form>
    <p>Been here before? <span><router-link to="/login">Login!</router-link> </span></p>
    {{ errors }}
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";

export default {
  name: "Register",
  data() {
    return { errors: "" };
  },
  methods: {
    register: function(e) {
      e.preventDefault();

      let username = e.target.elements.username.value;
      let password = e.target.elements.password.value;
      let email = e.target.elements.email.value;
      let password2 = e.target.elements.password2.value;

      if (!username || !password || !email || !password2) {
        return this.errors = "All fields must be filled";
      }
      if (password != password2) {
        return this.errors = "Passwords must match ";
      }
      if (password.length <= 6) {
        return this.errors = "Password must be longer ";
      } else {
        let register = () => {
          let data = {
            username,
            email,
            password,
            password2,
          };

          axios
            .post("/api/register", data)
            .then(() => {
              router.push("/login");
            })
            .catch((error) => {
              console.log(error);
              this.errors = error.response.data;
            });
        };
        register();
      }
    },
  },
};
</script>
