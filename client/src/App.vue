<template>
  <div id="app">
    <router-view name="a" />
    <router-view />
  </div>
</template>

<style>
html,
body {
  margin: 0px;
  height: 100%;
  width: 100%;
  background: #10c6e6; /* fallback for old browsers */
  background: linear-gradient(to right, #4a00e0, #10c6e6);
}

button {
  background-color: #5bce5f;
  border: none;
  border-radius: 5px;
  color: white;
  height: 50px;
  width: 150px;
  padding: 10px 22px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font: bold;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
}
h1 {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>
