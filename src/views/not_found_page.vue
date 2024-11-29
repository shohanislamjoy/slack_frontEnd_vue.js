<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div class="text-center">
        <h1 class="text-6xl font-bold mb-4 text-red-500">404</h1>
        <h2 class="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p class="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <router-link
          to="/"
          class="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
        >
          Go Back Home
        </router-link>
      </div>
    </div>
  </template>
  
