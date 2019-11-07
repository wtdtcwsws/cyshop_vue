<template>
    <div>
        <el-row>
            <h2>退货/款单列表</h2>
            <el-table
                    :data="employees"
                    style="width:100%;margin-bottom: 20px;"
                    row-key="id"
                    border>
                <el-table-column
                        prop="orderId"
                        label="订单编号"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="memberName"
                        label="买家名称">
                </el-table-column>
                <el-table-column
                        prop="consigneeName"
                        label="收货人">
                </el-table-column>
                <el-table-column
                        prop="memberPhone"
                        label="联系电话">
                </el-table-column>
                <el-table-column
                        prop="payment"
                        label="实付价格">
                </el-table-column>
                <el-table-column
                        prop="paymentWay"
                        label="支付方式">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="下单时间">
                </el-table-column>
                <el-table-column
                        prop="refundStatus"
                        label="处理状态">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.$index, employees)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="total"
                    align="center">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "RefundList",
        data(){
            return {
                employees:[],
                currentPage: 1,
                pageSize:6,
                total:60
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
            handleClick(index, employees) {
                console.log(employees.slice(index,index+1));

            },handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
            ,ajax(){
                let vm = this;
                axios({method:'get',url:"/refundListMessage.json",responseType:"json"}).then(
                    function (resule) {
                        // console.log(resule.data.rows);
                        vm.employees = resule.data.rows;
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>