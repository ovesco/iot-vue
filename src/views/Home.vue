<template>
    <div>
        <div class="home d-flex pt-5 align-items-center flex-column">
            <h1 class="text-white">IOT LORA Manager</h1>
            <h4 class="text-white">Manage your Lora network easily and efficiently</h4>
            <canvas ref="canvas" width="900" height="520" ></canvas>
        </div>
    </div>
</template>

<script>
import orbCanvas from '../utils/Orb';

export default {
    data() {
        return {
            timer: null,
        };
    },
    mounted() {
        this.timer = orbCanvas(this.$refs.canvas);
    },
    destroyed() {
        clearInterval(this.timer);
        this.timer = null;
    },
};
</script>

<style scoped lang="scss">
    @import "../assets/scss/variables";

    .home {
        width: 100%;
        height:100vh;
        background:$menu-bg;
    }
</style>
