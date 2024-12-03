<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/axios'; // Import the axios instance
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'; // Loading spinner

// Reactive variables
const product = ref(null); // Holds product details
const loading = ref(true); // Tracks loading state
const error = ref(null); // Tracks error state

// Get the product ID from the route
const route = useRoute();
const router = useRouter();
const productId = route.params.id;

const edit_product =()=>{
  router.push(`/edit_product/${productId}`);
}
const delete_product = async () => {
  try {
    await api.delete(`/products/${productId}`); // Delete product by ID
    router.push('/products'); // Redirect to products page
  } catch (err) {
    console.error('Error Deleting Product:', err);
    error.value = 'Failed to delete product. Please try again later.'; // Set error message
  }
};

// Fetch product details on component mount
onMounted(async () => {
  try {
    const response = await api.get(`/products/${productId}`); // Fetch product by ID
    product.value = response.data.data; // Assign fetched product data
    console.log(product.value);
  } catch (err) {
    console.error('Error Fetching Product:', err);
    error.value = 'Failed to fetch product details. Please try again later.'; // Set error message
  } finally {
    loading.value = false; // Stop loading
  }
});
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center my-10">
      <PacmanLoader color="#3b82f6" />
      <p class="ml-4 text-blue-500 font-semibold">Loading product details...</p>
    </div>

    <!-- Error Message -->
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>

    <!-- Product Details -->
    <div v-else>
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Product Image -->
        <img 
          :src="product.image" 
          :alt="product.title" 
          class="w-full lg:w-1/2 h-auto rounded-lg object-cover shadow-md"
        />

        <!-- Product Information -->
        <div class="lg:w-1/2">
          <h1 class="text-4xl font-bold text-gray-800">{{ product.title }}</h1>
          <p class="text-gray-600 mt-4">{{ product.description }}</p>
          <p class="text-2xl font-semibold text-gray-900 mt-6">${{ product.price }}</p>

          <!-- Product Features -->
          <div class="mt-8">
            <h2 class="text-2xl font-semibold mb-4">Features</h2>
            <ul v-if="product.features && product.features.length" class="list-disc list-inside text-gray-700">
              <li v-for="(feature, index) in product.features" :key="index">
                {{ feature }}
              </li>
            </ul>
            <p v-else class="text-gray-500">No additional features listed.</p>
          </div>

          <!-- Add to Cart Button -->
          <button 
            class="mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Add to Cart
          </button>
          <button  @click="edit_product"
            class="mt-6 w-full py-3 bg-[#22c55e] text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Edit Product
          </button>
          <button  @click="delete_product"
            class="mt-6 w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
