<template>
    <div>
        <drawer :destroyOnClose="true" :closable="false" :visible="visible" @close="closed" :width="720">
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
    },
    watch: {
        $route() {
            this.visible = true;
        },
    },
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        closed() {
            this.visible = false;
            setTimeout(() => {
                this.$router.push({ name: 'nodes' });
            }, 300);
        },
    },
};
</script>
