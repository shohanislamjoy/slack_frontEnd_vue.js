<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/axios'; // Import the axios instance

const route = useRoute();
const router = useRouter();
const productId = route.params.id; // Get product ID from the route
const isEditMode = !!productId; // Determine if the page is in edit mode

const product = reactive({
  id: '',
  title: '',
  description: '',
  price: '',
  currency: 'USD',
  features: [''],
  stock: '',
  image: null, // File upload
  existingImage: '', // For displaying the existing image in edit mode
});

// Dynamic title based on mode
const pageTitle = ref(isEditMode ? 'Edit Product' : 'Add New Product');

// Fetch product details if editing
const fetchProductDetails = async () => {
  if (isEditMode) {
    try {
      const response = await api.get(`/products/${productId}`);
      const data = response.data.data;

      // Populate the form with the existing product data
      Object.assign(product, {
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
        currency: data.currency,
        features: data.features || [''],
        stock: data.stock,
        existingImage: data.image,
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
      alert('Failed to fetch product details.');
    }
  }
};

// Add or Update Product
const saveProduct = async () => {
  try {
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('currency', product.currency);
    formData.append('stock', product.stock);
    formData.append('features', JSON.stringify(product.features));
    if (product.image) {
      formData.append('image', product.image); // Only upload new image if selected
    }

    if (isEditMode) {
      // Update Product
      await api.patch(`/products/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product updated successfully!');
    } else {
      // Create Product
      await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product added successfully!');
    }

    router.push('/products'); // Redirect after save
  } catch (error) {
    console.error('Error saving product:', error);
    alert('Failed to save product. Please try again.');
  }
};

// Add or Remove Features
const addFeature = () => product.features.push('');
const removeFeature = (index) => {
  if (product.features.length > 1) {
    product.features.splice(index, 1);
  } else {
    alert('At least one feature is required.');
  }
};

// Handle Image Upload
const handleImageUpload = (event) => {
  product.image = event.target.files[0];
};

// Initialize Component
onMounted(fetchProductDetails);
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">{{ pageTitle }}</h2>
    <form @submit.prevent="saveProduct" class="space-y-4">
      <!-- Product Name -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          id="title"
          v-model="product.title"
          type="text"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product name"
          required
        />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          v-model="product.description"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product description"
          rows="4"
          required
        ></textarea>
      </div>

      <!-- Price and Currency -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <input
            id="price"
            v-model="product.price"
            type="number"
            step="0.01"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product price"
            required
          />
        </div>

        <div>
          <label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
          <select
            id="currency"
            v-model="product.currency"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

      <!-- Image Upload -->
      <div>
        <label for="image" class="block text-sm font-medium text-gray-700">Upload Image</label>
        <input
          id="image"
          type="file"
          @change="handleImageUpload"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          accept="image/*"
        />
        <!-- Show existing image in edit mode -->
        <img
          v-if="isEditMode && product.existingImage"
          :src="product.existingImage"
          alt="Current Product Image"
          class="mt-4 w-32 h-32 object-cover rounded-md"
        />
      </div>

      <!-- Features -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Features</label>
        <div v-for="(feature, index) in product.features" :key="index" class="flex items-center gap-2 mt-2">
          <input
            v-model="product.features[index]"
            type="text"
            class="flex-grow border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter feature"
            required
          />
          <button
            type="button"
            class="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            @click="removeFeature(index)"
          >
            Remove
          </button>
        </div>
        <button
          type="button"
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          @click="addFeature"
        >
          Add Feature
        </button>
      </div>

      <!-- Stock -->
      <div>
        <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
        <input
          id="stock"
          v-model="product.stock"
          type="number"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter stock quantity"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
      >
        {{ isEditMode ? 'Update Product' : 'Add Product' }}
      </button>
    </form>
  </div>
</template>
