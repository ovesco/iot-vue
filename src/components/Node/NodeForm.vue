<template>
    <a-form :form="form" layout="horizontal">
        <a-form-item label="Device id">
            <a-input v-decorator="['id', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item label="Device EUI">
            <a-input v-decorator="['name', {rules: [{required: true}]}]" />
        </a-form-item>
        <slot />
    </a-form>
</template>

<script>
import { Form, Input } from 'ant-design-vue';

export default {
    components: {
        aForm: Form,
        aFormItem: Form.Item,
        aInput: Input,
    },
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            form: this.$form.createForm(this),
        };
    },
    created() {
        const mapping = {};
        Object.keys(this.data).forEach((key) => {
            mapping[key] = this.$form.createFormField({ value: this.data[key] });
        });

        this.form = this.$form.createForm(this, {
            mapPropsToFields: () => mapping,
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
