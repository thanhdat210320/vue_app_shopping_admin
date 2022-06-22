import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue';
import store from "./store";
createApp(App).use(CKEditor).use(store).use(router).mount('#app')
