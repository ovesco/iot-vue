<template>
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
</template>

<script>
import { Form, Input, Select } from 'ant-design-vue';
import { Types } from '../../nodes';

export default {
    components: {
        aForm: Form,
        aFormItem: Form.Item,
        aInput: Input,
        aSelect: Select,
        aSelectOption: Select.Option,
    },
    props: {
        data: {
            type: Object,
            default: () => ({
                name: null,
                description: null,
                type: null,
            }),
        },
    },
    data() {
        return {
            types: Types,
            form: this.$form.createForm(this),
        };
    },
    created() {
        this.form = this.$form.createForm(this, {
            mapPropsToFields: () => ({
                name: this.$form.createFormField({ value: this.data.name }),
                description: this.$form.createFormField({ value: this.data.description }),
                type: this.$form.createFormField({ value: this.data.type }),
            }),
        });
    },
    methods: {
        retrieve() {
            return new Promise((resolve, reject) => {
                this.form.validateFields((err, values) => {
                    if (!err) resolve(values);
                    else reject();
                });
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
