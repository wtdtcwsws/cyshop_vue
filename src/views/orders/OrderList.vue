<template>
    <div>
        <el-row>
            <h2>订单列表</h2>
            <el-table
                    class=""
                    :data="employees"
                    style="margin-bottom: 20px;height: 549px;"
                    row-key="id"
                    border
                    max-height="430">
                <el-table-column
                        prop="orderId"
                        label="订单编号"
                        sortable
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="memberName"
                        label="买家名称"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="consigneeName"
                        label="收货人"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="totalPrice"
                        label="订单价格"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="postPrice"
                        label="邮费"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="payment"
                        label="实付价格"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="orderStatus"
                        label="订单状态"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="paymentWay"
                        label="支付方式"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="下单时间"
                        width="150">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.$index, employees[scope.$index].orderId)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!--<el-row>-->
            <!--<el-col :span="2" :offset="11">-->
                <!--<el-button style="height: 500px" v-if="noDate" type="text" disabled>暂无数据</el-button>-->
            <!--</el-col>-->
        <!--</el-row>-->
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
        name: "OrderList",
        data(){
            return {
                employees:[],
                currentPage: 1,
                pageSize:6,
                total:60
            }
        },
        // mounted(){
        //     this.ajax();
        // },
        // watch: {
        //     // 如果路由有变化，会再次执行该方法
        //     '$route': 'ajax'
        // },
        beforeRouteEnter(to,employees,next){
            next(vm => {
                axios({
                    url:'/api/getOrderList',
                    method: "get",
                    responseType:"json",
                }).then(function(response){
                    let data = response.data;
                    vm.employees = data;
                })
            })
        },
        methods: {
            handleClick(index, a) {
                console.log(a);
                let vm1 = this;
                vm1.$router.push({
                    name:'orderDetails',
                    params:{
                        id:a
                    }
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
            // ,ajax(){
            //     let vm = this;
            //     axios({method:'post',url:"/api/getOrderList",responseType:"json"}).then(
            //         function (resule) {
            //             // console.log(resule.data.rows);
            //             vm.employees = resule.data;
            //         }
            //     )
            // }
        }
    }
</script>

<style scoped>

</style>