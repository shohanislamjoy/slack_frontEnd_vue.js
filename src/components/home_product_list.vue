
<script setup>
import { ref,onMounted } from 'vue';
// import products from '@/assets/product.json';
import { RouterLink } from 'vue-router';
// import axios from 'axios';
import api from '@/axios'; // Import the axios instance you just created
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue';

const product_data = ref([]);
const loading = ref(false);

  
// Log to the console for debugging
// console.log(product_data.value);


onMounted(async () => {
  try {
    const response = await api.get('/products');
    product_data.value = response.data;// Assign the response data to the product_data ref;
    product_data=
    pruduct_data.slice(0, 6);
    loading.value = true;
    console.log(product_data.value);

  } catch (error) {
    console.error('Error Fetching Data:', error);
  } finally {
    loading.value = false;// Set isloading to false after the data has been fetched
  }
});



</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h2 class="text-3xl font-semibold text-center mb-6">Product List</h2>
<div v-if="loading" class=" text-center text-[#27DA4D]-500 py-6">
  <pacman-loader/>
</div>
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Iterate over product_data -->
      <li
        v-for="(product, index) in product_data.data"
        :key="index"
        class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between h-[450px]"
      >
        <!-- Product Image -->
        <img :src="product.image" alt="product.title" class="w-full h-48 object-cover" />

        <!-- Product Info -->
        <div class="p-4 flex flex-col justify-between flex-grow">
          <!-- Product Details -->
          <div>
            <h3 class="text-xl font-bold text-gray-800">{{ product.title }}</h3>
            <p class="text-gray-600 mt-2">{{ product.description }}</p>
            <p class="text-xl font-semibold text-gray-900 mt-4">${{ product.price }}</p>
          </div>

          <!-- Buttons -->
          <div class="flex mt-4 gap-2">
            <!-- Add to Cart Button -->
            <button
              class="w-1/2 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            >
              Add to Cart
            </button>

            <!-- View Details Button -->
            <router-link
              :to="'/products/' + product.id"
              class="w-1/2 py-2 bg-blue-500 text-white font-semibold text-center rounded-lg hover:bg-blue-600"
            >
              View Details
            </router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
