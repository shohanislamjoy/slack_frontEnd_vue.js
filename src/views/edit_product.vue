<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/axios'; // Your Axios instance

// Reactive data for the form
const editProduct = reactive({
  id: '',
  title: '',
  description: '',
  price: '',
  currency: 'USD',
  images: [], // For additional image data
  features: [''],
  stock: '',
  image: null,
});

// Route and Router hooks
const route = useRoute();
const router = useRouter();
const productId = route.params.id; // Get the product ID from the route

// Fetch product details
const fetchProduct = async () => {
  try {
    const response = await api.get(`/products/${productId}`);
    const product = response.data.data;

    // Populate form fields
    editProduct.id = product.id;
    editProduct.title = product.title;
    editProduct.description = product.description;
    editProduct.price = product.price;
    editProduct.currency = product.currency;
    editProduct.imageUrl = product.image || null; // For displaying the existing image
    editProduct.features = product.features || [''];
    editProduct.stock = product.stock || '';
  } catch (error) {
    console.error('Error fetching product:', error);
    alert('Failed to fetch product details.');
  }
};

// Add a feature
const addFeature = () => {
  editProduct.features.push('');
};

// Remove a feature
const removeFeature = (index) => {
  if (editProduct.features.length > 1) {
    editProduct.features.splice(index, 1);
  } else {
    alert('At least one feature is required.');
  }
};

// Handle image upload
const handleImageUpload = (event) => {
  editProduct.image = event.target.files[0];
};

// Update product
const updateProduct = async () => {
  try {
    const formData = new FormData();
    formData.append('title', editProduct.title);
    formData.append('description', editProduct.description);
    formData.append('price', editProduct.price);
    formData.append('currency', editProduct.currency);
    formData.append('image', editProduct.image);
    formData.append('features', JSON.stringify(editProduct.features));
    formData.append('stock', editProduct.stock);

    await api.post(`/products/${productId}?_method=PUT`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('Product updated successfully!');
    router.push('/products'); // Redirect to the products page
  } catch (error) {
    console.error('Error updating product:', error);
    alert('Failed to update product.');
  }
};

// Fetch product details on component mount
onMounted(fetchProduct);
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Edit Product</h2>
    <form @submit.prevent="updateProduct" class="space-y-4">
      <!-- Name -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          id="title"
          v-model="editProduct.title"
          type="text"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          v-model="editProduct.description"
          rows="4"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        ></textarea>
      </div>

      <!-- Price and Currency -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <input
            id="price"
            v-model="editProduct.price"
            type="number"
            step="0.01"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
          <select
            id="currency"
            v-model="editProduct.currency"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

          <!-- Image Display and Upload -->
      <div>
        <label for="image" class="block text-xl font-bold text-gray-700">Upload Image</label>

        <!-- Display Existing Image -->
        <div v-if="editProduct.imageUrl" class="mt-2">
          <p class="text-sm text-gray-600">Current Image:</p>
          <img :src="editProduct.imageUrl" alt="Existing Product Image" class="w-32 h-32 object-cover rounded border" />
        </div>

        <!-- File Input for Uploading New Image -->
        <input
          id="image"
          type="file"
          @change="handleImageUpload"
          class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          accept="image/*"
        />
      </div>


      <!-- Features -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Features</label>
        <div v-for="(feature, index) in editProduct.features" :key="index" class="flex items-center gap-2 mt-2">
          <input
            v-model="editProduct.features[index]"
            type="text"
            class="flex-grow border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Feature"
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
          v-model="editProduct.stock"
          type="number"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
      >
        Update Product
      </button>
    </form>
  </div>
</template>
