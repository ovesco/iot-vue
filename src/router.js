import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

Vue.use(Router);

const router = new Router({
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
                                    children: [
                                        {
                                            path: 'update',
                                            name: 'update-node',
                                            component: () => import(/* webpackChunkName: "update-node" */ './views/Nodes/UpdateNode.vue'),
                                        },
                                    ],
                                },
                                {
                                    path: 'new',
                                    name: 'new-node',
                                    component: () => import(/* webpackChunkName: "new-node" */ './views/Nodes/NewNode.vue'),
                                },
                                {
                                    path: 'download-history',
                                    name: 'download history',
                                    component: () => import(/* webpackChunkName: "download-history" */ './views/Nodes/VideoDownloads.vue'),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
});

router.afterEach((to) => {
    document.title = `IOT | ${to.name}`;
});

export default router;
