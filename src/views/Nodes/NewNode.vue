<template>
    <div>
        <route-modal @ok="handleSubmit" ref="modal" title="Add new node" :confirm-loading="confirm">
            <a-form :form="form" layout="horizontal">
                <a-form-item label="Node name">
                    <a-input v-decorator="['name', {rules: [{required: true}]}]" />
                </a-form-item>
                <a-form-item label="Description">
                    <a-input v-decorator="['description']" />
                </a-form-item>
                <a-form-item label="Node type">
                    <a-select v-decorator="['type', {rules: [{required: true}]}]">
                        <a-select-option v-for="type in types" :key="type" :value="type">{{type}}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </route-modal>
    </div>
</template>

<script>
import { Form, Input, Select } from 'ant-design-vue';
import RouteModal from '../../components/layout/RouteModal.vue';
import { Types } from '../../nodes';

export default {
    components: {
        RouteModal,
        aForm: Form,
        aFormItem: Form.Item,
        aInput: Input,
        aSelect: Select,
        aSelectOption: Select.Option,
    },
    data() {
        return {
            types: Types,
            formLayout: 'horizontal',
            form: this.$form.createForm(this),
            confirm: false,
        };
    },
    methods: {
        handleSubmit() {
            this.confirm = true;
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.$store.dispatch('addNode', values).then(() => {
                        this.confirm = false;
                        this.$refs.modal.closed();
                    });
                } else {
                    this.confirm = false;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .ant-row {
        margin-bottom: 0!important;

        label::after {
            margin-bottom: 0 !important;
        }
    }
</style>
