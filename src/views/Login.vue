<template>
    <div>
        <div class="container-fluid login">
            <div class="row justify-content-center align-items-center">
                <div class="col-12 col-sm-4 col-md-3 col-lg-2">
                    <img src="../assets/images/logo.png" alt="logo" class="d-block m-auto" />
                    <div class="form p-3 mt-3">
                        <a-form :form="form" @submit="handleSubmit">
                            <a-form-item class="mb-1"
                                    :validate-status="userNameError() ? 'error' : ''"
                                    :help="userNameError() || ''">
                                <a-input v-decorator="['userName', {rules: [{ required: true, message: 'Please input your username!' }]}]"
                                         placeholder="Username">
                                    <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                                </a-input>
                            </a-form-item>
                            <a-form-item class="mb-1" :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
                                <a-input v-decorator="['password', {rules: [{ required: true, message: 'Please input your Password!' }]}]"
                                        type="password" placeholder="Password">
                                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                                </a-input>
                            </a-form-item>
                            <a-form-item class="m-0">
                                <a-button type="primary" html-type="submit" block :disabled="hasErrors(form.getFieldsError())">
                                    Log in
                                </a-button>
                            </a-form-item>
                        </a-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Input, Icon, Button } from 'ant-design-vue';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
    components: {
        aForm: Form,
        aInput: Input,
        aIcon: Icon,
        aButton: Button,
        aFormItem: Form.Item,
    },
    mounted() {
        this.$nextTick(() => {
            this.form.validateFields();
        });
    },
    data() {
        return {
            hasErrors,
            form: this.$form.createForm(this),
        };
    },
    methods: {
        userNameError() {
            const { getFieldError, isFieldTouched } = this.form;
            return isFieldTouched('userName') && getFieldError('userName');
        },
        passwordError() {
            const { getFieldError, isFieldTouched } = this.form;
            return isFieldTouched('password') && getFieldError('password');
        },
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    this.$router.push({ name: 'home' });
                }
            });
        },
    },
};
</script>

<style scoped lang="scss">
    @import "../assets/scss/variables";

    .login, .row {
        background: $menu-bg;
        min-height: 100vh;
    }

    .row {

        img {

            width: 5rem;
        }
    }

    .form {
        background: white;
        border-radius:3px;
    }
</style>
