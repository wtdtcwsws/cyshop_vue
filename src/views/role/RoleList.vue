<template>
    <div id="RoleList">
        <!--角色权限列表-->
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    export default {
        name: "RoleList",
        data() {
            return {

            }
        }
    }

    data.put('return {\n' +
        '    tableData: [{\n' +
        '        date: \'2016-05-02\',\n' +
        '        name: \'王小虎\',\n' +
        '        address: \'上海市普陀区金沙江路 1518 弄\'\n' +
        '    }, {\n' +
        '        date: \'2016-05-04\',\n' +
        '        name: \'王小虎\',\n' +
        '        address: \'上海市普陀区金沙江路 1517 弄\'\n' +
        '    }, {\n' +
        '        date: \'2016-05-01\',\n' +
        '        name: \'王小虎\',\n' +
        '        address: \'上海市普陀区金沙江路 1519 弄\'\n' +
        '    }, {\n' +
        '        date: \'2016-05-03\',\n' +
        '        name: \'王小虎\',\n' +
        '        address: \'上海市普陀区金沙江路 1516 弄\'\n' +
        '    }]\n' +
        '}');
</script>

<style scoped>

</style>