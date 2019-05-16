import nodes from './assets/utils/nodes.json';

class NodeSource {
    constructor() {
        this.nodes = nodes;
    }

    getNodes() {
        return this.nodes;
    }
}

export default new NodeSource();
