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
            <div slot="actions" slot-scope="x, record" class="d-flex">
                <a-button size="small" v-if="record.key % 3 === 0 && record.isActive"
                          type="primary" shape="circle" class="details-btn mr-1" icon="desktop" />
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
import nodes from '../../assets/utils/nodes.json';

export default {
    components: {
        aTable: Table,
        aButton: Button,
        aTag: Tag,
        aConfirm: Popconfirm,
    },
    data() {
        return {
            data: nodes,
            selectedRowKeys: [],
            columns: [
                { title: 'Enabled', dataIndex: 'isActive', scopedSlots: { customRender: 'active' } },
                { title: 'Node ID', dataIndex: 'key', key: 'key' },
                { title: 'Node name', dataIndex: 'name' },
                { title: 'Created', dataIndex: 'created', scopedSlots: { customRender: 'moment' } },
                { title: 'Last activity', dataIndex: 'updated', scopedSlots: { customRender: 'moment' } },
                { title: 'Tags', dataIndex: 'tags', scopedSlots: { customRender: 'tags' } },
                { title: 'Actions', dataIndex: 'action', scopedSlots: { customRender: 'actions' } },
            ],
        };
    },
    watch: {
        $route() {
            console.log(this.$router.internalHistory);
        },
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

<style scoped lang="scss">
    @import "../../assets/scss/variables";

    .active-indicator {
        width:0.7rem;
        height:0.7rem;
        border-radius:100px;
        background:#eee;

        &.is-active {
            background: #1890ff;
        }
    }

    .details-btn {
        display:flex;
        justify-content: center;
        align-items: center;
        font-size:0.7rem;
    }
</style>
