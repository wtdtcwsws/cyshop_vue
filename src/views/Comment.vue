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
            <el-col :span="1" offset="12">
                <el-button type="primary" icon="el-icon-plus" class="add-button" @click="addComment = true" close-on-click-modal="false">新增评论</el-button>
            </el-col>




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
                    prop="comment_id"
                    label="评论编号"
                    sortable
                    width="110"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="spu_id"
                    label="SPU编号"
                    sortable
                    width="180"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="sku_id"
                    label="SKU编号"
                    sortable
                    width="180"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="评论内容"
                    sortable
                    width="220"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="start"
                    label="评论星级"
                    sortable
                    width="120"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="用户名称"
                    sortable
                    width="150"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="评论时间"
                    sortable
                    width="180"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="open"
                    label="隐藏"
                    align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" active-text="隐藏" inactive-text="不隐藏" inactive-color="#ff4949" @change=change(scope.row)>
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="operating"
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    export default {
        name: "comment",
        data() {
            return {


                tableData: [{
                    comment_id:1,
                    spu_id: 1,
                    sku_id: 1,
                    date: '2016-05-02',
                    content:'dasdasdasds',
                    start:'⭐⭐⭐⭐⭐',
                    name: '王小虎11',
                    open:'true',
                    operating:''
                }, {
                    comment_id:1,
                    spu_id: 1,
                    sku_id: 1,
                    date: '2016-05-02',
                    content:'dasdasdasds',
                    start:'⭐⭐⭐⭐⭐',
                    name: '王小虎',
                    open:'false',

                    operating:''
                },
                    {
                        comment_id:1,
                        spu_id: 1,
                        sku_id: 1,
                        date: '2016-05-02',
                        content:'dasdasdasds',
                        start:'⭐⭐⭐⭐⭐',
                        name: '王小虎11',
                        open:'true',
                        operating:''
                    }, {
                        comment_id:1,
                        spu_id: 1,
                        sku_id: 1,
                        date: '2016-05-02',
                        content:'dasdasdasds',
                        start:'⭐⭐⭐⭐⭐',
                        name: '王小虎',
                        open:'false',

                        operating:''
                    },
                    {
                        comment_id:1,
                        spu_id: 1,
                        sku_id: 1,
                        date: '2016-05-02',
                        content:'dasdasdasds',
                        start:'⭐⭐⭐⭐⭐',
                        name: '王小虎11',
                        open:'true',
                        operating:''
                    }, {
                        comment_id:1,
                        spu_id: 1,
                        sku_id: 1,
                        date: '2016-05-02',
                        content:'dasdasdasds',
                        start:'⭐⭐⭐⭐⭐',
                        name: '王小虎',
                        open:'false',

                        operating:''
                    },
                    {
                        comment_id:1,
                        spu_id: 1,
                        sku_id: 1,
                        date: '2016-05-02',
                        content:'dasdasdasds',
                        start:'⭐⭐⭐⭐⭐',
                        name: '王小虎11',
                        open:'true',
                        operating:''
                    }, {
                        comment_id:1,
                        spu_id: 1,
                        sku_id: 1,
                        date: '2016-05-02',
                        content:'dasdasdasds',
                        start:'⭐⭐⭐⭐⭐',
                        name: '王小虎',
                        open:'false',

                        operating:''

                    },

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
                this.$alert('<div style="width: 100%;padding: 5px;margin-bottom: 5px">' +
                    '<el-row ><el-col :span="24"><span>评论编号</span><input type="text"></span></el-col></el-row><br>' +
                    '<el-row><el-col :span="24"><span>SPU编号</span><input type="text"></span></el-col></el-row><br>' +
                    '<el-row><el-col :span="24"><span>SKU编号</span><input type="text"></span></el-col></el-row><br>' +
                    '<el-row><el-col :span="24"><span>评论内容</span><input type="text"></span></el-col></el-row><br>' +
                    '<el-row><el-col :span="24"><span>评论星级</span><input type="text"></span></el-col></el-row><br>' +
                    '<el-row><el-col :span="24"><span>用户名称</span><input type="text"></span></el-col></el-row><br>' +
                    '<el-row><el-col :span="24"><span>评论时间</span><input type="text"></span></el-col></el-row><br>' +
                    '</div>',
                    '编辑评论', {
                    distinguishCancelAndClose: true,
                        dangerouslyUseHTMLString:true,
                    confirmButtonText: '保存',
                    cancelButtonText: '放弃修改'
                })
                    .then(() => {
                        this.$message({
                            type: 'info',
                            message: '保存修改'
                        });
                    })
                    .catch(action => {
                        this.$message({
                            type: 'info',
                            message: action === 'cancel'
                                ? '放弃保存并离开页面'
                                : '停留在当前页面'
                        })
                    });
            },
            // handleDelete(index, row) {
            //     row.splice(index, 1);
            // }
            deleteRow(index, rows) {
                rows.splice(index, 1);
            }


        },
    }
</script>

<style scoped>

</style>