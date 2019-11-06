<template>
    <el-row>
        <el-col :span="22" :offset="1">
            <!--查询部分-->
            <el-row class="top-row" >
                <el-col :span="10">
                    <el-col :span="4">
                        <span style="display: block;margin-top: 8px;margin-left: 5px">商品名称：</span>
                    </el-col>
                    <el-col :span="10">
                        <el-input v-model="input" placeholder="请输入商品名称"></el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-button type="primary" icon="el-icon-search">搜索</el-button>
                    </el-col>
                </el-col>
            </el-row>
            <!--表格部分-->
            <el-table :data="tableData" border>
                <el-table-column prop="number" label="编 号" align="center" width="140"></el-table-column>

                <el-table-column prop="name" label="商品名称" align="center" width="220"></el-table-column>

                <el-table-column prop="specification" label="商品规格" align="center" width="220"></el-table-column>

                <el-table-column prop="price" label="价 格" align="center" width="120"></el-table-column>

                <el-table-column prop="stock" label="库存数量" align="center" width="120"></el-table-column>

                <el-table-column prop="danger" label="库存预警数量" align="center" width="120"></el-table-column>

                <el-table-column prop="status" label="状 态" align="center" width="200">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status" active-text="在售" inactive-text="停售" inactive-color="#ff4949" @change=change(scope.row)>
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column prop="operation" label="操 作" align="center">
                    <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "CommodityStore",
        data() {
            return {
                dialogFormVisible: false,
                tableData: [{
                    number: 'cycs001',
                    name: '华为手机',
                    specification: '内存:64G,颜色:白色',
                    price: '13.00',
                    stock: '23',
                    danger: '10',
                    status: true,
                    operation: ''
                },{
                    number: 'cycs001',
                    name: '华为手机',
                    specification: '内存:64G,颜色:白色',
                    price: '13.00',
                    stock: '23',
                    danger: '10',
                    status: false,
                    operation: ''
                }]
            }
        },
        methods:{
            change(row){
                console.log(row);
            },
            open() {

            }
        }
    }
</script>

<style scoped>

    .top-row{
        margin-bottom: 10px;
        margin-top: 20px
    }
    .add-button{
        width: 160px;
    }
    .modal-input{
        width: 300px;
    }

</style>