<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import products from '@/assets/product.json';

// Set up a reactive reference to hold the product data
const productId = useRoute().params.id; // Get the product ID from the route
const product = ref(null);

// Find and set the product based on the ID when the component mounts
onMounted(() => {
  product.value = products.find(p => p.id === (productId));
});

// Log for debugging
console.log(product.value);
</script>

<template>
  <div v-if="product" class="p-6 max-w-4xl mx-auto">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Product Image -->
      <img :src="product.image" alt="product.name" class="w-full lg:w-1/2 h-auto rounded-lg object-cover shadow-md">

      <!-- Product Details -->
      <div class="lg:w-1/2">
        <h1 class="text-4xl font-bold text-gray-800">{{ product.name }}</h1>
        <p class="text-gray-600 mt-4">{{ product.description }}</p>
        <p class="text-2xl font-semibold text-gray-900 mt-6">${{ product.price }}</p>

        <!-- Additional Product Info (Optional) -->
        <div class="mt-8">
          <h2 class="text-2xl font-semibold mb-4">Product Details</h2>
          <ul class="list-disc list-inside text-gray-700">
            <li v-for="(feature, index) in product.features" :key="index">{{ feature }}</li>
          </ul>
        </div>

        <!-- Add to Cart Button -->
        <button class="mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  <p v-else class="text-center text-gray-500 mt-20">Product not found.</p>
</template>
