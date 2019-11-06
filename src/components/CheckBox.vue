<template>
    <!-- `checked` 为 true 或 false -->
    <el-checkbox v-model="checked">{{msg}}</el-checkbox>
</template>
<script>
    export default {
        name: 'CheckBox',
        data() {
            return {
                checked: true
            };
        },
        props:{
            msg:String
        }
    };
</script>