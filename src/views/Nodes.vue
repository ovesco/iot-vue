<template>
    <div class="d-flex">
        <sub-menu icon="global" title="Nodes" subtitle="Manage and overview" color="#1890ff">
            <!-- nodes -->
            <sub-menu-category title="Nodes" />
            <sub-menu-item title="Nodes list" :to="{name: 'nodes'}" />
            <sub-menu-item title="Add new node" :to="{name: 'new-node'}" />

            <!-- statistics -->
            <sub-menu-category title="Statistics" class="mt-4" />
            <sub-menu-item title="Global node statistics" :to="{name: 'nodes'}" />

            <!-- streaming and videos -->
            <sub-menu-category title="Videos" class="mt-4" />
            <sub-menu-item title="Download history" :to="{name: 'download history'}" />
        </sub-menu>
        <div class="flex-grow-1">
            <router-view />
        </div>
    </div>
</template>

<script>
import SubMenu from '../components/layout/SubMenu/SubMenu.vue';
import SubMenuCategory from '../components/layout/SubMenu/SubMenuCategory.vue';
import SubMenuItem from '../components/layout/SubMenu/SubMenuItem.vue';

export default {
    components: {
        SubMenu,
        SubMenuItem,
        SubMenuCategory,
    },
};
</script>
