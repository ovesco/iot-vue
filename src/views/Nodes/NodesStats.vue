<template>
    <div>
        <drawer title="Node stats" placement="right" :closable="false" :visible="visible" @close="closed">
            TROP SWAG
            {{ nodeId }}
        </drawer>
    </div>
</template>

<script>
import { Drawer } from 'ant-design-vue';

export default {
    components: {
        Drawer,
    },
    mounted() {
        this.visible = true;
        this.nodeId = this.$route.params.nodeId;
    },
    watch: {
        $route(n) {
            const { nodeId } = n.params;
            this.nodeId = nodeId;
            this.visible = true;
        },
    },
    data() {
        return {
            visible: false,
            nodeId: null,
        };
    },
    methods: {
        closed() {
            this.visible = false;
        },
    },
};
</script>
