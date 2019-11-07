<template>
    <div>
        <!--查询部分-->
        <el-row class="top-row">
            <el-col :span="6">
                <el-col :span="17">
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="4" :offset="2">
                    <el-button icon="el-icon-search" circle></el-button>
                </el-col>
            </el-col>
            <el-col :span="3" :offset="15">
                <!--新增会员按钮-->
                <el-button type="primary" icon="el-icon-plus" class="add-button" @click="dialogFormVisible = true">
                    新增会员
                </el-button>

                <!--新增会员模态框内容-->
                <el-dialog title="新增会员信息" :visible.sync="dialogFormVisible" class="modal-from"
                           :close-on-click-modal="false">

                    <el-form :model="form">
                        <el-col :span="22" :offset="5">
                            <el-form-item label="会员姓名">
                                <el-input class="modal-input"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="22" :offset="5">
                            <el-form-item label="会员账号">
                                <el-input class="modal-input" ></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="22" :offset="5">
                            <el-form-item label="会员密码">
                                <el-input class="modal-input" ></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="22" :offset="5">
                            <el-form-item label="联系方式">
                                <el-input class="modal-input" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="open">取 消</el-button>
                        <el-button type="primary" @click="opens">确 定</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
        <!--表格部分-->
        <el-table :data="tableData" border>
            <el-table-column prop="number" label="编号" align="center" width="120"></el-table-column>

            <el-table-column prop="name" label="姓名" align="center" width="120"></el-table-column>

            <el-table-column prop="levelId" label="会员等级" align="center" width="120"></el-table-column>

            <el-table-column prop="account" label="会员账号" align="center" width="180"></el-table-column>

            <el-table-column prop="password" label="会员密码" align="center" width="180"></el-table-column>

            <el-table-column prop="phone" label="联系方式" align="center" width="180"></el-table-column>

            <el-table-column prop="status" label="会员状态" align="center" width="120">
                <template slot-scope="scope">
                    <el-switch v-model ="scope.row.status" @change=change(scope.row) active-value="1" inactive-value="0">
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column prop="operation" label="操作" align="center">
                <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "MemberList",
        data() {
            return {
                dialogFormVisible: false,
                tableData: [],
                input: '',
                form: {
                    name: '',
                    account: '',
                    password: '',
                    prhone: ''
                },
            }
        },
        mounted() {

        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                axios({
                    url:'/api/memberList.vue',
                    method: "get",
                    responseType:"json",
                }).then(function(response){
                    let data = response.data;
                    // console.log(data)
                    // for(let one of data){
                    //     if (one.status == 1){
                    //         one.status = true
                    //     }else if(one.status == 0){
                    //         one.status = false
                    //     }
                    // }
                    vm.tableData = data;
                })
            })
        },
        methods: {
            change(row) {
                console.log(row);

            },
            open() {
                this.dialogFormVisible = false,
                    this.$message("您取消了操作！")
            },
            opens() {
                this.dialogFormVisible = false,
                    this.$message("您新增了一位会员！")
            }
        },
        watch: {
            '$route': 'ajax'
        },

        formLabelWidth: '320px'


    }
</script>

<style scoped>

    .top-row {
        margin-bottom: 10px;
        margin-top: 20px
    }

    .add-button {
        width: 160px;
    }

    .modal-input {
        width: 300px;
    }

    modal-from {
        margin-left: 50px;
    }


</style>