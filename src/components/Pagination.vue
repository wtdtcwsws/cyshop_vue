<template>
    <div class="block">
        <!--<span class="demonstration">直接前往</span>-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        data() {
            return {
                currentPage: 1
            };
        },
        props:{
            pageSize:Number,
            total:Number
        }
    }
</script>

<style scoped>

</style>