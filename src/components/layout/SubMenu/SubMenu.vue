<template>
    <div>
        <div class="sub-menu">
            <div class="sub-menu-header p-3 d-flex align-items-center">
                <div class="icon-holder d-flex align-items-center justify-content-center" :style="{ background: color }">
                    <icon :type="icon" />
                </div>
                <div class="ml-2">
                    <h4 class="m-0">{{ title }}</h4>
                    <h6 class="m-0">{{ subtitle }}</h6>
                </div>
            </div>
            <div class="pl-4">
                <slot :hover="color" />
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from 'ant-design-vue';

export default {
    components: {
        Icon,
    },
    props: ['title', 'subtitle', 'icon', 'color'],
};
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/variables";

    .sub-menu {
        background: $sub-menu-bg;
        min-height:100vh;
        width: $sub-menu-width;
        border-right: 1px solid $gray-300;

        .sub-menu-header {

            .icon-holder {
                width:3rem;
                height:3rem;
                font-size:$menu-icon-size + 0.3;
                color: white;
                border-radius:4px;
            }
        }
    }
</style>
