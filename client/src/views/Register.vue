<template>
  <div class="register">
    <p>register</p>
    <form v-on:submit="register">
      <label for="username">username: </label>
      <input type="text" name="username" />

      <label for="email">email: </label>
      <input type="email" name="email" />

      <label for="password">password: </label>
      <input type="password" name="password" />

      <label for="password2">repeat password: </label>
      <input type="password" name="password2" />

      <button type="submit">Register</button>
    </form>
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
              router.push("/");
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
