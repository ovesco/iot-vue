/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';


const find = (key, state) => state.nodes.find(node => parseInt(node.key, 10) === parseInt(key, 10));

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        nodes: [],
    },
    getters: {
        getNode: state => key => find(key, state),
    },
    mutations: {
        setNodes: (state, nodes) => {
            state.nodes = nodes;
        },
        pushNode: (state, node) => {
            state.nodes.push(node);
        },
        modifyNode: (state, { key, node }) => {
            Object.assign(find(key, state), node);
        },
        removeNode: (state, node) => {
            const index = state.nodes.indexOf(node);
            if (index > -1) state.nodes.splice(index, 1);
        },
    },
    actions: {
        loadNodes: ({ commit }) => {
            return new Promise(() => {
                axios.get('http://193.247.203.90:8080/api/devices').then((response) => {
                    commit('setNodes', response.data);
                }).catch((e) => {
                    console.log(e);
                });
            });
        },
        addNode: ({ commit }, node) => {
            // Build node object, should be made by server
            console.log(node.id, node.name);
            return new Promise(() => {
                axios({
                    url: 'http://193.247.203.90:8080/api/devices',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        deviceID: node.id,
                        deviceEUI: node.name,
                        description: node.type,
                    },
                }).then((response) => {
                    console.log(response);
                    commit('pushNode', {
                        id: node.id,
                        name: node.name,
                        type: node.type,
                    });
                }).catch((e) => {
                    console.log(e);
                });
            });
        },
        updateNode: ({ commit }, { key, node }) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('modifyNode', { key, node });
                    resolve();
                }, 1500);
            });
        },
        deleteNode: ({ commit }, node) => {
            return new Promise(() => {
                axios({
                    url: `http://193.247.203.90:8080/api/device/${node.id}`,
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((response) => {
                    console.log(response);
                    commit('removeNode', node);
                }).catch((e) => {
                    console.log(e);
                });
            });
        },
    },
});

// Set store listener listener
// NodeSource.register(store);
export default store;
