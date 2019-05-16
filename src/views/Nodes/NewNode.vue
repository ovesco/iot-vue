<template>
    <div>
        <route-drawer>
            <div class="p-4">
                <h2>Create a new node</h2>
                <a-form :form="form" @submit="handleSubmit">
                    <a-form-item label="Node name">
                        <a-input v-decorator="['name', {rules: [{required: true}]}]" />
                    </a-form-item>
                    <a-form-item label="Node type">
                        <a-select v-decorator="['type', {rules: [{required: true}]}]">
                            <a-select-option v-for="type in types" :key="type" :value="type">{{type}}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                        <a-button type="primary" html-type="submit">
                            Submit
                        </a-button>
                    </a-form-item>
                </a-form>
            </div>
        </route-drawer>
    </div>
</template>

<script>
import { Form, Input, Select, Button } from 'ant-design-vue';
import RouteDrawer from '../../components/layout/RouteDrawer.vue';
import { Types } from '../../nodes';

export default {
    components: {
        RouteDrawer,
        aForm: Form,
        aButton: Button,
        aFormItem: Form.Item,
        aInput: Input,
        aSelect: Select,
        aSelectOption: Select.Option,
    },
    data() {
        return {
            types: Types,
            form: this.$form.createForm(this),
        };
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        },
    },
};
</script>
