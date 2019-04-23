<template>
    <div>
        <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data">
            <div slot="active" slot-scope="active">
                <div class="active-indicator" :class="{'is-active': active}"></div>
            </div>
            <div slot="tags" slot-scope="tags">
                <a-tag v-for="tag in tags" color="blue" :key="tag">{{ tag }}</a-tag>
            </div>
            <span slot="moment" slot-scope="date">{{ new Date(date)|moment("from", "now") }}</span>
            <div slot="actions" slot-scope="x, record">
                <router-link tag="span" :to="{ name: 'node-statistics', params: { nodeId: record.key } }">
                    <a-button type="primary" size="small">Détails</a-button>
                </router-link>
            </div>
        </a-table>
        <router-view />
    </div>
</template>

<script>
import { Table, Tag, Button } from 'ant-design-vue';
import nodes from '../../assets/utils/nodes.json';

export default {
    components: {
        aTable: Table,
        aButton: Button,
        aTag: Tag,
    },
    data() {
        return {
            data: nodes,
            selectedRowKeys: [],
            columns: [
                { title: 'Enabled', dataIndex: 'isActive', scopedSlots: { customRender: 'active' } },
                { title: 'Node ID', dataIndex: 'key', key: 'key' },
                { title: 'Node name', dataIndex: 'name', },
                { title: 'Created', dataIndex: 'created', scopedSlots: { customRender: 'moment' } },
                { title: 'Last activity', dataIndex: 'updated', scopedSlots: { customRender: 'moment' } },
                { title: 'Tags', dataIndex: 'tags', scopedSlots: { customRender: 'tags' } },
                { title: 'Actions', dataIndex: 'action', scopedSlots: { customRender: 'actions' } },
            ],
        };
    },
    computed: {
        rowSelection() {
            const { selectedRowKeys } = this;
            return {
                selectedRowKeys,
                onChange: (selected) => this.selectedRowKeys = selected,
                hideDefaultSelections: true,
                selections: [
                    {
                        key: 'all-data',
                        text: 'Select All',
                        onSelect: () => {
                            this.selectedRowKeys = [...nodes.keys()];
                        },
                    },
                    {
                        key: 'enabled',
                        text: 'Select enabled nodes',
                        onSelect: () => {
                            this.selectedRowKeys = [...nodes.keys()].filter(i => nodes[i].isActive);
                        },
                    },
                    {
                        key: 'disabled',
                        text: 'Select disabled nodes',
                        onSelect: () => {
                            this.selectedRowKeys = [...nodes.keys()].filter(i => !nodes[i].isActive);
                        },
                    },
                ],
                onSelection: this.onSelection,
            };
        },
    },
};
</script>

<style scoped lang="scss">
    @import "../../assets/scss/variables";

    .active-indicator {
        width:0.7rem;
        height:0.7rem;
        border-radius:100px;
        background:#eee;

        &.is-active {
            background: $success;
        }
    }
</style>
