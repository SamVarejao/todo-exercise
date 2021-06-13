<template>
  <div class="register">
    <h1>Register</h1>
    <form v-on:submit="register">
      <label for="username">Username</label>
      <input type="text" name="username" id="username" autofocus required />

      <label for="email">Email</label>
      <input type="email" name="email" id="email" required />

      <label for="password">Password</label>
      <input type="password" name="password" id="password" required />

      <label for="password2">Repeat password</label>
      <input type="password" name="password2" id="password2 " required />

      <button type="submit">Register</button>
    </form>
    <p>
      Been here before?
      <span><router-link to="/login">Login!</router-link> </span>
    </p>
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
        return (this.errors = "All fields must be filled");
      }
      if (password != password2) {
        return (this.errors = "Passwords must match ");
      }
      if (password.length <= 6) {
        return (this.errors = "Password must be longer ");
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
<style scoped>
.register {
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
