<template>
  <div class="register">
    <p>register</p>
    <form v-on:submit="register">
      <label for="username">username: </label>
      <input type="text" name="username" autofocus required />

      <label for="email">email: </label>
      <input type="email" name="email" required />

      <label for="password">password: </label>
      <input type="password" name="password" required />

      <label for="password2">repeat password: </label>
      <input type="password" name="password2" required />

      <button type="submit">Register</button>
    </form>
    {{ error }}
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";

export default {
  name: "Register",
  data() {
    return { error: "" };
  },
  methods: {
    register: function(e) {
      e.preventDefault();

      let username = e.target.elements.username.value;
      let password = e.target.elements.password.value;
      let email = e.target.elements.email.value;
      let password2 = e.target.elements.password2.value;

      if (!username || !password || !email || !password2) {
        this.error = "All fields must be filled";
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
              router.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
        };
        register();
      }
    },
  },
};
</script>
