<script setup>
import { ref , onMounted} from "vue";

const name = ref("Shohan");
const age = ref(25);
const address = ref("Uttara");
var status = ref("pending");
const ranking = ref(["first", "second", "third", "forth"]);
const link = ref("http://www.google.com");
const new_task = ref("");


const start = () => {
  if (status.value === "active") {
    status.value = "pending";
  } else if (status.value === "pending") {
    status.value = "inactive";
  } else {
    status.value = "active";
  }
};

const add_task = () => {
  if (new_task.value.trim() !== "") {
    ranking.value.push(new_task.value);
    new_task.value = "";
  }
};


onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    ranking.value = data.map((ranking) => ranking.title);
  } catch (error) {
    console.log('Error fetching tasks');
  }
});




</script>

<template class="min-h-screen p-8">
  <div class="text-2xl font-bold mb-4">Hello, {{ name }}!</div>

  <!-- Status display -->
  <div
    v-if="status === 'active'"
    class="bg-green-500 text-white p-4 rounded-md mb-4"
  >
    User is alive
  </div>
  <div
    v-else-if="status === 'pending'"
    class="bg-yellow-500 text-white p-4 rounded-md mb-4"
  >
    Users running for life
  </div>
  <div v-else class="bg-red-500 text-white p-4 rounded-md mb-4">
    User is dead
  </div>

  <!-- Ranking list -->
  <ul class="list-disc pl-5 mb-4">
    <li v-for="(place, index) in ranking" :key="index" class="text-lg">
      <span class="mr-5">
        {{ place }}
      </span>
      <button
        class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"@click="ranking.splice(index, 1)">Remove</button>
    </li>
  </ul>

  <!-- Link -->
  <a :href="link" class="text-blue-500 hover:underline mb-4 block">Link this</a>

  <!-- Button to toggle status -->
  <button
    @click="start"
    class="bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-700"
  >
    Click to change status
  </button>

  <!-- Add Task Form -->
  <form @submit.prevent="add_task" class="flex items-center space-x-2">
    <label for="new_task" class="font-medium">Add Task:</label>
    <input
      type="text"
      id="new_task"
      name="new_task"
      v-model="new_task"
      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
    >
      Submit
    </button>
  </form>


</template>
