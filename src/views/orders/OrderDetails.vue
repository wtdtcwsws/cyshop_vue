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
            <el-row>
                <el-col>
                    <label style="color: darkgray">邮编：</label>
                    <label>{{orderMsg.zip}}</label>
                </el-col>
            </el-row>
            <br/>
            <hr>
        </el-row>
        <el-row>
            <h3>商品信息</h3>
            <el-table
                    :data="employees"
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
                    <label>订单总额：￥1999.0</label>
                </el-col>
            </el-row>
            <br>
            <hr>
        </el-row>
        <el-row>
            <h3>操作信息</h3>
            <el-form ref="form" :model="form">
                <el-form-item label="操作备注：">
                    <el-input type="textarea"
                              v-model="form.desc"
                              style="width: 800px"
                              :autosize="{ minRows: 4, maxRows: 6}"
                              placeholder="请输入内容">
                    </el-input>
                </el-form-item>
                <el-form-item label="执行操作：">
                    <el-button type="primary" @click="onSubmit">去发货</el-button>
                    <el-button @click="changStatus(orderMsg.orderId)">无效</el-button>
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
                employees:[],
                orderMsg:{},
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
                axios({method:'get',url:"/orderMessage.json",responseType:"json"}).then(
                    function (resule) {
                        console.log(resule.data.rows);
                        vm.employees = resule.data.rows;
                        vm.orderMsg = resule.data.row;
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
                    this.$message({
                        type: 'success',
                        message: '订单已发货快递单号为' + value
                    });
                    this.$router.push({
                        name:"orderList"
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            changStatus(a){
                this.$confirm('此操作会使该订单失效, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '订单'+ a +'已失效!'
                    });
                    this.$router.push({
                        name:"orderList"
                    })
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