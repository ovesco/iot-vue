<template>
    <div>
        <route-drawer>
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
                    <component :is="typeComponent" />
                </div>
            </div>
        </route-drawer>
    </div>
</template>

<script>
import { Drawer, Switch } from 'ant-design-vue';
import nodes from '../../assets/utils/nodes.json';
import { getComponent } from '../../nodes';
import TypeIndicator from '../../components/Node/TypeIndicator.vue';
import RouteDrawer from '../../components/layout/RouteDrawer.vue';

export default {
    components: {
        RouteDrawer,
        aSwitch: Switch,
        TypeIndicator,
        Drawer,
    },
    mounted() {
        this.updateNode(this.$route.params.nodeKey);
    },
    data() {
        return {
            node: null,
        };
    },
    methods: {
        updateNode(key) {
            const items = nodes.filter(n => parseInt(n.key, 10) === parseInt(key, 10));
            this.node = items.length === 1 ? items[0] : null;
        },
    },
    computed: {
        typeComponent() {
            return getComponent(this.node.type);
        },
    },
};
</script>
