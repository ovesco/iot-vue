<template>
    <div>
        <drawer :destroyOnClose="true" :closable="false" :visible="visible" @close="closed" :width="720">
            <div v-if="nodeKey === null">Loading</div>
            <div class="row" v-else>
                <div class="col-12">
                    <h3 class="m-0">Available videos</h3>
                    <h5>Stream downloaded and stored on the server</h5>
                    <a-table :columns="columns" :dataSource="videos" size="small" :pagination="{ defaultPageSize: 5 }" />
                </div>
            </div>
        </drawer>
    </div>
</template>

<script>
import { Drawer, Table } from 'ant-design-vue';
import videos from '../../assets/utils/videos.json';
import nodes from '../../assets/utils/nodes.json';

const columns = [
    { key: 'date', dataIndex: 'date', title: 'Date' },
    { key: 'size', dataIndex: 'size', title: 'Size' },
];

export default {
    components: {
        Drawer,
        aTable: Table,
    },
    mounted() {
        this.visible = true;
        this.nodeKey = this.$route.params.nodeKey;
    },
    watch: {
        $route(n) {
            this.nodeKey = n.params.nodeKey;
            this.visible = true;
        },
    },
    data() {
        return {
            visible: false,
            nodeKey: null,
            nodes,
            columns,
            videos,
        };
    },
    computed: {
        node() {
            return this.nodes.filter(n => n.key === this.nodeKey)[0];
        },
    },
    methods: {
        closed() {
            this.visible = false;
            setTimeout(() => {
                this.$router.back();
            }, 10);
        },
    },
};
</script>
