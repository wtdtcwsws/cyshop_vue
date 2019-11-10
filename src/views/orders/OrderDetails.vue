<template>
    <el-row>
        <!--<h2>订单详情信息</h2>-->
        <el-row :gutter="20">
            <el-col :span="1">
                <el-button type="info" icon="el-icon-back" circle @click="returnOrderList"></el-button>
            </el-col>
            <el-col :span="3">
                <h2 style="margin: 5px">订单详情信息</h2>
            </el-col>
        </el-row>
        <el-row>
            <h3>订单编号：<label>{{orderMsg.orderId}}</label></h3>
            <el-row>
                <el-col :span="8">
                    <label style="color: darkgray">买家账号：</label>
                    <label>{{orderMsg.account}}</label>
                </el-col>
                <el-col :span="8">
                    <label style="color: darkgray">电话号码：</label>
                    <label>{{orderMsg.phone}}</label>
                </el-col>
                <el-col :span="8">
                    <label style="color: darkgray">应付金额：</label>
                    <label>{{orderMsg.payment}}</label>
                </el-col>
            </el-row>
            <br/>
            <el-row>
                <el-col :span="8">
                    <label style="color: darkgray">订单状态：</label>
                    <label>{{orderMsg.orderStatus}}</label>
                </el-col>
                <el-col :span="8">
                    <label style="color: darkgray">下单时间：</label>
                    <label>{{orderMsg.createTime}}</label>
                </el-col>
                <el-col :span="8">
                    <label style="color: darkgray">支付时间：</label>
                    <label>{{orderMsg.paymentTime}}</label>
                </el-col>
            </el-row>
            <br/>
            <el-row>
                <el-col :span="8">
                    <label style="color: darkgray">支付方式：</label>
                    <label>{{orderMsg.paymentWay}}</label>
                </el-col>
                <el-col :span="8">
                    <label style="color: darkgray">发票抬头：</label><label>个人</label>
                </el-col>
            </el-row>
            <br>
            <hr>
        </el-row>
        <el-row>
            <h3>收货信息</h3>
            <el-row>
                <el-col :span="8">
                    <label style="color: darkgray">收货人：</label>
                    <label>{{orderMsg.consigneeName}}</label>
                </el-col>
                <el-col :span="8">
                    <label style="color: darkgray">联系电话：</label>
                    <label>{{orderMsg.consigneePhone}}</label>
                </el-col>
            </el-row>
            <br/>
            <el-row>
                <el-col>
                    <label style="color: darkgray">收货地址：</label>
                    <label>{{orderMsg.consigneeAddress}}</label>
                </el-col>
            </el-row>
            <br/>
            <hr>
        </el-row>
        <el-row>
            <h3>商品信息</h3>
            <el-table
                    :data="orderMsg.children"
                    border>
                <el-table-column
                        prop="skuId"
                        label="商品编号">
                </el-table-column>
                <el-table-column
                        prop="skuName"
                        label="商品名称">
                </el-table-column>
                <el-table-column
                        prop="skuDescription"
                        label="规格属性">
                </el-table-column>
                <el-table-column
                        prop="num"
                        label="数量">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格">
                </el-table-column>
                <el-table-column
                        prop="sum"
                        label="商品小计">
                </el-table-column>
            </el-table>
            <br>
            <el-row>
                <el-col align="right">
                    <label>订单总额：￥{{orderMsg.payment}}</label>
                </el-col>
            </el-row>
            <br>
            <hr>
        </el-row>
        <el-row>
            <h3>操作信息</h3>
            <el-form ref="form" :model="form">
                <el-form-item v-if="operation" label="操作备注：">
                    <el-input type="textarea"
                              v-model="form.desc"
                              style="width: 800px"
                              :autosize="{ minRows: 4, maxRows: 6}"
                              placeholder="请输入内容">
                    </el-input>
                </el-form-item>
                <el-form-item label="执行操作：">
                    <el-button type="primary" v-if="isGoblock" @click="onSubmit">去发货</el-button>
                    <el-button v-if="isDeLblock" @click="changeStatus">无效</el-button>
                    <el-button v-if="isblock" type="text" disabled>无</el-button>
                </el-form-item>
            </el-form>
            <br>
            <hr>
        </el-row>
    </el-row>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "OrderDetails",
        data(){
            return{
                orderMsg:{
                    orderId:"",
                    account:"",
                    phone:"",
                    payment:"",
                    orderStatus:"",
                    createTime:"",
                    paymentTime:"",
                    paymentWay:"",
                    consigneeName:"",
                    consigneePhone:"",
                    consigneeAddress:""
                },
                isGoblock:false,
                isDeLblock:true,
                isblock:false,
                operation:true,
                oStatus:"",
                uResule:"",
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
        methods: {
            ajax(){
                let vm = this;
                axios({method:'post',
                        url:"/api/getOrderDetails",
                        responseType:"json",
                        params:{
                        id:vm.$route.params.id
                    }}).then(
                    function (resule) {
                        vm.orderMsg = resule.data;
                        if(vm.orderMsg.orderStatus == "已付款"){
                            vm.isGoblock = true
                        }else if(vm.orderMsg.orderStatus == "已失效"){
                            vm.isGoblock = false;
                            vm.isDeLblock = false;
                            vm.isblock = true;
                            vm.operation = false;
                        }else if(vm.orderMsg.orderStatus == "已发货"){
                            vm.isGoblock = false;
                            vm.isDeLblock = false;
                            vm.isblock = true;
                            vm.operation = false;
                        }
                    }
                )
            },
            onSubmit(){
                this.$prompt('请输入8位快递单号', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^\d{8}$/,
                    inputErrorMessage: '快递单号格式不正确'
                }).then(({ value }) => {
                    this.orderMsg.orderStatus = "已发货";
                    this.oStatus = "3"
                    this.isGoblock = false;
                    let vm = this;
                    axios({
                        url:'/api/changOrderStatus',
                        method: "post",
                        responseType:"json",
                        params: {
                            id:this.orderMsg.orderId,
                            status:this.oStatus
                        }
                    }).then(function(resule){
                        vm.uResule = resule.data;
                        if(vm.uResule == "1"){
                            vm.$message({
                                type: 'success',
                                message: '订单已发货快递单号为' + value
                            });
                        }else {
                            vm.$message({
                                type: 'info',
                                message: '操作失败'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            changeStatus(){
                this.oStatus = "5"
                this.$confirm('此操作会使该订单失效, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let vm = this;
                    vm.orderMsg.orderStatus = "已失效";
                    vm.isGoblock = false;
                    vm.isDeLblock = false;
                    vm.isblock = true;
                    axios({
                        url:'/api/changOrderStatus',
                        method: "post",
                        responseType:"json",
                        params: {
                            id:this.orderMsg.orderId,
                            status:this.oStatus
                        }
                    }).then(function(resule){
                        vm.uResule = resule.data;
                        if(vm.uResule == "1"){
                            vm.$message({
                                type: 'success',
                                message: '订单'+ vm.orderMsg.orderId +'已失效!'
                            });
                        }else {
                            vm.$message({
                                type: 'info',
                                message: '操作失败'
                            });
                        }
                    });
                    // this.$router.push({
                    //     name:"orderList"
                    // })
                });

            },
            returnOrderList(){
                let vm = this;
                vm.$router.push({
                    name:"orderList"
                })
            }
        }
    }
</script>

<style scoped>

</style>