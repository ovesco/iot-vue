<template>
    <div>
        <route-modal @ok="handleSubmit" ref="modal" title="Update existing node" :confirm-loading="confirm">
            <node-form ref="form" :data="$store.getters.getNode($route.params.nodeKey)" />
        </route-modal>
    </div>
</template>

<script>
import NodeForm from '../../components/Node/NodeForm.vue';
import RouteModal from '../../components/layout/RouteModal.vue';

export default {
    components: {
        RouteModal,
        NodeForm,
    },
    data() {
        return {
            confirm: false,
        };
    },
    mounted() {
        console.log(this.$route);
    },
    methods: {
        handleSubmit() {
            this.confirm = true;
            this.$refs.form.retrieve().then((node) => {
                console.log(node);
                this.$store.dispatch('updateNode', { node, key: this.$route.params.nodeKey }).then(() => {
                    this.confirm = false;
                    this.$refs.modal.closed();
                });
            }).catch(() => {
                this.confirm = false;
            });
        },
    },
};
</script>
