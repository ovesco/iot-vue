import nodes from './assets/utils/nodes.json';

class NodeSource {
    constructor() {
        this.nodes = nodes;
        this.store = null;
    }

    getNodes() {
        return this.nodes;
    }

    register(store) {
        this.store = store;
    }
}

export default new NodeSource();
