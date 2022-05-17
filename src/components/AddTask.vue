<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label for="text">Task</label>
      <input
        type="text"
        v-model="text"
        name="text"
        id="text"
        placeholder="Add Task"
      />
    </div>
    <div class="form-control">
      <label for="day">Day & Time</label>
      <input
        type="text"
        v-model="day"
        name="day"
        id="day"
        placeholder="Add Day & Time"
      />
    </div>
    <div class="form-control-check">
      <label for="reminder">Set Reminder</label>
      <input type="checkbox" v-model="reminder" name="reminder" id="reminder" />
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AddTask",
  setup(_, { emit }) {
    const text = ref("");
    const day = ref("");
    const reminder = ref(false);

    const onSubmit = (e) => {
      e.preventDefault();

      if (!text.value.trim()) {
        alert("Please add a task");
        return;
      }

      const newTask = {
        text: text.value,
        day: day.value,
        reminder: reminder.value,
      };

      text.value = "";
      day.value = "";
      reminder.value = false;

      emit("add-task", newTask);
    };

    return { text, day, reminder, onSubmit };
  },
};
</script>

<style scoped>
@import url("@/styles/AddTask.css");
</style>
