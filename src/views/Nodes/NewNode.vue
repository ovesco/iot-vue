<template>
    <div>
        <drawer :destroyOnClose="true" :closable="false" :visible="visible" @close="closed" :width="720" title="Add new node">
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
            visible: false,
            node: null,
        };
    },
};
</script>
