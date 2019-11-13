<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="1">
                <el-button type="info" icon="el-icon-back" circle @click="returnRefundList"></el-button>
            </el-col>
            <el-col :span="3">
                <h2 style="margin: 5px">退货/款详情</h2>
            </el-col>
        </el-row>
        <br/>
        <br/>
        <el-form ref="form" :model="form">
            <el-row>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="3" align="center">
                    <label style="font-weight:bold;">订单编号：</label>
                </el-col>
                <el-col :span="20">
                    <label>{{employees.orderId}}</label>
                </el-col>
            </el-row>
            <br/>
            <br/>
            <el-row>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="3" align="center">
                    <label style="font-weight:bold;">用户：</label>
                </el-col>
                <el-col :span="20">
                    <label>{{employees.memberName}}</label>
                </el-col>
            </el-row>
            <br/>
            <br/>
            <el-row>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="3" align="center">
                    <label style="font-weight:bold;">申请日期：</label>
                </el-col>
                <el-col :span="20">
                    <label>{{employees.createTime}}</label>
                </el-col>
            </el-row>
            <br/>
            <br/>
            <el-row>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="3" align="center">
                    <label style="font-weight:bold;">商品：</label>
                </el-col>
                <el-col :span="20">
                    <label>{{employees.skuName}}</label>
                </el-col>
            </el-row>
            <br/>
            <br/>
            <el-row>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="3" align="center">
                    <label style="font-weight:bold;">退货款原因：</label>
                </el-col>
                <el-col :span="20">
                    <label>{{employees.reason}}</label>
                </el-col>
            </el-row>
            <br/>
            <br/>
            <el-row>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="3" align="center">
                    <label style="font-weight:bold;">审核意见：</label>
                </el-col>
                <el-col :span="20">
                    <el-radio v-if="radio0" v-model="radio" label="0">撤销申请</el-radio>
                    <el-radio v-if="radio1" v-model="radio" label="1">审核通过</el-radio>
                    <el-radio v-if="radio2" v-model="radio" label="2">处理完成</el-radio>
                    <el-button v-if="isblock" type="text" disabled>无</el-button>
                </el-col>
            </el-row>
            <br/>
            <br/>
            <el-row>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="3" align="center">
                    <label style="font-weight:bold;">处理备注：</label>
                </el-col>
                <el-col :span="20">
                    <el-input type="textarea"
                              v-model="form.desc"
                              style="width: 800px"
                              :autosize="{ minRows: 4, maxRows: 6}"
                              placeholder="请输入内容">
                    </el-input>
                </el-col>
            </el-row>
            <br/>
            <br/>
            <el-row>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="3" align="center">
                    <label style="font-weight:bold;">&nbsp;</label>
                </el-col>
                <el-col :span="20">
                    <el-button v-if="submitSee" type="primary" @click="onSubmit(radio)">确认提交</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "RefundDetails",
        data(){
            return {
                radio: '',
                radio1:false,
                radio0:false,
                radio2:false,
                isblock:false,
                submitSee:true,
                employees:[],
                form:{
                    desc:""
                }
            }
        },
        mounted(){
            this.ajax();
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'ajax'
        },
        methods:{
            onSubmit(radioResule){
                switch (radioResule) {
                    case "1":
                        this.employees.refundStatus = "1";
                        break;
                    case "2":
                        this.employees.refundStatus = "2";
                        break;
                    case "0":
                        this.employees.refundStatus = "-1";
                        break;
                    default:
                        this.employees.refundStatus = "0";
                        break;
                }

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log("this.employees.refundStatus:"+this.employees.refundStatus);
                    let vm = this;
                    if(vm.employees.refundStatus != "0"){
                        axios({method: 'post',
                            url: "/api/changeRefundStatus",
                            responseType: "json",
                            params: {
                                id:vm.employees.orderId,
                                status:vm.employees.refundStatus
                            }}).then(function (resule) {
                            if(resule.data == "1"){
                                vm.$message('已提交操作');

                                // 判断更改后的按钮
                                switch (vm.employees.refundStatus) {
                                    case "1":
                                        vm.radio0 = true;
                                        vm.radio2 = true;
                                        break;
                                    case "2":
                                        vm.radio0 = true;
                                        break;
                                    default:
                                        vm.radio0 = false;
                                        vm.radio1 = false;
                                        vm.radio2 = false;
                                        vm.isblock = true;
                                        vm.submitSee = false;
                                        break;
                                }
                            }else{
                                vm.$message('提交失败');
                            }
                        })
                    }else{
                        vm.$message('请选择审核意见');
                    }
                });
            },
            returnRefundList(){
                this.$router.push({
                    name:"refundList"
                })
            },
            ajax(){
                let vm = this;
                axios({method:'post',
                    url:"/api/getRefundDetails",
                    responseType:"json",
                    params: {
                        id: vm.$route.params.id
                }}).then(
                    function (resule) {
                        vm.employees = resule.data;
                        if(vm.employees.rstatus == "0"){
                            vm.radio1 = true,
                            vm.radio0 = true
                        }else if(vm.employees.rstatus == "1"){
                            vm.radio0 = true,
                            vm.radio2 = true
                        }else{
                            vm.isblock = true,
                            vm.submitSee = false
                        }
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>