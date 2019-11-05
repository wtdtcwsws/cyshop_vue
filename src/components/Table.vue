<template>
    <el-table
        :data="employees"
        border
        style="max-width: 1000px">
        <!--<el-table-column-->
                <!--type="selection"-->
                <!--width="55">-->
        <!--</el-table-column>-->
        <!--<template v-for='(col) in tableData'>-->
        <el-table-column
                v-for='(col) in tableData'
                sortable
                v-if="col.static==true"
                :prop="col.item"
                :label="col.name"
                :key="col.item"
                width="140">
        </el-table-column>
        <el-table-column
                v-for='(col) in tableData'
                v-if="col.static==false"
                :prop="col.item"
                :label="col.name"
                :key="col.item"
                width="140">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button
                        @click.native.prevent="deleteRow(scope.$index, employees)"
                        type="text"
                        size="small">
                    移除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "Table",
        data(){
            return{
                employees:[]
            }
        },
        props:{
            tableData:Array,
            url:String,
            responseType:String
        },
        mounted(){
            this.ajax();
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'ajax'
        },
        methods: {
            handleClick(row) {
                console.log(row);
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            }
            ,ajax(){
                let vm = this;
                axios({method:'get',url:this.url,responseType:this.responseType}).then(
                    function (resule) {
                        // console.log(resule.data.rows);
                        vm.employees = resule.data.rows;
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>