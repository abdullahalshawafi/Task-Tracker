<template>
  <AddTask v-show="showAddTask" @add-task="addTask" />
  <Tasks
    @toggle-reminder="toggleReminder"
    @delete-task="deleteTask"
    :tasks="this.tasks"
  />
</template>

<script>
import AddTask from "@/components/AddTask.vue";
import Tasks from "@/components/Tasks.vue";

export default {
  name: "Home",
  components: {
    AddTask,
    Tasks,
  },
  props: {
    showAddTask: Boolean,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async addTask(task) {
      const response = await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      this.tasks.push(newTask);
    },
    async toggleReminder(taskId) {
      const task = this.tasks.find((task) => task.id === taskId);

      await fetch(`api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reminder: !task.reminder,
        }),
      });

      task.reminder = !task.reminder;
    },
    async deleteTask(taskId) {
      if (confirm("Are you sure you want to delete this task?")) {
        const response = await fetch(`api/tasks/${taskId}`, {
          method: "DELETE",
        });
        response.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== taskId))
          : alert("Error deleting task");
      }
    },
    async fetchTasks() {
      const response = await fetch("api/tasks");
      const data = await response.json();
      return data;
    },
    async fetchTask(taskId) {
      const response = await fetch(`api/tasks/${taskId}`);
      const data = await response.json();
      return data;
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>
