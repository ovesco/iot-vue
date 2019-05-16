<template>
    <div>
        <modal :title="title" :visible="visible" :confirmLoading="confirmLoading" @cancel="closed" @ok="$emit('ok')">
            <slot />
        </modal>
    </div>
</template>

<script>
import { Modal } from 'ant-design-vue';

export default {
    components: {
        Modal,
    },
    mounted() {
        this.visible = true;
    },
    props: {
        width: {
            type: Number,
            default: () => 720,
        },
        title: {
            type: String,
            default: () => null,
        },
        confirmLoading: {
            type: Boolean,
            default: () => false,
        },
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
