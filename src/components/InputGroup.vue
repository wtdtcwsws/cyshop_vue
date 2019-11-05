<template>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form>
            <el-form-item label="名称">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
        </el-form>
    </el-form>

</template>

<script>
    export default {
        name:'InputGroup',
        data() {
            return {
                labelPosition: 'right',
                formLabelAlign: {
                    name: ''
                }
            };
        }
    }
</script>

<style scoped>

</style>