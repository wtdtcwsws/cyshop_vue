<template>
    <div>
        <!--查询部分-->
        <el-row class="top-row" >
            <el-col :span="10">

                <el-col :span="10">
                    <el-input v-model="input" placeholder="请输入关键字"></el-input>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                </el-col>
            </el-col>
            <el-col :span="11">

            </el-col>


            <!--新增评论按钮-->
            <!--<el-col :span="1" offset="12">-->
                <!--<el-button type="primary" icon="el-icon-plus" class="add-button" @click="addComment = true" close-on-click-modal="false">新增评论</el-button>-->
            <!--</el-col>-->




        </el-row>


        <br>


        <!--表格-->
        <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
                    prop="id"
                    label="评论编号"
                    sortable
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="spuId"
                    label="SPU编号"
                    sortable
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="skuId"
                    label="SKU编号"
                    sortable
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="评论内容"
                    sortable
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="star"
                    label="评论星级"
                    sortable
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="memberId"
                    label="用户编号"
                    sortable
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="memberName"
                    label="用户名称"
                    sortable
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="publishTime"
                    label="评论时间"
                    sortable
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="hide"
                    label="隐藏"
                    align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.hide"
                               :inactive-value="0"
                               :active-value="1"
                               active-text="隐藏" inactive-text="不隐藏" inactive-color="#ff4949"  @change=change(scope.row)>
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="operating"
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <!--<el-button-->
                            <!--size="mini"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                    <el-button
                            size="mini"
                            type="danger"
                            @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>

                </template>
            </el-table-column>

        </el-table>


    </div>

</template>

<script>
    const axios = require('axios');
    export default {
        mounted(){
            this.ajax();
        },
        name: "comment",
        data() {
            return {
                input: '',

                tableData: [

                ],

            }
        },
        methods: {
            load(tree, treeNode, resolve) {
                setTimeout(() => {
                    resolve([
                        {
                            id: 31,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }, {
                            id: 32,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }
                    ])
                }, 1000)
            },
            handleEdit() {

            },
            ajax(){
                let vm = this;
                axios.get('/api/getComment')
                .then(function (response) {
                    console.log(response.data);
                    let comments = [];
                    comments = response.data;
                    console.log('comments',comments)
                    vm.tableData = comments;
                })},
            // handleDelete(index, row) {
            //     row.splice(index, 1);
            // }
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },



        },

    }
</script>

<style scoped>

</style>