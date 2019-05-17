<template>
    <div>
        <a-button v-if="selectedAllSame && selectedKeys.length > 1" class="d-flex align-items-center p-2" @click="multigraphs = true">
            <type-indicator :type="selectedType" :active="true" class="mr-2" />
            Activity graph for {{ selectedKeys.length }} nodes
        </a-button>
        <nodes-chart-modal v-model="multigraphs" :nodes="selectedNodes" />
    </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import TypeIndicator from './TypeIndicator.vue';
import NodesChartModal from './NodesChartModal.vue';

export default {
    components: {
        aButton: Button,
        TypeIndicator,
        NodesChartModal,
    },
    data() {
        return {
            multigraphs: false,
        };
    },
    props: ['selectedKeys'],
    computed: {
        selectedAllSame() {
            if (this.selectedNodes.length === 0) return true;
            /* eslint-disable no-confusing-arrow */
            return this.selectedNodes.map(node => node.type).reduce((a, b) => a === b ? a : NaN);
        },
        selectedNodes() {
            return this.selectedKeys.map(key => this.$store.getters.getNode(key));
        },
        selectedType() {
            return this.selectedAllSame ? this.$store.getters.getNode(this.selectedKeys[0]).type : null;
        },
    },
};
</script>
