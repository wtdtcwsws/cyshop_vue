    <template >
        <div style="background-image: url('/timg6.png');width: auto;height: auto ;z-index: -1;background-size:100%; padding: 148px;min-width: 1024px;max-width: 100%; " >
            <div style="width: 500px;margin: 180px auto;border-radius: 10px;margin-left: 35%" class="LoginBox">
                <el-form ref="loginForm" label-width="80px" :model="loginModel" :rules="loginRules" style="padding: 5px">
                    <!--<el-form-item label="账号" prop="account" style="color: white">-->
                        <!--<el-input v-model="loginModel.account" placeholder="账号" round></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="密码" prop="password" style="color: white">-->
                        <!--<el-input v-model="loginModel.password" placeholder="密码" show-password round></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="验证码" prop="validCode" style="color: blue;border-radius: 30px;font-size: 20px ">-->
                        <!--<el-input v-model="loginModel.validCode" placeholder="验证码" style="width: 50%;border-radius: 30px" round></el-input>-->
                        <!--<label style="border: 1px solid #efef;margin-left: 20px;color: white;">{{loginModel.code}}</label>-->
                    <!--</el-form-item>-->
                    <el-form-item class="login_inputBox" prop="account">
                        <span style="color:white;margin-right: 10px;font-size: 14px;margin-left: 14px">账号</span>
                        <el-input v-model="loginModel.account" placeholder="账号" round style="width: 67%;margin-right: 10px"></el-input>
                    </el-form-item>
                    <el-form-item class="login_inputBox" prop="password">
                        <span style="color: white;margin-right: 10px;font-size: 14px;margin-left: 14px">密码</span>
                        <el-input v-model="loginModel.password" placeholder="密码" show-password round style="width: 67%;margin-right: 10px"></el-input>
                    </el-form-item>
                    <el-form-item class="login_inputBox" prop="validCode">
                        <span style="color: white;margin-right: 10px;font-size: 14px;margin-left: 0px">验证码</span>
                        <el-input v-model="loginModel.validCode" placeholder="验证码" style="width: 30%;border-radius: 30px" round></el-input>
                        <label style="border: 1px solid #efef;margin-left: 20px;color: white;">{{loginModel.code}}</label>
                    </el-form-item>
                    <hr>
                    <el-form-item>
                        <el-button type="primary" @click="onLogin" style="width: 80%;margin-top: 20px" >登录</el-button>
                    </el-form-item>
                </el-form>
                <!--<el-card class="box-card" style="margin: 100px auto;width: 500px" >-->
                    <!--<div slot="header" class="clearfix">-->
                        <!--<span>登录</span>-->
                    <!--</div>-->
                    <!--<div style="background-color: cadetblue">-->
                        <!--<el-form ref="loginForm" label-width="80px" :model="loginModel" :rules="loginRules" >-->
                            <!--<el-form-item label="账号" prop="account">-->
                                <!--<el-input v-model="loginModel.account" placeholder="账号"></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="密码" prop="password">-->
                                <!--<el-input v-model="loginModel.password" placeholder="密码" show-password></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="验证码" prop="validCode">-->
                                <!--<el-input v-model="loginModel.validCode" placeholder="验证码" style="width: 50%"></el-input>-->
                                <!--<label style="border: 1px solid #efef">{{loginModel.code}}</label>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item>-->
                                <!--<el-button type="primary" @click="onLogin" style="width: 100%">登录</el-button>-->
                            <!--</el-form-item>-->
                        <!--</el-form>-->
                    <!--</div>-->
                <!--</el-card>-->

            </div>

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
    .LoginBox {
        border: 1px solid #999;
        padding: 30px;
        background-color: rgba(5,5,5,0.5);
        z-index: 1;
    }
    .login_inputBox {
        margin-bottom: 20px;
    }
</style>