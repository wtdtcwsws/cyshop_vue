<template>
    <el-container style="height: 100%;">
        <el-header style="">
            <el-row :gutter="2" >
                <el-col :span="2">
                    <el-image
                            style="width: 120px; height: 60px;"
                            :src="url"
                            :fit="fit"></el-image>
                </el-col>

                <el-col :span="2">
                    <div style="padding-top: 10px">
                        <el-radio-group v-model="isCollapse">
                            <el-radio-button :label="false"><i class="el-icon-s-fold"></i></el-radio-button>
                            <el-radio-button :label="true"><i class="el-icon-s-unfold"></i></el-radio-button>
                        </el-radio-group>
                    </div>
                </el-col>

                <el-col :span="6">
                    <div style="padding-top: 10px">
                        <el-input
                                placeholder="请输入内容"
                                prefix-icon="el-icon-search"
                                v-model="input2">
                        </el-input>
                    </div>
                </el-col>

                <el-col :span="12">
                    <div style="padding-top: 14px;float: right" >
                        xxxx早上好！今日天气：
                    </div>
                </el-col>

                <el-col :span="2">
                    <headerdown></headerdown>
                </el-col>
            </el-row>
        </el-header>
        <el-container >
            <!--最底色-->
            <div class="nav_bg" style="background-color: rgba(53,73,94,0.9);z-index: 1 " >
                <el-menu default-active="1-1" class="el-menu-vertical-demo " @open="handleOpen" @close="handleClose" :collapse="isCollapse"
                         :router="true"
                         active-text-color="red"



                         :uniqueOpened="true" style="">



                    <!--主页-->
                    <el-menu-item index="/home" style="background-color: rgba(5,5,5,0.5)">
                        <i class="el-icon-s-home" style="color: white"></i>
                        <span slot="title" class="title_w">主页</span>
                    </el-menu-item>

                    <!--商品-->
                    <el-submenu index="1" style="background-color: rgba(53,73,94,1)"  >
                        <template slot="title" >
                            <i class="el-icon-s-goods" style="color:white"></i>
                            <span slot="title" style="color:white">商品管理</span>
                        </template>
                        <el-menu-item-group >
                            <!--<span slot="title">分组一</span>-->
                            <el-menu-item  index="/goods/Catalog" class="item_margin"><i class="el-icon-paperclip"></i>商品分类</el-menu-item>
                            <el-menu-item index="/goods/CommodityStore" class="item_margin"><i class="el-icon-paperclip"></i>商品店铺</el-menu-item>
                            <el-menu-item index="/goods/List" class="item_margin"><i class="el-icon-paperclip"></i>商品列表</el-menu-item>
                            <el-menu-item index="/goods/Model" class="item_margin"><i class="el-icon-paperclip"></i>商品模型</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <!--用户-->
                    <el-submenu index="2" style="background-color:rgba(53,73,94,1);">
                        <template slot="title">
                            <i class="el-icon-user-solid" style="color:white"></i>
                            <span slot="title" style="color: white">用户</span>
                        </template>
                        <el-menu-item-group>
                            <!--<span slot="title">分组一</span>-->
                            <el-menu-item index="/member/MemberLevel" class="item_margin"><i class="el-icon-paperclip"></i>用户等级</el-menu-item>
                            <el-menu-item index="/member/MemberList" class="item_margin"><i class="el-icon-paperclip"></i>用户列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <!--订单-->
                    <el-submenu index="3" style="background-color: rgba(53,73,94,1)">
                        <template slot="title">
                            <i class="el-icon-s-order" style="color: white"></i>
                            <span slot="title" class="title_w">订单</span>
                        </template>
                        <el-menu-item-group>
                            <!--<span slot="title">分组一</span>-->
                            <el-menu-item index="/orders/OrderDetails" class="item_margin"><i class="el-icon-paperclip"></i>订单详情</el-menu-item>
                            <el-menu-item index="/orders/OrderList" class="item_margin"><i class="el-icon-paperclip"></i>订单列表</el-menu-item>
                            <el-menu-item index="/orders/RefunDetails" class="item_margin"><i class="el-icon-paperclip"></i>退换货详情</el-menu-item>
                            <el-menu-item index="/orders/RefundList" class="item_margin"><i class="el-icon-paperclip"></i>退换货订单</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>


                    <!--评论管理-->
                    <el-menu-item index="/comment"  style="background-color: rgba(53,73,94,1)">

                             <i class="el-icon-s-comment" style="color: white"></i>
                        <span slot="title" class="title_w">评论管理</span>


                    </el-menu-item>



                    <!--灰色-->
                    <!--<el-menu-item index="home" disabled>-->
                        <!--<i class="el-icon-document"></i>-->
                        <!--<span slot="title">灰色区域</span>-->
                    <!--</el-menu-item>-->

                    <el-menu-item index="setting"  style="background-color: rgba(5,5,5,0.5)">
                        <i class="el-icon-setting" style="color: white"></i>
                        <span slot="title" class="title_w">设置</span>
                    </el-menu-item>

                </el-menu>
            </div>

            <el-container>
                <el-main>
                    <el-row :gutter="24">
                        <el-col :span="22" :offset="1"><router-view/></el-col>
                    </el-row>
                </el-main>
                <el-footer></el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import headerdown from "@/components/layout/header.vue"

    export default {
        name: "Main",
        components:{
            headerdown
        },
        data() {
            return {
                isCollapse: true,
                input2:"",
                url:"",
                fit:""
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .el-header,
    .el-footer {
        background-color: #409EFF;
        border-radius: 4px;
        color: #FFFFFF;
    }

    .el-main {
        background: #D9ECFF;
        color: #303133;
        border-radius: 4px;
    }


    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
        background-color:rgba(95,158,160,0.05);
    }
    .item_margin{
        margin-left: 0px;
        /*background-color:rgba(95,158,160,0.1);*/
        /*background-color: rgba(95,158,160,0.3);*/
        background-color: rgba(40,50,59,1);

        color: white;
    }

    .nav_bg{
        /*background-color:rgba(95,158,160,0.3);*/
        /*background-color: white;*/
        /*color: white;*/
    }
    .title_w{
        color: white;
    }

    /*环扣图标设置*/
    .el-icon-paperclip{
        /*background-color: white;*/
        color: white;

    }
    .el-menu-vertical-demo el-menu{

    }


</style>