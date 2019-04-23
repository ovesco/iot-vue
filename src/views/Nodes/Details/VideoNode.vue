<template>
    <div>
        <div class="container">
            <div class="row" v-if="nodeKey !== null">
                <div class="col-12">
                    <h3 class="m-0">Available videos</h3>
                    <h5>Stream downloaded and stored on the server</h5>
                    <a-table :columns="columns" :dataSource="videos" size="small" :pagination="{ defaultPageSize: 5 }">
                        <div slot="actions" class="d-flex">
                            <a-button size="small" type="primary" shape="circle" icon="download" class="details-btn" />
                        </div>
                    </a-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Table, Button } from 'ant-design-vue';
import videos from '../../../assets/utils/videos.json';

const columns = [
    { key: 'date', dataIndex: 'date', title: 'Date' },
    { key: 'size', dataIndex: 'size', title: 'Size' },
    { dataIndex: 'actions', title: 'Actions', scopedSlots: { customRender: 'actions' } },
];
export default {
    components: {
        aTable: Table,
        aButton: Button,
    },
    props: ['node'],
    data() {
        return {
            columns,
            videos,
        };
    },
};
</script>
