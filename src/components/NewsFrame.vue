<template>
    <el-button type="primary" @click="open">{{buttonName}}</el-button>
</template>

<script>
    export default {
        name: "NewsFrame",
        methods: {
            open() {
                this.$alert(this.modalContext, this.modalTitle, {
                    confirmButtonText: '确定'
                });
            }
        },
        props: {
            buttonName:String,
            modalContext:String,
            modalTitle:String

        }
    }
</script>

<style scoped>

</style>