<template>
    <div>
        <div class="type-indicator details-btn" :style="{background: background}">
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
    props: ['type', 'active'],
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
        background() {
            if (!this.active) return '#d7d7d7';

            return {
                video: '#1e4f9e',
                light: '#bc8520',
                temperature: '#ce402d',
                noise: '#a0236c',
                geolocation: '#1a7219',
                airQuality: '#0f949b',
                humidity: '#4c6ebf',
            }[this.type];
        },
    },
};
</script>

<style scoped lang="scss">
    .type-indicator {
        width:1.5rem;
        height:1.5rem;
        color:white;
        border-radius:100px;
        font-size: 0.9rem !important;
    }
</style>
