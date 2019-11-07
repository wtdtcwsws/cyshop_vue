<!--角色权限列表-->
<template>
	<div id="RoleList">
		<el-container>
			<el-header>
				<el-row>
					<el-col :span="18">
						<h2>角色列表</h2>
					</el-col>
					<el-col :span="6">
						<div style="padding-top: 18px;padding-left: 18px;float: right">
							<el-button type="primary" icon="el-icon-plus" @click="dialogisVisible = true">添加角色</el-button>
						</div>
					</el-col>
				</el-row>
			</el-header>
			<el-main>
				<el-table :data="tableData" style="width: 100%;border-radius: 4px">
					<el-table-column prop="roleName" label="角色名称" width="180">
					</el-table-column>
					<el-table-column prop="description" label="角色说明">
					</el-table-column>
					<el-table-column label="是否启用" width="180" align="center" prop="status">
						<template slot-scope="switchscope">
							<el-switch active-text="启用" inactive-text="停用" active-value="1" inactive-value="0" v-model="tableData[switchscope.$index].status" change="switchChange()">
							</el-switch>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="240" align="center">
						<template slot-scope="scope">
							<el-button-group>
								<el-button type="danger" icon="el-icon-delete" @click="clickss(scope.$index, tableData)">删除</el-button>
								<el-button type="primary" icon="el-icon-edit" @click="clicksd(scope.$index, tableData)">修改</el-button>
							</el-button-group>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
			<el-footer>
			</el-footer>
		</el-container>
		<el-dialog title="警告" :visible.sync="centerDialogVisible" width="20%" center>
			<h3 style="text-align: center">真的要删除吗?<span style="color: #f02d2d;">(此操作无法恢复!)</span></h3>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="danger" @click="doDelete()">确 定</el-button>
			</span>
		</el-dialog>


		<el-dialog title="修改角色" :visible.sync="changedialogVisible" width="50%" :before-close="handleClose" append-to-body>
			<div>
				<el-form :model="tempobj[dotemp]" :rules="rules" label-width="100px">
					<el-form-item label="角色名称" prop="roleName">
						<el-input v-model="tempobj[dotemp].roleName"></el-input>
					</el-form-item>

					<el-form-item label="是否启用">
						<el-switch v-model="tempobj[dotemp].status" active-text="启用" inactive-text="停用" active-value="1" inactive-value="0"></el-switch>
					</el-form-item>

					<div style="text-align: center">
						<p style="text-align: center">角色配权</p>
						<el-transfer style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);text-align: left;
							display: inline-block" v-model="tempobj[dotemp].type" :props="{key: 'value',label: 'desc'}" :data="data" :titles="['所有权限', '拥有权限']">
						</el-transfer>
					</div>
					<br />
					<el-form-item label="角色描述">
						<el-input type="textarea" v-model="tempobj[dotemp].description"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="changedialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm(tempobj[dotemp])">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog
				title="添加角色"
				:visible.sync="dialogisVisible"
				width="50%"
				:before-close="handleClose">

			<el-form :model="tempobj[dotemp]" :rules="rules" label-width="100px">
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="tempobj[dotemp].roleName"></el-input>
				</el-form-item>

				<el-form-item label="是否启用">
					<el-switch v-model="tempobj[dotemp].status" active-text="启用" inactive-text="停用" active-value="1" inactive-value="0"></el-switch>
				</el-form-item>

				<div style="text-align: center">
					<p style="text-align: center">角色配权</p>
					<el-transfer style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);text-align: left;
							display: inline-block" v-model="tempobj[dotemp].type" :props="{key: 'value',label: 'desc'}" :data="data" :titles="['所有权限', '拥有权限']">
					</el-transfer>
				</div>
				<br />
				<el-form-item label="角色描述">
					<el-input type="textarea" :value="tempobj[dotemp].description"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogisVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogisVisible = false">确 定</el-button>
			</span>
		</el-dialog>

	</div>

</template>

<script>
    export default {

        roleName: "RoleList",
        data() {
            return {
                dotemp:0,
                tempobj:[
                    {
                        id: 0,
                        roleName: '',
                        description: '',
                        status: '',
                        type: []
                    }
                ],
                emptytemp:[
                    {
                        id: 0,
                        roleName: '',
                        description: '',
                        status: '',
                        type: []
                    }
                ],
                tableData: [{
                    id: 1,
                    roleName: '超级管理员',
                    description: '该角色拥有最大权限，可以做任何操作',
                    status: '1',
                    type: ['1']
                }, {
                    id: 2,
                    roleName: '商品管理员',
                    description: '该角色可以管理商品相关',
                    status: '1',
                    type: ['1','2']
                }, {
                    id: 3,
                    roleName: '管理员',
                    description: '无',
                    status: '0',
                    type:[]
                }],
                data: [{
                    value: '1',
                    desc: '首页',
                    disable: 'false'
                },
                    {
                        value: '2',
                        desc: '导航',
                        disable: 'true'
                    },
                    {
                        value: '3',
                        desc: '商品管理',
                        disable: 'false'
                    }
                ],
                centerDialogVisible: false,
                dialogisVisible: false,
                changedialogVisible: false,
                rules: {
                    roleName: [{
                        required: true,
                        message: '请输入角色名称',
                        trigger: 'blur'
                    },
                        {
                            min: 2,
                            max: 8,
                            message: '长度在 2 到 12 个字符',
                            trigger: 'blur'
                        }
                    ]
                }
            };
        },
        methods: {
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
            doDelete: function() {
                this.centerDialogVisible = false;
                this.tempobj.splice(this.dotemp,1);
            },
            handleClose(done) {
                done();
            },
            submitForm(formName) {
                console.log(formName.roleName.length);
                if (formName.roleName.length > 12 || formName.roleName.length<2) {
                    console.log("run1")
                } else {
                    console.log("run2")
                    this.tableData[this.dotemp] = this.tempobj;
                    this.dotemp = 0;
                    this.tempobj = this.emptytemp;
                    this.changedialogVisible = false;
                }
            }
        }

    }
</script>

<style scoped>

</style>
