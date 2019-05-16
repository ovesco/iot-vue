import nodes from './assets/utils/nodes.json';

class NodeSource {
    constructor() {
        this.nodes = nodes;
    }

    getNodes() {
        return this.nodes;
    }

    static getActivity(/* key */) {
        return new Promise((resolve) => {
            const data = [];
            const base = Math.floor(Math.random() * 10) - 5;
            for (let j = 0; j < 3; j += 1) {
                for (let i = 1; i < 30; i += 3) {
                    data.push({
                        date: new Date(2018, j + base, i),
                        value: (Math.floor(Math.random() * 100)),
                    });
                }
            }
            resolve(data);
        });
    }
}

export default new NodeSource();
