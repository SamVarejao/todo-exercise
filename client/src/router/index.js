import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import List from "../views/List.vue";
import axios from "axios";

Vue.use(VueRouter);

function routeGuardAuth(to, from, next) {
  // protect routes from logged in users

  axios
    .get("/api/safeguard") //makes a serverside call to check if the user is logged in
    .then((response) => {
      if (response.data.login == true) {
        next("/list");
      } else {
        next();
      }
    });
}

function routeGuard(to, from, next) {
  // protect routes from non-logged in users
  function popUp() {
    alert("Please log in");
  }

  axios.get("/api/safeguard").then((response) => {
    if (response.data.login == true) {
      next();
    } else {
      next("/login");
      popUp();
    }
  });
}

const routes = [
  {
    path: "/",
    name: "main",
    beforeEnter: routeGuardAuth,
    components: {
      a: Login,
    },
  },
  {
    path: "/register",
    name: "Register",
    beforeEnter: routeGuardAuth,
    components: {
      a: Register,
    },
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: routeGuardAuth,
    components: {
      a: Login,
    },
  },
  {
    path: "/list",
    name: "List",
    beforeEnter: routeGuard,
    components: {
      a: List,
    },
  },
  {
    path: "*",
    name: "*",
    beforeEnter: routeGuardAuth,
    components: {
      a: Login,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
