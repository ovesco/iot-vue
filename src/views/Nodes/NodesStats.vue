<template>
    <div>
        <drawer :destroyOnClose="true" :closable="false" :visible="visible" @close="closed" :width="720">
            <div v-if="node !== null">
                <div class="d-flex justify-content-between p-4">
                    <div class="d-flex align-items-center">
                        <type-indicator :type="node.type" :active="node.active" size="big" class="mr-2" />
                        <h2>{{ node.name }}</h2>
                    </div>
                    <a-switch v-model="node.active" />
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
        this.nodeKey = this.$route.params.nodeKey;
    },
    watch: {
        $route(n) {
            this.nodeKey = n.params.nodeKey;
            this.visible = true;
        },
    },
    data() {
        return {
            TemperatureNode,
            VideoNode,
            visible: false,
            nodeKey: null,
            nodes,
        };
    },
    computed: {
        node() {
            const items = this.nodes.filter(n => n.key === this.nodeKey);
            return items.length === 1 ? items[0] : null;
        },
    },
    methods: {
        closed() {
            this.visible = false;
            setTimeout(() => {
                this.$router.back();
            }, 300);
        },
    },
};
</script>
