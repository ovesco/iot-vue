<template>
    <div>
        <route-drawer>
            <div v-if="node !== undefined">
                <div class="d-flex justify-content-between pt-4 pl-4 pr-4">
                    <div class="d-flex align-items-center">
                        <type-indicator :type="node.type" :active="node.isActive" size="big" class="mr-2" />
                        <h2>{{ node.name }}</h2>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="mr-2">Enabled</span>
                        <a-switch v-model="node.isActive" />
                    </div>
                </div>
                <div class="p-4">
                    <h5 class="text-muted">{{ node.description }}</h5>
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
    computed: {
        node() {
            console.log(this.$store.getters.getNode(this.$route.params.nodeKey));
            return this.$store.getters.getNode(this.$route.params.nodeKey);
        },
        typeComponent() {
            return getComponent(this.node.type);
        },
    },
};
</script>
