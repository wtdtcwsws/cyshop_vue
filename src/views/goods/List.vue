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
                    prop="name"
                    label="商品名称"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="catalog3"
                    label="所属三级分类"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="description"
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
                                @change="ajax"
                                v-model="tableData[scope.$index].hot"
                                active-value="1"
                                inactive-value="0"
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
        mounted(){
            this.ajax();

        },
        data() {
            return {
                value1: true,
                tableData:[]
            }
        },
        methods:{
            ajax(){
                let vm = this;
                axios.get('/wutong/goods.json','json')
                .then(function (response) {
                    console.log(response.data)
                    console.log(response)
                    // console.log(vm);
                    vm.tableData= response.data;
                    console.log(vm.tableData);
                    // this.tableData[1] = response.data[1];
                })}
        }
    };
</script>

<style scoped>

</style>