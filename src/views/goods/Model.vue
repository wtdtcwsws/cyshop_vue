<template>
    <div>
        <h2>商品模型列表</h2>
        <el-button style="margin-bottom: 5px" type="primary" size="small" @click="addModel"><i class="el-icon-plus"></i> 添加
        </el-button>
        <el-table
                :data="tableData"
                style="width:100%;margin-bottom: 20px;"
                row-key="id"
                border
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
                    prop="id"
                    label="商品模型编号"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="商品模型名称"
            >
            </el-table-column>
            <el-table-column
                    prop="catalog3Name"
                    label="所属分类"
            >
            </el-table-column>
            <el-table-column
                    prop="attri"
                    label="模型属性"
            >
            </el-table-column>


            <el-table-column
                    align="center"
                    label="修改"
            >

                <template v-slot="scope">
                    <el-button style="margin-bottom: 5px" type="primary" size="small" @click="update"><i class="el-icon-plus"></i> 修改
                    </el-button>
                    <el-button type="danger" size="small" @click="deleteModel(scope)"><i class="el-icon-delete"
                                                                                         style="font-weight:bold"></i>删除
                    </el-button>
                </template>


            </el-table-column>
        </el-table>

        <!-- 模型添加模态Form -->
        <el-dialog title="模型添加" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="模型名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" style="width: 90%" ></el-input>
                </el-form-item>
                <el-form-item label="所属分类" :label-width="formLabelWidth">
                        <el-cascader
                                :show-all-levels="false"
                                style="width: 90%"
                                v-model=" value"
                                :options="options"
                                :props="{ expandTrigger: 'hover' }"
                                @change="handleChange"></el-cascader>

                </el-form-item>
                <el-form-item label="属性名" :label-width="formLabelWidth">
                    <el-button type="text" @click="attriFormVisable = true">属性添加</el-button>
                    <br>
                    <el-select v-model="form.attriNames" multiple placeholder="请选择属性">
                        <el-option
                                v-for="item in form.attris"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>{{form.attriNames}}
                </el-form-item>
                <el-form-item label="属性值" :label-width="formLabelWidth">
                    <el-button type="text" @click="valueFormVisable = true">属性值添加</el-button>
                    <br>
                </el-form-item>
                <el-form-item label="属性组合" :label-width="formLabelWidth">
                    <el-input :key="match.value" :value="match.attri+':'+match.value" v-for="match in form.matchs" autocomplete="off" disabled style="width: 90%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addSuccess">确 定</el-button>
            </div>
        </el-dialog>
        <!--属性添加模态框-->
        <el-dialog title="属性添加" :visible.sync="attriFormVisable">
            <el-form :model="attriForm">
                <el-form-item label="属性名" :label-width="formLabelWidth">
                    <el-input v-model="attriForm.attri" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="attriFormVisable = false">取 消</el-button>
                <el-button type="primary" @click="addAttri">确 定</el-button>
            </div>
        </el-dialog>

        <!--属性值添加模态框-->
        <el-dialog title="属性值添加" :visible.sync="valueFormVisable">
            <el-form :model="valueForm">
                <!--使用下拉框展示属性名-->
                <el-form-item label="属性名" :label-width="formLabelWidth">
                    <el-select v-model="valueForm.attri" placeholder="请选择属性名">
                        <el-option
                                v-for="item in form.attris"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="属性值" :label-width="formLabelWidth">
                    <el-input v-model="valueForm.value" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="valueFormVisable = false">取 消</el-button>
                <el-button type="primary" @click="addValue">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    const axios = require('axios');
    export default {
        beforeMount() {
            this.load();
            this.loadCatalog();

        },
        name: "model",
        data() {
            return {
                attriFormVisable: false,
                valueFormVisable: false,
                attriForm: {
                    attri:''
                },
                valueForm: {
                    value:'',
                    attri:''

                },
                options:[],
                value: [],
                tableData: [
                    {
                        "id": '1',
                        "name": "商务笔记本",
                        "catalog": "笔记本",
                        "attri": "内存，CUP，GPU"
                    },
                    {
                        "id": '2',
                        "name": "商务笔记本",
                        "catalog": "笔记本",
                        "attri": "内存，CUP，GPU"
                    },
                    {
                        "id": '3',
                        "name": "商务笔记本",
                        "catalog": "笔记本",
                        "attri": "内存，CUP，GPU"
                    }
                ],
                dialogFormVisible: false,
                // 模态框表单
                form: {
                    name: '',
                    catalog: '',
                    attris: [

                    ],
                    attriNames: [],
                    // 组合
                    matchs: [],
                    value: ''
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
            deleteModel(scope) {
                console.log(scope.row);
                this.$confirm('此操作将永久删除该模型, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delete(scope);
                }).catch(() => {
                    this.cancelMessage('已取消删除');
                });
            },
            addModel() {
                this.form.name='',
                // this.form.attri='',
                this.form.value=''

                this.dialogFormVisible = true;
            },
            addSuccess(){
                let vm = this;
                let name = this.form.name;
                let catalog3 = this.value[2];
                console.log(name);
                console.log(catalog3);
                axios({
                    method: 'post',
                    url: "/api/addSkuModel",
                    responseType: "json",
                    params:{
                        // skuModel:{
                            name:name,
                            catalog3Id:catalog3
                        // }
                    }
                })
                    .then(function (response) {
                        if (response.data == '1') {
                            vm.successMessage('添加成功！');
                            axios({
                                method: 'post',
                                url: "/api/addSkuAttri",
                                responseType: "json",
                                params:{
                                    attris: JSON.stringify(vm.form.attriNames),
                                    matchs: JSON.stringify(vm.form.matchs)
                                }
                            });
                        } else {
                            vm.cancelMessage('添加失败');
                        }


                    })
                this.dialogFormVisible = false;


            },
            cancelAdd(){
                this.dialogFormVisible = false;
                this.cancelMessage('已取消添加');
            },
            handleChange(value){
                console.log(value);
            },
            update() {

            },
            delete(scope) {
                let vm = this;
                let id = scope.row.id;
                axios({
                    method: 'post',
                    url: "/api/deleteSkuModel",
                    responseType: "json",
                    params:{
                        id:id
                    }
                })
                    .then(function (response) {

                        console.log(response.data);
                        if (response.data == '1') {
                            vm.successMessage("删除成功！");
                            vm.load();
                        } else {
                            vm.cancelMessage("删除失败！");
                        }

                    })

            },
            loadCatalog(){
                let vm = this;
                axios({
                    method: 'post',
                    url: "/api/selectCatalog",
                    responseType: "json"
                })
                    .then(function (response) {
                        vm.options = response.data;
                        console.log(response.data);

                    })
            },
            load(){
                let vm = this;
                axios({
                    method: 'post',
                    url: "/api/selectSkuModel",
                    responseType: "json"
                })
                    .then(function (response) {
                        vm.tableData = response.data;
                        console.log(response.data);

                    })
            },
            //添加属性名
            addAttri() {
                //向属性选择下拉框添加属性
                this.form.attris.push({
                    //从二层模态框中获取属性名
                    label: this.attriForm.attri,
                    value: this.attriForm.attri
                });
                //把属性名显示在下拉框中
                this.form.attriNames.push(this.attriForm.attri);
                console.log(this.form.matchs);
                //清除二层模态框中的内容
                this.attriForm.attri = '';
                this.attriFormVisable = false;

            },
            addValue() {
                //属性值与属性组合
                this.form.matchs.push({
                    value:this.valueForm.value,
                    attri:this.valueForm.attri
                });
                this.valueForm.value = '';
                this.valueForm.attri = '';
                this.valueFormVisable = false;
            }


        }
    }
</script>

<style scoped>

</style>