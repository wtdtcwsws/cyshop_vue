<template>
    <div>
        <h2>商品列表</h2>
        <el-table
                :data="tableData"
                style="width:100%;margin-bottom: 20px;"
                row-key="id"
                border
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
                    prop="id"
                    label="商品编号"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="spuName"
                    label="商品名称"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="catalog3Id"
                    label="所属三级分类"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="spuDescription"
                    label="商品描述"

            >
            </el-table-column>

            <el-table-column
                    align="center"
                    label="热卖"
                    sortable
                    prop="hot"
            >
                <template v-slot="scope">
                        <el-switch
                                @change="changeHot(tableData[scope.$index].hot)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="tableData[scope.$index].hot"
                                active-text="是"
                                inactive-text="否">
                        </el-switch>
                </template>

            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    const axios = require('axios');

    export default {

        name: "list",
        created(){
            this.ajax();


        },
        data() {
            return {
                value1: true,
                tableData:[],
                td:[]
            }
        },
        methods:{
            ajax(){
                let vm = this;
                let temp = [];
                axios.get('/api/getGoods')
                .then(function (response) {
                    console.log(response);
                    // vm.td = response.data;
                    // temp= response.data;
                    // console.log(vm.td);
                    // console.log(temp);

                    vm.tableData= response.data;
                    // console.log(vm.tableData);
                })},
            changeHot(hot) {
                console.log(hot);
            }
        }
    };
</script>

<style scoped>

</style>