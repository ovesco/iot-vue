<template>
    <div id="app">
        <app-menu />
        <main class="main-content">
            <router-view />
        </main>
    </div>
</template>

<script>
import AppMenu from '../components/layout/Menu/Menu.vue';

export default {
    components: {
        AppMenu,
    },
};
</script>

<style scoped lang="scss">
    @import "../assets/scss/variables";

    .main-content {

        padding-left: $menu-width;
        min-height:100vh;
        background: $main-content-bg;
    }
</style>
