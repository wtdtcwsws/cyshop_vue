<template>
    <div>
        <h2>商品列表</h2>
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
                    label="商品编号"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="spuName"
                    label="商品名称"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="catalog3Id"
                    label="所属三级分类"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="spuDescription"
                    label="商品描述"

            >
            </el-table-column>

            <el-table-column
                    align="center"
                    label="热卖"
                    sortable
                    prop="hot"
            >
                <template v-slot="scope">
                        <el-switch
                                @change="changeHot(tableData[scope.$index].hot)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="tableData[scope.$index].hot"
                                active-text="是"
                                inactive-text="否">
                        </el-switch>
                </template>

            </el-table-column>
        </el-table>
        <!-- 模型添加模态Form -->
        <el-dialog title="商品添加" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" style="width: 90%" ></el-input>
                </el-form-item>
                <el-form-item label="选择分类" :label-width="formLabelWidth">
                    <el-cascader
                            :show-all-levels="false"
                            style="width: 90%"
                            v-model=" value"
                            :options="options"
                            :props="{ expandTrigger: 'hover' }"
                            @change="handleChange"></el-cascader>

                </el-form-item>
                <el-form-item label="模型" :label-width="formLabelWidth">
                    <br>
                        <el-select v-model="form.modelId" placeholder="请选择模型" @change="coSku">
                            <el-option
                                    v-for="item in form.models"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                </el-form-item>

                <el-table
                        :data="coskus"
                        style="width:100%;margin-bottom: 20px;"
                        row-key="id"
                        border
                        >
                    <el-table-column
                            prop="id"
                            label="编号"
                            sortable
                    >
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="sku描述"
                            sortable
                    >
                    </el-table-column>
                    <el-table-column
                            prop="stock"
                            label="库存"
                            sortable
                    >
                        <template v-slot="scope">
                            <el-input v-model="coskus[scope.$index].stock"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="价格"

                    >
                        <template v-slot="scope">
                            <el-input v-model="coskus[scope.$index].price"></el-input>
                        </template>
                    </el-table-column>

                </el-table>

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

        name: "list",
        created(){
            this.ajax();
            this.loadCatalog();
            this.load();


        },
        data() {
            return {
                formLabelWidth: '80px',
                dialogFormVisible : false,
                value1: true,
                tableData:[],
                descriptions: [],
                coskus: [],
                td:[],
                value:'',
                options: [],
                catalog: [],
                form:{
                    name: '',
                    models:[],
                    modelId:''


                }
            }
        },
        methods:{
            cancelAdd() {
                this.dialogFormVisible = false;
            },
            addSuccess() {
                let vm = this;
                console.log(this.coskus);
                //组装sku
                let skus = [];
                for(let i = 0;i<vm.coskus.length;i++){
                    let descr = vm.coskus[i].description;
                    let descriptions = "";
                    for(let j = 0;j<descr.length;j++){
                        descriptions = descr[j]+","+descriptions
                    }
                    console.log('descriptions');
                    console.log(descriptions);
                    let sku = {
                        name: vm.form.name,
                        price: vm.coskus[i].price,
                        stock: vm.coskus[i].stock,
                        description: descriptions,
                        modelId: vm.form.modelId
                    };
                    skus.push(sku);
                }
                JSON.stringify(skus);
                let spu = {
                    catalog1Id: vm.catalog[0],
                    catalog2Id: vm.catalog[1],
                    catalog3Id: vm.catalog[2],
                    spuName: vm.form.name,
                    spuDescription: vm.form.name,
                    hot:0
                };
                axios({
                    method: 'post',
                    url: "/api/addSkus",
                    responseType: "json",
                    params:{
                        spu:JSON.stringify(spu),
                        sku:JSON.stringify(skus)
                    }
                }).then(function (response) {
                    console.log(response.data);


                })
                this.dialogFormVisible = false;
            },
            ajax(){
                let vm = this;
                axios.get('/api/getGoods')
                .then(function (response) {
                    console.log(response);

                    vm.tableData= response.data;
                })},
            changeHot(hot) {
                console.log(hot);
            },
            handleChange(value){
                this.catalog = value;
                console.log(value);
            },
            load(){
                let vm = this;
                axios({
                    method: 'post',
                    url: "/api/selectSkuModel",
                    responseType: "json"
                })
                    .then(function (response) {
                        vm.form.models = response.data;
                        console.log(response.data);

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
            addModel() {

                this.dialogFormVisible = true;
            }, coSku() {
                console.log(this.form.modelId);
                let vm = this;
                axios({
                    method: 'post',
                    url: "/api/getSkusListByModelId",
                    responseType: "json",
                    params:{
                        modelId:vm.form.modelId
                    }
                })
                    .then(function (response) {
                        vm.descriptions = response.data;
                        for (let num =0; num<vm.descriptions.length; num++) {
                            vm.coskus.push({
                                id:num+1,
                                description: vm.descriptions[num],
                                stock:'',
                                price:''
                            });

                        }
                        console.log(response.data);

                    })


            }
        }
    };
</script>

<style scoped>

</style>