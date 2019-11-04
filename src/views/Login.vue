<template>
    <div style="width: 500px;margin: 100px  auto">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>登录</span>
            </div>
            <div>
                <el-form ref="loginForm" label-width="80px" :model="loginModel" :rules="loginRules">
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="loginModel.account" placeholder="账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginModel.password" placeholder="密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="validCode">
                        <el-input v-model="loginModel.validCode" placeholder="验证码" style="width: 50%"></el-input>
                        <label >{{loginModel.code}}</label>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onLogin" style="width: 100%">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

    </div>
</template>

<script>
    export default {
        data() {
            return {

                loginModel: {
                    account: '',
                    password: '',
                    validCode: '',
                    code:this.getCode()
                },
                loginRules: {
                    account: {
                        required: true,
                        trigger: "blur",
                        message: "账号必填"
                    },
                    password: {
                        required: true,
                        trigger: "blur",
                        message: "密码必填"
                    },
                    validCode: {
                        // required: true,
                        trigger: 'blur',
                        // message:"验证码必填",
                        validator:  (rules, value, callback) =>{
                            console.log(rules);
                            console.log(value);
                            console.log(callback);
                            if (value != this.loginModel.code) {
                                console.log(this.loginModel.code);
                                callback(new Error("请输入正确的验证码"));
                            } else {
                                callback();
                            }
                        }
                    }
                }
            }
        },
        methods: {
            fuc() {
                let a = Math.random();
                console.log(a)
            },
            getCode(){
               return Math.floor(Math.random()*10000);
            },
            onLogin() {
                let vm = this;
                vm.$refs['loginForm'].validate(function (valid) {
                    if (valid) {
                        vm.$router.push({
                            name: 'table',
                            params: 'vm.loginModel'
                        })
                    }

                })

            }
        }
    }

</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>