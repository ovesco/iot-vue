<template>
    <route-drawer :width="850">
        <div class="p-4">
            <h2 class="m-0">Download history</h2>
            <h4 class="m-0">Previously downloaded streams from video nodes</h4>
        </div>
        <a-table :columns="columns" class="table-list" :dataSource="history" :pagination="{ defaultPageSize: 8 }">
            <span slot="moment" slot-scope="date">{{ new Date(date)|moment("from", "now") }}</span>
            <div slot="actions" class="d-flex">
                <a-button size="small" icon="download" shape="circle" type="primary" class="details-btn" />
            </div>
        </a-table>
    </route-drawer>
</template>

<script>
import { Table, Button } from 'ant-design-vue';
import RouteDrawer from '../../components/layout/RouteDrawer.vue';

import history from '../../assets/utils/videoHistory.json';

export default {
    components: {
        aTable: Table,
        aButton: Button,
        RouteDrawer,
    },
    data() {
        return {
            history,
            selectedRowKeys: [],
            columns: [
                { title: 'Video ID', dataIndex: 'key', key: 'key' },
                { title: 'Node name', dataIndex: 'name' },
                { title: 'Downloaded', dataIndex: 'date', scopedSlots: { customRender: 'moment' } },
                { title: 'Created', dataIndex: 'creation', scopedSlots: { customRender: 'moment' } },
                { title: 'Download', dataIndex: 'action', scopedSlots: { customRender: 'actions' } },
            ],
        };
    },
};
</script>
