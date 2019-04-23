<template>
    <div>
        <h6 class="item-category mb-1">{{ title }}</h6>
    </div>
</template>

<script>
export default {
    props: ['title'],
};
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/variables";

    .item-category {
        color: $gray-500;
        font-weight: bolder;
    }
</style>
