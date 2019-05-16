/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
import Vue from 'vue';
import Vuex from 'vuex';
import NodeSource from './NodeSource';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        nodes: [],
    },
    getters: {
        getNode: state => key => state.nodes.find(node => parseInt(node.key, 10) === parseInt(key, 10)),
    },
    mutations: {
        setNodes: (state, nodes) => {
            state.nodes = nodes;
        },
        pushNode: (state, node) => {
            state.nodes.push(node);
        },
        removeNode: (state, node) => {
            const index = state.nodes.indexOf(node);
            if (index > -1) state.nodes.splice(index, 1);
        },
    },
    actions: {
        loadNodes: ({ commit }) => {
            commit('setNodes', NodeSource.getNodes());
        },
        addNode: ({ commit, state }, node) => {
            // Build node object, should be made by server
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('pushNode', {
                        ...node,
                        created: '2018-05-18 04:04:59',
                        updated: '2019-02-03 06:50:00',
                        isActive: true,
                        key: state.nodes.length + 1,
                    });
                    resolve();
                }, 1500);
            });
        },
        deleteNode: ({ commit }, node) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('removeNode', node);
                    resolve();
                }, 1000);
            });
        },
    },
});

// Set store listener listener
NodeSource.register(store);
export default store;
