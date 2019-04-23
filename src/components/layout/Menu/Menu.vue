<template>
    <div>
        <div class="menu d-flex flex-column justify-content-between">
            <!-- top items -->
            <div class="d-flex flex-column">
                <div class="menu-logo d-flex justify-content-center pt-2 pb-3">
                    <img src="../../../assets/images/logo.png" />
                </div>
                <menu-item title="Home" icon="home" to="home" />
                <menu-item title="Nodes and network tools" icon="global" to="nodes" />
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

        .menu-logo {

            img {

                width:80%;
            }
        }
    }
</style>
