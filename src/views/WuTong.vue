<template>
    <el-form label-width="80px" >
        <InputGroup labelText="密码" :validRules="validRules" placeholder="密码" type="password"></InputGroup>
        <RadioGroup :items="items" :fItem='fItem'  />
        <el-button type="primary" >提交</el-button>
    </el-form>
</template>

<script>
    import InputGroup from '@/components/InputGroup.vue'
    import RadioGroup from '@/components/RadioGroup.vue'
    export default {
        name: "WuTong",
        components:{
            InputGroup,
            RadioGroup
        },
        data(){
            return{
                validRules:{
                    message:"密码必填",
                    trigger:'blur'
                },
                items:[
                    {name:'男'},
                    {name:'女'},
                    {name:'未知'},
                    {name:'张汉'}
                ],
                fItem:{
                    label:"性别",
                    name:"sex"
                }
            }
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>