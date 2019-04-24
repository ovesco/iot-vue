<template>
    <div>
        <div class="type-indicator details-btn" :class="[{bigger: size === 'big'}, {inactive: !this.active}, type]">
            <icon :type="icon" />
        </div>
    </div>
</template>

<script>
import { Icon } from 'ant-design-vue';

export default {
    components: {
        Icon,
    },
    props: ['type', 'active', 'size'],
    computed: {
        icon() {
            return {
                video: 'desktop',
                light: 'bulb',
                temperature: 'fire',
                noise: 'sound',
                geolocation: 'environment',
                airQuality: 'cloud',
                humidity: 'aliwangwang',
            }[this.type];
        },
    },
};
</script>

<style scoped lang="scss">
    @import "../../assets/scss/variables";

    .type-indicator {
        width:1.5rem;
        height:1.5rem;
        color:white;
        border-radius:100px;
        font-size: 0.9rem !important;
        transition: background .3s;

        &.video { background: $dark-blue }
        &.light { background: $orange }
        &.temperature { background: $red }
        &.noise { background: $rose }
        &.geolocation { background: $dark-green }
        &.airQuality { background: $dark-teal }
        &.humidity { background: $sky-blue }
        &.inactive { background: $gray-300 !important; }

        &.bigger {
            width:2.5rem;
            height:2.5rem;
            font-size:1.4rem !important;
        }
    }
</style>
