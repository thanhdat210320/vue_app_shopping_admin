import { createWebHistory, createRouter } from "vue-router";
import HomeAdmin from "../components/HomeAdmin";
import Category from "../components/Category";
import Product from "../components/Product";
import Oder from "../components/Oder";
import OderCancel from "../components/OderCancel";
import OderSuccess from "../components/OderSuccess";
const routes = [{
        path: 
        "/",
        name: "HomeAdmin",
        component: HomeAdmin,
    },
    {
        path:
        "/Category",
        name: "Category",
        component:Category,
    },
    {
        path:
        "/Product",
        name : "Product",
        component:Product,
    },
    {
        path:
        "/Oder",
        name : "Oder",
        component:Oder,
    },
    {
        path:
        "/OderCancel",
        name : "OderCancel",
        component:OderCancel,
    },
    {
        path:
        "/OderSuccess",
        name : "OderSuccess",
        component:OderSuccess,
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;