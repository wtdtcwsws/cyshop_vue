<template>
    <div>
        <!--查询部分-->
        <el-row class="top-row" >
            <el-col :span="6" >
                <el-col :span="17">
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="4" :offset="2">
                    <el-button icon="el-icon-search" circle></el-button>
                </el-col>
            </el-col>
            <el-col :span="3" :offset="14">
                <!--新增会员按钮-->
                <el-button type="primary" icon="el-icon-plus" class="add-button" @click="dialogFormVisible = true" close-on-click-modal="false">新增等级</el-button>

                <!--新增会员模态框内容-->
                <el-dialog title="新增会员等级" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
                    <el-form :model="form" >
                        <el-col :span="22" :offset="5">
                            <el-form-item label="会员等级">
                                <el-input class="modal-input"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="22" :offset="5">
                            <el-form-item label="等级折扣">
                                <el-input class="modal-input"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="22" :offset="5">
                            <el-form-item label="等级名称">
                                <el-input class="modal-input"></el-input>
                            </el-form-item>
                        </el-col>
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

            <el-table-column prop="level" label="等级" align="center"></el-table-column>

            <el-table-column prop="name" label="等级名称"  align="center"></el-table-column>

            <el-table-column prop="discount" label="等级折扣" align="center"></el-table-column>

            <el-table-column prop="number" label="拥有会员" align="center"></el-table-column>

            <el-table-column prop="operation" label="操作" align="center">
                <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "MemberLevel",
        data() {
            return {
                dialogFormVisible: false,
                tableData: [{
                    level: '0',
                    discount: '没有折扣',
                    name: '普通用户',
                    number: '12'
                },{
                    level: '1',
                    discount: '九折',
                    name: '一级用户',
                    number: '12'
                }]
            }
        },
        methods:{

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