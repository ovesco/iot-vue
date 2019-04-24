<template>
    <div>
        <div class="activity-chart">
            <div class="row no-gutters pl-1 align-items-center justify-content-between">
                <div class="col-12 col-sm-4">
                    <h4 class="m-0">{{ title }}</h4>
                    <div class="d-flex align-items-center mt-1 mb-2">
                        <icon type="calendar" class="mr-1" />
                        <h6 class="m-0 blue" v-if="data.length > 0">{{ formatDate(data[0].date) }}
                            - {{ formatDate(data[data.length - 1].date) }} - move selection</h6>
                    </div>
                </div>
                <div class="col-12 col-sm-8 d-flex justify-content-end">
                    <a-button-group>
                        <a-button v-for="i in intervals" :key="i" @click="updateData(i)">{{ i }}</a-button>
                    </a-button-group>
                </div>
            </div>
            <activity-viewer v-if="data.length > 0" :data="data" />
            <toolbar v-if="data.length > 0" :data="data" @brushed="updateViewer" />
        </div>
    </div>
</template>
<script>
import { Icon, Button } from 'ant-design-vue';
import ActivityViewer from './Viewer.vue';
import Toolbar from './Toolbar.vue';

export default {
    props: ['title'],
    components: {
        ActivityViewer,
        Icon,
        Toolbar,
        aButton: Button,
        aButtonGroup: Button.Group,
    },
    data() {
        return {
            max: 30,
            intervals: ['Today', '7d', '2w', '1m', '3m', '2018'],
            activeInterval: 'Today',
            data: [],
        };
    },
    mounted() {
        this.updateData();
    },
    methods: {
        updateViewer(data) {
            this.$emit('brushing', data);
        },
        updateData(intr) {
            this.activeInterval = intr;
            this.$emit('pre-redraw');
            this.data.splice(0);
            const base = Math.floor(Math.random() * 10) - 5;
            for (let j = 0; j < 3; j += 1) {
                for (let i = 1; i < 30; i += 3) {
                    this.data.push({
                        date: new Date(2018, j + base, i),
                        value: (Math.floor(Math.random() * 100)),
                    });
                }
            }
            this.$emit('redraw', this.data);
        },
        formatDate(date) {
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        },
    },
};
</script>
