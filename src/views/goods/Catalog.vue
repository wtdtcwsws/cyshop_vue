<template>

        <div>
            <h2>商品分类列表</h2>
            <el-table
                    :data="tableData"
                    style="width:100%;margin-bottom: 20px;"
                    row-key="name"
                    border
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                        prop="name"
                        label="分类名称"
                        sortable
                >
                </el-table-column>

                <!--<el-table-column-->
                        <!--prop="id"-->
                        <!--label="编号"-->
                        <!--sortable-->
                <!--&gt;-->
                <!--</el-table-column>-->

                <el-table-column
                        prop="level"
                        label="分类级别"
                        sortable
                        align="center"
                >
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template v-slot="scope">
                        <el-button v-if="scope.row.level != '三级分类'" type="primary"  size="small" @click="addChildCatalog(scope)"><i class="el-icon-plus"></i> 添加子分类</el-button>
                        <el-button type="primary"  size="small" @click="addCatalog(scope)"><i class="el-icon-plus"></i> 添加</el-button>
                        <el-button type="danger"  size="small" @click="deleteCatalog(scope)"><i class="el-icon-delete" style="font-weight:bold"></i>删除</el-button>
                    </template>
                  </el-table-column>
            </el-table>

            <!-- 分类添加模态Form -->
            <el-dialog title="分类添加" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="分类级别" :label-width="formLabelWidth" >
                        <el-input v-model="form.level" autocomplete="off" style="width: 90%" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="上级分类" :label-width="formLabelWidth">
                        <el-input v-model="form.parentName" autocomplete="off" style="width: 90%"
                                  :disabled="true"></el-input>
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
    const axios = require('axios');
    export default {
        beforeMount() {
            this.load();
        },

        name: "catalog",
        data() {
            return {
                tableData: [],
                dialogFormVisible: false,
                form: {
                    parentName: '',
                    level: '',
                    name: '',
                    pid: null,
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
            deleteCatalog(scope) {
                let id = scope.row.id;
                let level = scope.row.level;

                this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(id);
                    console.log(level);
                    this.delete(id,level);

                    this.successMessage('删除成功！');
                }).catch(() => {
                    this.cancelMessage('已取消删除');
                });
            },
            // 点击添加后的模态框
            addCatalog(scope){
                let vm = this;
                let row = scope.row;
                let pid = row.pid;
                let level = row.level;
                console.log(row);
                if (pid) {
                    if (level == '二级分类') {
                        for (let c of vm.tableData) {
                            if (c.id == pid && c.level == '一级分类') {
                                this.form.parentName = c.name;
                                break;
                            }
                        }
                    } else {
                        for (let c of vm.tableData) {
                            for (let c2 of c.children) {
                                if (c2.id == pid && c2.level == '二级分类') {
                                    this.form.parentName = c2.name;
                                    break;
                                }
                            }

                        }
                    }
                } else {
                    this.form.parentName = '以为最高级分类，无上级分类'
                }

                this.form.level = row.level;
                this.form.pid = row.pid;

                this.dialogFormVisible = true;
            },
            // 点击添加子分类后的模态框
            addChildCatalog(scope){
                let row = scope.row;
                let pid = row.id;
                let level = row.level;
                console.log(row);
                if (level == '一级分类') {
                    this.form.level = '二级分类';
                }else if (level == '二级分类') {
                    this.form.level = '三级分类';
                } else {
                    this.form.level ='该分类不可添加子分类'
                }

                this.form.parentName = row.name;

                this.form.pid = pid;

                this.dialogFormVisible = true;
            },
            addSuccess(){
                let vm = this;
                let level = this.form.level;
                let name = this.form.name;
                let pid = this.form.pid;
                let isExist = false;
                if (this.form.pid) {
                    //如果添加二级分类
                    if (this.form.level == '二级分类') {
                        for (let c of this.tableData) {
                            for (let c2 of c.children) {
                                if (c2.name == this.form.name) {
                                    isExist = true;
                                    break;
                                }
                            }
                            if (isExist) {
                                break;
                            }
                        }
                    }//如果添加三级分类
                    else {
                        for (let c of this.tableData) {
                            for (let c2 of c.children) {
                                for (let c3 of c2.children) {
                                    if (c3.name == this.form.name) {
                                        isExist = true;
                                        break;
                                    }
                                }
                                if (isExist) {
                                    break;
                                }
                            }
                            if (isExist) {
                                break;
                            }
                        }
                    }
                } else {
                    for (let c of vm.tableData) {
                        //没有父级id为一级菜单
                        level = '一级分类';
                        name = this.form.name;
                        pid = null;
                        if (c.name == this.form.name) {
                            isExist = true;
                            break;
                        }
                    }

                }


                if (isExist) {
                    this.cancelMessage('该分类已存在，添加失败！');

                } else {
                    //执行异步添加
                    this.add(level, name, pid);
                    this.successMessage('添加成功！');
                }
                this.form.name = '';
                this.dialogFormVisible = false;

            },
            cancelAdd(){
                this.dialogFormVisible = false;
                this.cancelMessage('已取消添加');
            },
            load() {
                let vm = this;
                axios({
                    method: 'post',
                    url: "/api/getCatalog",
                    responseType: "json"
                })
                    .then(function (response) {
                        vm.tableData = response.data;
                        console.log(response.data);

                    })
            },
            add(level, name, pid) {
                let vm = this;
                axios({
                    method: 'post',
                    url: "/api/addCatalog",
                    responseType: "json",
                    params: {
                        level: level,
                        name: name,
                        pid: pid
                    }
                })
                    .then(function (response) {
                        vm.load();
                        console.log(response.data);

                    })
            },
            delete( id,level) {
                let vm = this;
                axios({
                    method: 'post',
                    url: "/api/deleteCatalog",
                    responseType: "json",
                    params: {
                        level: level,
                        id: id
                    }
                })
                    .then(function (response) {
                        vm.load();
                        console.log(response.data);

                    })
            }

        }
    }
</script>

<style scoped>

</style>