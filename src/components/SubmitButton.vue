<template>
    <!--蓝色-->
    <el-form ref="loginForm">
        <el-button type="primary" plain v-text="buttonText" @click="submit()"></el-button>
    </el-form>
</template>

<script>
    export default {
        name: "SubmitButton",
        props:{
            buttonText:String,
            targetPage:String
        },
        methods:{
            submit(){
                this.$router.push({
                    name:this.targetPage,
                    params:this.loginForm
                })
                // this.$refs['loginForm'].validate((values) =>{
                //     if(values){
                //         this.$router.push({
                //             name:this.targetPage,
                //             params:this.loginForm
                //         })
                //     }
                // })
            }
        }
    }
</script>