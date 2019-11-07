<template>

        <div>
            <h2>商品分类列表</h2>
            <el-table
                    :data="tableData"
                    style="width:100%;margin-bottom: 20px;"
                    row-key="id"
                    border
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                        prop="name"
                        label="分类名称"
                        sortable
                       >
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        sortable
                        align="center"
                        >
                </el-table-column>
                <el-table-column
                        prop="level"
                        label="分类级别"
                        sortable
                        align="center"
                >
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template v-slot="scope">
                        <el-button type="primary"  size="small" @click="addCatalog(scope)"><i class="el-icon-plus"></i> 添加</el-button>
                        <el-button type="danger"  size="small" @click="deleteCatalog"><i class="el-icon-delete" style="font-weight:bold"></i>删除</el-button>
                    </template>
                  </el-table-column>
            </el-table>

            <!-- 模态Form -->
            <el-dialog title="分类添加" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="分类级别" :label-width="formLabelWidth" >
                        <el-input v-model="form.level" autocomplete="off" style="width: 90%" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="分类名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelAdd">取 消</el-button>
                    <el-button type="primary" @click="addSuccess">确 定</el-button>
                </div>
            </el-dialog>
        </div>
</template>

<script>
    export default {
        name: "catalog",
        data() {
            return {
                tableData: [
                    {
                        "id":"1",
                        "level":"1",
                        "name":"生鲜",
                        "children":[{
                            "id":"1_1",
                            "level":"2",
                            "name":"水果",
                            "children":[{
                                "id":"1_1_1",
                                "level":"3",
                                "name":"西瓜"
                            },
                                {
                                    "id":"1_1_2",
                                    "level":"3",
                                    "name":"香蕉"
                                }

                            ]
                        }

                        ]
                    },
                    {
                        "id":"2",
                        "level":"1",
                        "name":"电器",
                        "children":[{
                            "id":"2_1",
                            "level":"2",
                            "name":"通讯设备",
                            "children":[{
                                "id":"2_1_1",
                                "level":"3",
                                "name":"智能手机"
                            },
                                {
                                    "id":"2_1_2",
                                    "level":"3",
                                    "name":"老人机"
                                }

                            ]
                        }

                        ]
                    }
                ],
                dialogFormVisible: false,
                form: {
                    parentName: '',
                    level: '',
                    name: '',
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '80px'
            }
        },
        methods: {
            cancelMessage(msg){
                this.$message({
                    type: 'info',
                    message: msg
                });
            },
            successMessage(msg){
                this.$message({
                    type: 'success',
                    message: msg
                });
            },
            deleteCatalog() {
                this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.successMessage('删除成功！');
                }).catch(() => {
                    this.cancelMessage('已取消删除');
                });
            },
            addCatalog(scope){
                let row = scope.row;
                console.log(row);
                let IDs = row.id.split('_');
                //父级分类id
                let parentID = IDs[parseInt(row.level) - 1];

                console.log(parentID);

                if (row.level == '1') {
                    this.form.level='一级分类'
                }else if (row.level == '2') {
                    this.form.level = '二级分类';
                } else {
                    this.form.level = '三级分类';
                }
                // row.level
                // form.level;
                this.dialogFormVisible = true;
            },
            addSuccess(){
                this.dialogFormVisible = false;
                this.successMessage('添加成功！');

            },
            cancelAdd(){
                this.dialogFormVisible = false;
                this.cancelMessage('已取消添加');
            }

        }
    }
</script>

<style scoped>

</style>