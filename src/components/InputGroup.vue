<template>
    <el-form :rules="rules" ref="formName" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item :label="labelText" prop="name">

                <el-input v-if="" name="name" v-model="formLabelAlign.name"  :type="type" :placeholder="placeholder" show-password></el-input>
            </el-form-item>
        <!--<el-button type="primary" @click="submitForm" >提交</el-button>-->
    </el-form>

</template>

<script>
    export default {
        name:'InputGroup',
        // mounted(){
        //     this.rules.name={
        //      required: true, message: this.validRules.message, trigger: this.validRules.trigger
        //     }
        // },
        data() {
            return {
                labelPosition: 'right',
                formLabelAlign: {
                    name: ''
                }
                ,
                rules: {
                    name:[
                        { required: true, message: this.validRules.message, trigger: this.validRules.trigger }
                    ]
                }
            };
        },
        methods: {
            submitForm() {
                let vm = this;
                vm.$refs['formName'].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
            // ,
            // loadRules(){
            //     // rules.name={
            //     //        required: true, message: "122221", trigger: 'blur'
            //     // }
            //     this.labelPosition="left"
            // }
        },
        props:{
            labelText:String,
            type:String,
            placeholder:String,
            eye:{
                type:Boolean,
                default:false
            },
            validRules:{
                    type:Object,
                    default(){
                        return{
                            message:"必填",
                            trigger:'blur'
                        }
                    }

            }
        }
    }
</script>

<style scoped>
    .el-form{
        width: 460px;
    }
</style>