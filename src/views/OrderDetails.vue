<template>
    <el-row>
        <el-col :span="22" :offset="1">
            <el-row>
                    <h3>订单信息</h3>
                    <el-row>
                        <el-col :span="8">
                            <label style="color: darkgray">买家账号：</label><label></label>
                        </el-col>
                        <el-col :span="8">
                            <label style="color: darkgray">电话号码：</label><label></label>
                        </el-col>
                        <el-col :span="8">
                            <label style="color: darkgray">应付金额：</label><label></label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <label style="color: darkgray">订单状态：</label><label></label>
                        </el-col>
                        <el-col :span="8">
                            <label style="color: darkgray">下单时间：</label><label></label>
                        </el-col>
                        <el-col :span="8">
                            <label style="color: darkgray">支付时间：</label><label></label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <label style="color: darkgray">支付方式：</label><label></label>
                        </el-col>
                        <el-col :span="8">
                            <label style="color: darkgray">发票抬头：</label><label>个人</label>
                        </el-col>
                    </el-row>
                    <br>
                    <hr>
            </el-row>
            <el-row>
                    <h3>收货信息</h3>
                    <el-row>
                        <el-col :span="8">
                            <label style="color: darkgray">收货人：</label><label></label>
                        </el-col>
                        <el-col :span="8">
                            <label style="color: darkgray">联系电话：</label><label></label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <label style="color: darkgray">收货地址：</label><label></label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <label style="color: darkgray">邮编：</label><label></label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <label style="color: darkgray">留言：</label><label></label>
                        </el-col>
                    </el-row>
                    <br>
                    <hr>
            </el-row>
            <el-row>

            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "OrderDetails"
    }
</script>

<style scoped>

</style>