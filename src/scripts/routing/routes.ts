import {RouteConfig} from 'vue-router';

import Home from '../../components/pages/home/Home.vue';

export const routes: RouteConfig[] = [
    {
        name: 'home',
        path: '/',
        component: Home
    }
];