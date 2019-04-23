<template>
    <div class="d-flex">
        <sub-menu icon="global" title="Nodes" subtitle="Manage LoRA nodes" color="#247ba0" />
        <div class="flex-grow-1">
            <router-view />
        </div>
    </div>
</template>

<script>
import SubMenu from '../components/layout/SubMenu/SubMenu.vue';

export default {
    components: {
        SubMenu,
    },
};
</script>
