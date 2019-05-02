<template>
    <div>
        <router-link tag="h5" class="item-link pl-1 mb-1 d-flex align-items-center" :to="to">
            <icon class="icon mr-1" type="caret-right" />
            {{ title }}
        </router-link>
    </div>
</template>

<script>
import { Icon } from 'ant-design-vue';

export default {
    components: {
        Icon,
    },
    mounted() {
        console.log(this.hover);
    },
    props: ['to', 'title', 'hover'],
};
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/variables";

    .item-link {

        cursor: pointer;

        .icon {
            font-size:0.5rem;
            position:relative;
            top:0.5px;
        }

        &:hover {
            color: $primary;
        }
    }
</style>
