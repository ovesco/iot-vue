<template>
    <div>
        <div class="container">
            <div>
                <div class="row align-items-center">
                    <div class="col-6">
                        <h3 class="m-0">Live streaming</h3>
                        <h5>Real time video transmission</h5>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <a-button type="primary" @click="liveStream = true" v-if="!liveStream">Start live stream</a-button>
                        <a-button type="dashed" @click="liveStream = false" v-if="liveStream">Stop live stream</a-button>
                    </div>
                </div>
                <live-stream url="https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd" :playing="liveStream" />
            </div>
            <div class="mt-4">
                <h3 class="m-0">Available videos</h3>
                <h5>Streams downloaded and stored on the server</h5>
                <a-table :columns="columns" :dataSource="videos" size="small" :pagination="{ defaultPageSize: 5 }">
                    <div slot="actions" class="d-flex">
                        <a-button size="small" type="primary" shape="circle" icon="download" class="details-btn" />
                    </div>
                </a-table>
            </div>
        </div>
    </div>
</template>

<script>
import { Table, Button } from 'ant-design-vue';
import LiveStream from '../../../components/Video/LiveStream.vue';
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
        LiveStream,
    },
    props: ['node'],
    data() {
        return {
            columns,
            videos,
            liveStream: false,
        };
    },
};
</script>
