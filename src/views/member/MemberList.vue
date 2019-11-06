<template>
    <el-row>
        <el-col :span="22" :offset="1">
            <!--查询部分-->
            <el-row class="top-row" >
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
                    <el-button type="primary" icon="el-icon-plus" class="add-button" @click="dialogFormVisible = true">新增会员</el-button>

                    <!--新增会员模态框内容-->
                    <el-dialog title="请输入新增会员信息" :visible.sync="dialogFormVisible">
                        <el-form :model="form" >

                            <el-form-item label="姓 名">
                                <el-input class="modal-input"></el-input>
                            </el-form-item>

                            <el-form-item label="账 号">
                                <el-input class="modal-input"></el-input>
                            </el-form-item>

                            <el-form-item label="密 码">
                                <el-input class="modal-input"></el-input>
                            </el-form-item>

                            <el-form-item label="联系方式">
                                <el-input class="modal-input"></el-input>
                            </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                        </div>
                    </el-dialog>
                </el-col>
            </el-row>
            <!--表格部分-->
            <el-table :data="tableData" border>
                <el-table-column prop="number" label="编号" align="center" width="120"></el-table-column>

                <el-table-column prop="name" label="姓名" align="center" width="120"></el-table-column>

                <el-table-column prop="level" label="会员等级" align="center" width="200"></el-table-column>

                <el-table-column prop="account" label="会员账号" align="center" width="200"></el-table-column>

                <el-table-column prop="password" label="会员密码" align="center" width="200"></el-table-column>

                <el-table-column prop="phone" label="联系方式" align="center" width="200"></el-table-column>


                <el-table-column prop="status" label="会员状态" align="center" width="120">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status" @change=change(scope.row)>
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column prop="operation" label="操作" align="center">
                    <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>

    export default {
        name: "MemberList",
        data() {
            return {
                dialogFormVisible: false,
                tableData: [{
                    number: 'cy001',
                    name: '王小虎',
                    level: '一级用户',
                    account: 'luohai123',
                    password: '123456',
                    phone: '1521008611',
                    status: true,
                    aa: 'luo',
                    operation: ''
                },{
                    number: 'cy001',
                    name: '王小虎',
                    level: '一级用户',
                    account: 'luohai123',
                    password: '123456',
                    phone: '1521008611',
                    status: false,
                    aa: 'qq',
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
        },
        form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
        formLabelWidth: '320px'


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