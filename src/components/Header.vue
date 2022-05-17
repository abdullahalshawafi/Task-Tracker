<template>
  <header v-show="HomePage">
    <h1>{{ title }}</h1>
    <Button
      @btn-click="$emit('toggle-add-task')"
      :text="!showAddTask ? 'Add Task' : 'Close'"
      :color="showAddTask ? 'red' : 'green'"
    />
  </header>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Button from "./Button.vue";

export default {
  name: "Header",
  props: {
    title: String,
    showAddTask: Boolean,
  },
  components: { Button },
  emits: ["toggle-add-task"],
  setup() {
    const route = useRoute();

    const HomePage = computed(() => route.path === "/");

    return { HomePage };
  },
};
</script>
