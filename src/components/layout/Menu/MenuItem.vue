<template>
    <tooltip placement="right">
        <span slot="title">{{ title }}</span>
        <div class="menu-item mb-2 d-flex justify-content-center">
            <router-link :to="to" tag="div" class="menu-item-button d-flex justify-content-center align-items-center">
                <icon :type="icon" />
            </router-link>
        </div>
    </tooltip>
</template>

<script>
import { Icon, Tooltip } from 'ant-design-vue';

export default {
    components: {
        Icon,
        Tooltip,
    },
    props: ['title', 'icon', 'to'],
};
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/variables";

    .menu-item {
        cursor: pointer;
        color: $menu-color;
        font-size: $menu-icon-size;

        .menu-item-button {
            border-radius:100px;
            width: $menu-icon-size + 1.1;
            height: $menu-icon-size + 1.1;
        }

        &:hover .menu-item-button {
            background:rgba(0,0,0,0.3);
        }
    }
</style>
