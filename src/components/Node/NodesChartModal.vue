<template>
    <a-modal :footer="null" :visible="value" @cancel="$emit('input', false)">
        <multiline-chart :data="data" category="node" :axis="axis" />
    </a-modal>
</template>

<script>
import { Modal } from 'ant-design-vue';
import MultilineChart from './MultilineChart.vue';
import NodeSource from '../../NodeSource';

export default {
    components: {
        MultilineChart,
        aModal: Modal,
    },
    data() {
        return {
            data: [],
            axis: {
                x: { name: 'Date', key: 'date' },
                y: { name: 'Value', key: 'value' },
            },
        };
    },
    watch: {
        value(v) {
            if (v) {
                /* eslint-disable arrow-body-style */
                Promise.all(this.nodes.map(node => NodeSource.constructor.getActivity(node.key).then((values) => {
                    return new Promise((resolve) => {
                        resolve(values.map(({ date, value }) => ({ date, value, node: node.name })));
                    });
                }))).then((data) => {
                    this.data = data.reduce((acc, curr) => acc.concat(curr), []);
                });
            }
        },
    },
    props: ['nodes', 'value'],
};
</script>
