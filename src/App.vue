<template>
  <div class="container">
    <Header @toggle-add-task="toggleAddTask" title="Task Tracker" :showAddTask="showAddTask" />
    <AddTask v-show="showAddTask" @add-task="addTask" />
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="this.tasks" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import AddTask from "./components/AddTask.vue";
import Tasks from "./components/Tasks.vue";

export default {
  name: "App",
  components: {
    Header,
    Tasks,
    AddTask,
  },
  methods: {
    async addTask(task) {
      const response = await fetch('api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      const newTask = await response.json();
      this.tasks.push(newTask);
    },
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
    async toggleReminder(taskId) {
      const task = this.tasks.find((task) => task.id === taskId);

      await fetch(`api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reminder: !task.reminder
        })
      });
      
      task.reminder = !task.reminder;
    },
    async deleteTask(taskId) {
      if (confirm("Are you sure you want to delete this task?")) {
        const response = await fetch(`api/tasks/${taskId}`, {
          method: 'DELETE',
        });
        response.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== taskId)) : (alert("Error deleting task"));
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
  data() {
    return {
      tasks: [],
      showAddTask: false,
    };
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Poppins", sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
