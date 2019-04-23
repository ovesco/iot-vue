<template>
    <div>
        <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data">
            <div slot="active" slot-scope="active, record">
                <type-indicator :type="record.type" :active="active" />
            </div>
            <div slot="tags" slot-scope="tags">
                <a-tag v-for="tag in tags" color="blue" :key="tag">{{ tag }}</a-tag>
            </div>
            <span slot="moment" slot-scope="date">{{ new Date(date)|moment("from", "now") }}</span>
            <div slot="actions" slot-scope="x, record" class="d-flex">
                <router-link tag="span" :to="{ name: 'node-statistics', params: { nodeKey: record.key } }">
                    <a-button size="small" icon="plus" shape="circle" class="details-btn" />
                </router-link>
                <a-confirm title="Are you sure ?" @confirm="deleteNode(record)" okText="Yes" cancelText="No">
                    <a-button type="danger" size="small" icon="delete" shape="circle" class="details-btn ml-1" />
                </a-confirm>
            </div>
        </a-table>
        <router-view />
    </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
import { Table, Tag, Button, Popconfirm } from 'ant-design-vue';
import TypeIndicator from '../../components/Node/TypeIndicator.vue';
import nodes from '../../assets/utils/nodes.json';

export default {
    components: {
        aTable: Table,
        aButton: Button,
        aTag: Tag,
        aConfirm: Popconfirm,
        TypeIndicator,
    },
    data() {
        return {
            data: nodes,
            selectedRowKeys: [],
            columns: [
                { title: 'Node ID', dataIndex: 'key', key: 'key' },
                { title: 'Enabled', dataIndex: 'isActive', scopedSlots: { customRender: 'active' } },
                { title: 'Type', dataIndex: 'type' },
                { title: 'Node name', dataIndex: 'name' },
                { title: 'Created', dataIndex: 'created', scopedSlots: { customRender: 'moment' } },
                { title: 'Last activity', dataIndex: 'updated', scopedSlots: { customRender: 'moment' } },
                { title: 'Tags', dataIndex: 'tags', scopedSlots: { customRender: 'tags' } },
                { title: 'Actions', dataIndex: 'action', scopedSlots: { customRender: 'actions' } },
            ],
        };
    },
    methods: {
        deleteNode(node) {
            console.log(node);
        },
        onSelectChange(selected) {
            this.selectedRowKeys = selected;
        },
    },
    computed: {
        rowSelection() {
            const { selectedRowKeys } = this;
            return {
                selectedRowKeys,
                onChange: this.onSelectChange,
                hideDefaultSelections: true,
                onSelection: this.onSelection,
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
            };
        },
    },
};
</script>
