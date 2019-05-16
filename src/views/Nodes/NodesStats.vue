<template>
    <div>
        <route-drawer>
            <div v-if="node !== undefined">
                <div class="d-flex justify-content-between pt-4 pl-4 pr-4">
                    <div class="d-flex align-items-center">
                        <type-indicator :type="node.type" :active="node.isActive" size="big" class="mr-2" />
                        <h2>{{ node.name }}</h2>
                        <router-link :to="{name: 'update-node'}">
                            <a-button type="dashed" shape="circle" size="small" class="details-btn ml-2" icon="edit" />
                        </router-link>
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
                    <component :is="typeComponent" :node="node" />
                </div>
            </div>
        </route-drawer>
        <router-view />
    </div>
</template>

<script>
import { Drawer, Switch, Button } from 'ant-design-vue';
import { getComponent } from '../../nodes';
import TypeIndicator from '../../components/Node/TypeIndicator.vue';
import RouteDrawer from '../../components/layout/RouteDrawer.vue';

export default {
    components: {
        aButton: Button,
        RouteDrawer,
        aSwitch: Switch,
        TypeIndicator,
        Drawer,
    },
    computed: {
        node() {
            return this.$store.getters.getNode(this.$route.params.nodeKey);
        },
        typeComponent() {
            return getComponent(this.node.type);
        },
    },
};
</script>
