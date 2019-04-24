<template>
    <div>
        <node-chart class="pl-4 pr-4" title="Temperature variation" />
    </div>
</template>

<script>
import NodeChart from '../../../components/Node/LineChart/Chart.vue';

export default {
    components: {
        NodeChart,
    },
};
</script>
