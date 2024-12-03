<script setup>
import product_list from '@/components/product_list.vue';
import { useRouter } from 'vue-router';


const router = useRouter();

const navigateToAddProduct = () => {
  router.push('/add_product'); // Navigate to the add_product route
};




</script>

<template>

<div class="text-center">
  <button 
    @click="navigateToAddProduct" 
    class="  bg-blue-700 hover:bg-blue-400  text-white font-bold w-2/10 my-4 py-4 px-4 rounded inline-flex items-center">
    <svg 
      class="fill-current w-4 h-4 mr-2" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20">
      <path d="M7 12v6h6v-6h5l-8-8-8 8h5zM0 18h20v2H0v-2z" />
    </svg>
    <span>Upload</span>
  </button>
</div>

<product_list/>


</template>