<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="1">
                <el-button type="info" icon="el-icon-back" circle></el-button>
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
                    <el-radio v-model="radio" label="1">审核通过</el-radio>
                    <el-radio v-model="radio" label="2">拒绝通过</el-radio>
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
                    <el-button type="primary" @click="onSubmit">确认提交</el-button>
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
                radio: '1',
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
            onSubmit(){
                console.log("去发货了");
            },
            ajax(){
                let vm = this;
                axios({method:'get',url:"/refundMessage.json",responseType:"json"}).then(
                    function (resule) {
                        // console.log(resule.data.rows);
                        // vm.employees = resule.data.rows;
                        console.log(resule.data.row);
                        vm.employees = resule.data.row;
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>