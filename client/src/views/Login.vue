<template>
  <div class="login">
    <h1>Login</h1>

    <form v-on:submit="login">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" autofocus required />
      <label for="password">Password</label>
      <input type="password" name="password" id="password" required />
      <button type="submit">Login</button>
    </form>
    <p>
      New here?
      <span> <router-link to="/register">Register!</router-link></span>
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
<style scoped>
.login {
  background-color: white;
  display: grid;
  grid-template-rows: 1fr 5fr 1fr;
  grid-template-columns: 20% auto 20%;
  height: 500px;
  width: 500px;
  border-radius: 5px;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.2);
}

form {
  grid-column: 2;
  grid-row: 2;
  margin-right: auto;
  margin-left: auto;
}
input {
  display: block;
}
label {
  display: block;
  margin-top: 15px;
}
button {
  margin: 30px auto;
  display: block;
}
h1 {
  grid-column: 2;
  grid-row: 1;
  margin-right: auto;
  margin-left: auto;
}
p {
  grid-column: 2;
  grid-row: 3;
  margin-right: auto;
  margin-left: auto;
}
</style>
