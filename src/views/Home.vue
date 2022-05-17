<template>
  <AddTask v-show="showAddTask" @add-task="addTask" />
  <p v-if="loading" class="tasks-message">Loading...</p>
  <p v-else-if="!tasks.length" class="tasks-message">
    There are no tasks yet. Set some goals for yourself!
  </p>
  <Tasks
    v-else
    @toggle-reminder="toggleReminder"
    @delete-task="deleteTask"
    :tasks="tasks"
  />
</template>

<script>
import { onMounted, ref } from "vue";
import {
  createTask,
  fetchTasks,
  removeTask,
  toggleTaskReminder,
} from "../services/tasksServices";
import AddTask from "@/components/AddTask.vue";
import Tasks from "@/components/Tasks.vue";

export default {
  name: "Home",
  components: { AddTask, Tasks },
  props: { showAddTask: Boolean },
  setup(props) {
    const loading = ref(false);
    const tasks = ref([]);

    const addTask = async (task) => {
      const newTask = await createTask(task);
      tasks.value.push(newTask);
    };

    const toggleReminder = async (taskId) => {
      const task = tasks.value.find((task) => task.id === taskId);
      await toggleTaskReminder(task);
      task.reminder = !task.reminder;
    };

    const deleteTask = async (taskId) => {
      if (confirm("Are you sure you want to delete this task?")) {
        const success = await removeTask(taskId);
        success
          ? (tasks.value = tasks.value.filter((task) => task.id !== taskId))
          : alert("Error deleting task");
      }
    };

    onMounted(async () => {
      loading.value = true;
      tasks.value = await fetchTasks();
      loading.value = false;
    });

    return {
      loading,
      tasks,
      addTask,
      toggleReminder,
      deleteTask,
      ...props,
    };
  },
};
</script>
