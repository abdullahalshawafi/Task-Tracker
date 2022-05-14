<template>
  <div class="container">
    <Header title="Task Tracker" />
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="this.tasks" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Tasks from "./components/Tasks.vue";

export default {
    name: "App",
    components: { Header, Tasks },
    methods: {
        toggleReminder(taskId) {
          const task = this.tasks.find(task => task.id === taskId);
          task.reminder = !task.reminder;
        },
        deleteTask(taskId) {
          if (confirm("Are you sure you want to delete this task?")) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
          }
        },
    },
    data() {
      return {
        tasks: [],
      };
    },
    created() {
      this.tasks = [
        {
            id: 1,
            text: "Learn Vue",
            day: "March 1st at 10:00 AM",
            reminder: true,
          },
          {
            id: 2,
            text: "Learn Vuex",
            day: "April 1st at 11:00 PM",
            reminder: false,
          },
          {
            id: 3,
            text: "Learn Vue Router",
            day: "May 1st at 12:00 PM",
            reminder: false,
          },
      ]
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
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
