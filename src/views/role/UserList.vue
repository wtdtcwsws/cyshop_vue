<!--管理员列表-->
<template>

    <div id="UserList">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="18">
                        <h2>管理员列表</h2>
                    </el-col>
                    <el-col :span="6">
                        <div style="padding-top: 18px;padding-left: 18px;float: right">
                            <el-button type="primary" icon="el-icon-plus" @click="dialogisVisible = true">添加管理员</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-table :data="tableData" style="width: 100%;border-radius: 4px">
                    <el-table-column
                            prop="id"
                            label="id"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="管理员账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="role"
                            label="角色组"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="resc"
                            label="备注">
                    </el-table-column>
                    <el-table-column label="是否启用" width="180" align="center" prop="status">
                        <template slot-scope="switchscope">
                            <el-switch active-text="启用" inactive-text="停用" active-value="1" inactive-value="0"
                                       v-model="tableData[switchscope.$index].status" change="switchChange()" :disabled="tableData[switchscope.$index].disabled">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="240" align="center">
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button type="danger" icon="el-icon-delete" :disabled="tableData[scope.$index].disabled" @click="clickss(scope.$index, tableData)">删除</el-button>
                                <el-button type="primary" icon="el-icon-edit" @click="clicksd(scope.$index, tableData)">修改</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>

        </el-container>


        <el-dialog title="警告" :visible.sync="centerDialogVisible" width="20%" center>
            <h3 style="text-align: center">真的要删除吗?<span style="color: #f02d2d;">(此操作无法恢复!)</span></h3>
            <span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="danger" @click="doDelete()">确 定</el-button>
			</span>
        </el-dialog>

            <el-dialog
                title="添加管理员"
                :visible.sync="dialogisVisible"
                width="50%"
                :before-close="handleClose">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="管理员名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色组" prop="role">
                    <el-select v-model="ruleForm.role" placeholder="请选择角色组">
                        <el-option label="商品管理员" value="1"></el-option>
                        <el-option label="订单管理员" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="是否启用" prop="status">
                    <el-switch v-model="ruleForm.status" active-text="启用" inactive-text="停用" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>

                <el-form-item label="备注" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.resc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            </el-dialog>


            <el-dialog
                    title="修改信息"
                    :visible.sync="changedialogVisible"
                    width="50%"
                    :before-close="handleClose">

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账户名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色组" prop="role">
                        <el-select v-model="ruleForm.role" placeholder="请选择角色组">
                            <el-option label="商品管理员" value="1"></el-option>
                            <el-option label="订单管理员" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="备注" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>

        </el-dialog>

    </div>

</template>

<script>
    export default {
        name:'UserList',
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                dotemp:0,
                tempobj:[
                    {
                        id: 0,
                        name: '',
                        resc: '',
                        role:'',
                        status: '',
                        disabled:false
                    }
                ],
                emptytemp:[
                    {
                        id: 1,
                        name: '',
                        role:'',
                        resc: '',
                        status: '',
                        disabled:false
                    }
                ],
                tableData: [{
                    id: 1,
                    name:'root',
                    role: '系统管理员',
                    resc: '系统默认管理员不可删除和停用',
                    status: '1',
                    disabled:true
                }],
                centerDialogVisible:false,
                dialogisVisible:false,
                changedialogVisible:false,
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    id:0 ,
                    name: '',
                    role: '',
                    status:'0',
                    delivery: false,
                    resc: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入管理员名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 2 到 12 个字符', trigger: 'blur'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请给管理员分配权限', trigger: 'change'}
                    ],
                    role: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };

        },
        methods:{
            doDelete: function() {
                console.log(this);
                this.centerDialogVisible = false;
                this.tempobj.splice(this.dotemp,1);
            },
            clickss:function(index, rows) {
                this.centerDialogVisible = true;
                this.dotemp = index;
                this.tempobj = rows;
            },
            clicksd:function(index, rows) {
                this.changedialogVisible = true;
                this.dotemp = index;
                this.tempobj = JSON.parse(JSON.stringify(rows));
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleClose(done) {
                done();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }

    }
</script>

<style scoped>

</style>
