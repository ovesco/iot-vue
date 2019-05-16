/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';
import NodeSource from './NodeSource';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        nodes: [],
    },
    mutations: {
        setNodes: (state, nodes) => {
            state.nodes = nodes;
        },
    },
    actions: {
        loadNodes(context) {
            context.commit('setNodes', NodeSource.getNodes());
        },
    },
});
