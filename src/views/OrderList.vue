<template>
    <div>
        <el-row>
            <el-col :span="22" :offset="1">
                <h3>订单列表</h3>

                <el-table
                        class=""
                        :data="employees"
                        style="width: 100%;margin-bottom: 20px;"
                        row-key="id"
                        border
                        max-height="430"
                        :tree-props="{children: 'children'}">
                    <el-table-column
                            prop="orderId"
                            label="订单编号"
                            sortable
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="skuName"
                            label="商品名称"
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
                            fixed="right"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.$index, employees)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12"
                    :offset="6">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="prev, pager, next, jumper"
                        :total="total"
                        align="center">
                </el-pagination>
            </el-col>
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
                axios({method:'get',url:"/orderListMessage.json",responseType:"json"}).then(
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