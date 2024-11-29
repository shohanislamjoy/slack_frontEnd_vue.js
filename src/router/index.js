import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import ProductList from "@/views/product_page.vue";
import ContactUs from "../views/contact_page.vue";
import ViewProduct from "../views/view_products_page.vue";
import not_found from "../views/not_found_page.vue";
import add_product from "@/views/add_product.vue"
import edit_product from "@/views/edit_product.vue"

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/product",
            name: "product",
            component: ProductList,
        },
        {
            path: "/products/:id",
            name: "view_product",
            component: ViewProduct,
            props: true,
        },
        {
            path: "/contact_us",
            name: "contact_us",
            component: ContactUs,
        },
        {
            path: "/add_product",
            name: "add_product",
            component: add_product,
        },
        {
            path: "/edit_product/:id",
            name: "edit_product/:id",
            component: edit_product,
        },
        {
            path: '/:catchAll(.*)',
            name: "not found",
            component: not_found,
        }
    ],
});



export default router;