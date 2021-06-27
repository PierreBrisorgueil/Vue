/**
 * Module dependencies.
 */
import { createApp } from 'vue';
import App from '@/modules/_app/app.vue';
import config from '@/config';

const app = createApp(App);
app.config.globalProperties.$config = config;
