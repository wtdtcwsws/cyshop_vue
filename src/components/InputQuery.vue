<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <el-input type="text" placeholder="请输入需要搜索的内容" maxlength="10" v-model="input"></el-input>
        </el-col>
        <el-col :span="2">
            <el-button type="primary">{{buttonName}} <i class="el-icon-plus"></i></el-button>
        </el-col>
    </el-row>

</template>

<script>
    export default {
        name: "InputQuery",
        data(){
            return {
                input: ''
            }
        },
        props:{
            buttonName:String
        }
    }
</script>

<style scoped>

</style>