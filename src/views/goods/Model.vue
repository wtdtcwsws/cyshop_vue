<template>
    <div>
        <h2>商品模型列表</h2>
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
                    prop="catalog3"
                    label="所属三级分类"
            >
            </el-table-column>


            <el-table-column
                    align="center"
                    label="修改"
            >
                <template v-slot="scope">
                    <div>

                        <el-button
                            v-model="tableData[scope.$index]"
                            @click="editor"
                        ></el-button>
                    </div>

                </template>

            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    export default {
        name: "model",
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
            addCatalog(){
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