<template>
    <div v-if="mounted">
        <drawer :closable="false" :visible="visible" @close="closed" :width="width">
            <slot />
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
        this.mounted = true;
    },
    props: {
        width: {
            type: Number,
            default: () => 720,
        },
    },
    watch: {
        $route() {
            this.visible = true;
            this.mounted = true;
        },
    },
    data() {
        return {
            visible: false,
            mounted: false,
        };
    },
    methods: {
        closed() {
            this.visible = false;
            setTimeout(() => {
                this.mounted = false;
                this.$router.push({ name: 'nodes' });
            }, 300);
        },
    },
};
</script>
