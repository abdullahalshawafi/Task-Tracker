<template>
  <div class="container">
    <Header
      @toggle-add-task="toggleAddTask"
      title="Task Tracker"
      :showAddTask="showAddTask"
    />
    <router-view :showAddTask="showAddTask"></router-view>
    <Footer />
  </div>
</template>

<script>
import { ref } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: { Header, Footer },
  setup() {
    const showAddTask = ref(false);

    const toggleAddTask = () => {
      showAddTask.value = !showAddTask.value;
    };

    return { showAddTask, toggleAddTask };
  },
};
</script>

<style>
@import url("@/styles/App.css");
</style>
