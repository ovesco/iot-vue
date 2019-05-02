import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "main" */ './views/Main.vue'),
            children: [
                {
                    path: '',
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
                            children: [
                                {
                                    path: 'details/:nodeKey',
                                    name: 'node-statistics',
                                    component: () => import(/* webpackChunkName: "nodes-stats" */ './views/Nodes/NodesStats.vue'),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
});
