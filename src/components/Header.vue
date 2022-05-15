<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      v-show="HomePage"
      @btn-click="$emit('toggle-add-task')"
      :text="!showAddTask ? 'Add Task' : 'Close'"
      :color="showAddTask ? 'red' : 'green'"
    />
  </header>
</template>

<script>
import Button from "./Button.vue";

export default {
  name: "Header",
  props: {
    title: String,
    showAddTask: Boolean,
  },
  components: {
    Button,
  },
  emits: ["toggle-add-task"],
  computed: {
    HomePage() {
      return this.$route.path === "/";
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
