<template>
    <div>
        <div class="menu d-flex flex-column justify-content-between">
            <!-- top items -->
            <div class="d-flex flex-column">
                <menu-item title="Home" icon="home" to="home" />
                <menu-item title="Nodes" icon="global" to="nodes" />
            </div>
            <!-- bottom items -->
            <div class="d-flex flex-column"></div>
        </div>
    </div>
</template>

<script>
import MenuItem from './MenuItem.vue';

export default {
    components: {
        MenuItem,
    },
};
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/variables";

    .menu {
        width: $menu-width;
        background: $menu-bg;
        position:fixed;
        top:0;
        height:100%;
    }
</style>
