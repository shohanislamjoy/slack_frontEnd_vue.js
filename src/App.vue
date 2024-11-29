<script setup >
// import Test_1 from './components/test_1.vue';

import navbar from './components/navbar.vue';
import footer_1 from './components/footer.vue';
import { RouterView } from 'vue-router';


</script>

<template>
<!-- <Test_1></Test_1> -->
 <!-- component -->

<navbar></navbar>
<RouterView/>
<footer_1></footer_1>

</template>

