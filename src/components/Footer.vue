<template>
  <footer>
    <p>Copyright &copy; {{ year }}</p>
    <router-link to="/about">About</router-link>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  setup() {
    return { year: new Date().getFullYear() };
  },
};
</script>
