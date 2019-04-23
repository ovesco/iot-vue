import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/nodes',
            component: () => import(/* webpackChunkName: "nodes" */ './views/Nodes.vue'),
            children: [
                {
                    path: '',
                    name: 'nodes',
                    component: () => import(/* webpackChunkName: "nodes-list" */ './views/Nodes/NodesList.vue'),
                },
            ],
        },
    ],
});
