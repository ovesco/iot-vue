<template>
    <div>
        <div class="p-4 d-flex align-items-center justify-content-between">
            <div>
                <h2 class="m-0">Nodes</h2>
                <h4 class="m-0">All currently registered nodes</h4>
            </div>
            <list-toolbar :selectedKeys="selectedRowKeys" />
        </div>
        <a-table :rowSelection="rowSelection" class="table-list" :columns="columns" :dataSource="$store.state.nodes">
            <div slot="active" slot-scope="active, record">
                <type-indicator :type="record.type" :active="active" />
            </div>
            <span slot="moment" slot-scope="date">{{ new Date(date)|moment("from", "now") }} ({{ date }})</span>
            <div slot="actions" slot-scope="x, record" class="d-flex">
                <router-link tag="span" :to="{ name: 'node-statistics', params: { nodeKey: record.key } }">
                    <a-button size="small" icon="plus" shape="circle" class="details-btn" />
                </router-link>
                <async-pop-confirm :title="'Are you sure you want to delete ' + record.name + ' ?'"
                                   :confirm="() => $store.dispatch('deleteNode', record)">
                    <a-button type="danger" size="small" icon="delete" shape="circle" class="details-btn ml-1" />
                </async-pop-confirm>
            </div>
        </a-table>
        <router-view />
    </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
import { Table, Button } from 'ant-design-vue';
import TypeIndicator from '../../components/Node/TypeIndicator.vue';
import ListToolbar from '../../components/Node/ListToolbar.vue';
import AsyncPopConfirm from '../../components/layout/AsyncPopConfirm.vue';
import nodes from '../../assets/utils/nodes.json';


export default {
    components: {
        aTable: Table,
        aButton: Button,
        TypeIndicator,
        AsyncPopConfirm,
        ListToolbar,
    },
    mounted() {
        this.$store.dispatch('loadNodes');
    },
    data() {
        return {
            selectedRowKeys: [],
            columns: [
                { title: 'Node ID', dataIndex: 'id', key: 'key' },
                { title: 'Node name', dataIndex: 'name' },
                { title: 'Actions', dataIndex: 'action', scopedSlots: { customRender: 'actions' } },
            ],
        };
    },
    methods: {
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
