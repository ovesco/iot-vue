<template>
    <popover trigger="click" :placement="placement">
        <div slot="content">
            <div class="mb-2 d-flex align-items-center"><icon type="warning" theme="filled" class="mr-2" /> {{ title }}</div>
            <div class="d-flex justify-content-end">
                <a-button type="primary" size="small" :loading="loading" @click="click">Yes</a-button>
            </div>
        </div>
        <slot @click="visible = !visible" />
    </popover>
</template>

<script>
import { Popover, Button, Icon } from 'ant-design-vue';

export default {
    components: {
        Popover,
        Icon,
        aButton: Button,
    },
    data() {
        return {
            visible: false,
            loading: false,
        };
    },
    methods: {
        click() {
            this.loading = true;
            this.confirm().then(() => {
                this.loading = false;
                this.visible = false;
            });
        },
    },
    props: {
        title: {
            type: String,
            default: () => 'Are you sure ?',
        },
        confirm: {
            type: Function,
            required: true,
        },
        placement: {
            type: String,
            default: () => 'left',
        },
    },
};
</script>

<style scoped lang="scss">
    i {
        color: orange;
    }
</style>
