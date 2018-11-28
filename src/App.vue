<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
    data: function() {
        return {}
    }
}
</script>

<style>
#app {
    /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px; */
}
* {
    margin: 0;
    padding: 0;
}
input {
    border: none;
}
input:focus {
    outline: none;
}
button {
    border: 0;
    outline: none;
    cursor: pointer;
}
button:after {
    border: none;
}
</style>
