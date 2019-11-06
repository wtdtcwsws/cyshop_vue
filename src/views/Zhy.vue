<template>
    <div>
        <el-row>
            <checkbox :msg="msg"></checkbox>
        </el-row>
        <el-row>
            <submitbutton :buttonText="buttonText" :targetPage="targetPage"></submitbutton>
        </el-row>
        <el-row>
            <pagination :pageSize="pageSize" :total="total"></pagination>
        </el-row>
        <el-row>
            <detailsbutton></detailsbutton>
        </el-row>
        <el-row>
            <table1 :tableData="tableData"
                    :url="url"
                    :responseType="responseType"
            ></table1>
        </el-row>
    </div>
</template>

<script>

    import checkbox from "@/components/CheckBox";

    import submitbutton from "@/components/SubmitButton";

    import pagination from "@/components/Pagination";

    import detailsbutton from "@/components/DetailsButton";

    import table from "@/components/Table";

    export default {
        name: "Zhy",
        data(){
            return {
                // 复选框的名字
                msg:"复选框",
                // 提交按钮的起名
                buttonText:"提交按钮",
                // 提交按钮跳转的页面的name
                targetPage:"table",
                // 表格的列名数组
                tableData:[{
                    item:'date',
                    name:'日期',
                    static:true
                },{
                    item:'name',
                    name:'姓名',
                    static:false
                },{
                    item:'province',
                    name:'省份',
                    static:false
                },{
                    item:'city',
                    name:'市区',
                    static:false
                },{
                    item:'address',
                    name:'地址',
                    static:false
                },{
                    item:'zip',
                    name:'邮编',
                    static:false
                }],
                // 分页总条数
                total:50,
                // 没页显示的条数
                pageSize:5,
                // 表格数据的目标文件/路径
                url:"tableMessage.json",
                // 接收的表格数据的类型
                responseType:"json"
            }
        },
        components:{
            checkbox:checkbox,
            submitbutton:submitbutton,
            pagination:pagination,
            detailsbutton:detailsbutton,
            table1:table
        }
    }
</script>

<style scoped>

</style>