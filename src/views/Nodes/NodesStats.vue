<template>
    <div>
        <drawer :destroyOnClose="true" :closable="false" :visible="visible" @close="closed" :width="720">
            <div v-if="node !== null">
                <div class="d-flex justify-content-between p-4">
                    <div class="d-flex align-items-center">
                        <type-indicator :type="node.type" :active="node.active" size="big" class="mr-2" />
                        <h2>{{ node.name }}</h2>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="mr-2">Enabled</span>
                        <a-switch v-model="node.active" />
                    </div>
                </div>
                <div v-if="node">
                    <component v-if="node.type === 'temperature'" :is="TemperatureNode" :node="node" />
                    <component v-else-if="node.type === 'video'" :is="VideoNode" :node="node" />
                    <div v-else>
                        Ayy mashallah pas encore implémenté ca
                    </div>
                </div>
            </div>
        </drawer>
    </div>
</template>

<script>
import { Drawer, Switch } from 'ant-design-vue';
import nodes from '../../assets/utils/nodes.json';
import TemperatureNode from './Details/TemperatureNode.vue';
import TypeIndicator from '../../components/Node/TypeIndicator.vue';
import VideoNode from './Details/VideoNode.vue';

export default {
    components: {
        aSwitch: Switch,
        TypeIndicator,
        Drawer,
    },
    mounted() {
        this.visible = true;
        this.updateNode(this.$route.params.nodeKey);
    },
    watch: {
        $route(n) {
            this.visible = true;
            this.updateNode(n.params.nodeKey);
        },
    },
    data() {
        return {
            TemperatureNode,
            VideoNode,
            visible: false,
            node: null,
        };
    },
    methods: {
        updateNode(key) {
            const items = nodes.filter(n => parseInt(n.key, 10) === parseInt(key, 10));
            this.node = items.length === 1 ? items[0] : null;
        },
        closed() {
            this.visible = false;
            setTimeout(() => {
                this.$router.push({ name: 'nodes' });
            }, 300);
        },
    },
};
</script>
