<template>
    <div>
        <route-modal @ok="handleSubmit" ref="modal" title="Add new node" :confirm-loading="confirm">
            <node-form ref="form">
                <template v-slot>
                    <a-form-item label="Node type">
                        <a-select v-decorator="['type', {rules: [{required: true}]}]">
                            <a-select-option v-for="type in types" :key="type" :value="type">{{type}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </template>
            </node-form>
        </route-modal>
    </div>
</template>

<script>
import axios from 'axios';
import { Form, Select } from 'ant-design-vue';
import RouteModal from '../../components/layout/RouteModal.vue';
import NodeForm from '../../components/Node/NodeForm.vue';
import { Types } from '../../nodes';

const API_URL = 'http://193.247.203.90:8080/api';

export default {
    components: {
        RouteModal,
        NodeForm,
        aFormItem: Form.Item,
        aSelect: Select,
        aSelectOption: Select.Option,
    },
    data() {
        return {
            types: Types,
            confirm: false,
        };
    },
    methods: {
        handleSubmit() {
            this.confirm = true;
            this.$refs.form.retrieve().then((node) => {
                this.$store.dispatch('addNode', node).then(() => {
                    this.confirm = false;
                    this.$refs.modal.closed();
                });
            }).catch(() => {
                this.confirm = false;
            });
        },
        newNode() {
            axios({
                url: `${API_URL}/devices`,
                method: 'POST',
                data: {
                    deviceID: 'test123456', // TODO
                    deviceEUI: 'test123456', // TODO
                    description: 'test123456', // TODO
                },
            }).then((response) => {
                console.log(response);
            }).catch((e) => {
                console.log(e);
            });
        },
    },
};
</script>
