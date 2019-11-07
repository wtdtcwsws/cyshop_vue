<template>
    <el-container style="height: 100%">
        <el-header>
            <el-row :gutter="2">
                <el-col :span="2">
                    <img style="width: 120px; height: 56px;" src="../assets/icon.png"/>
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
                                >
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
        <el-container>
            <div>
                <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
                         :router="true"
                         :uniqueOpened="true">

                    <el-menu-item index="home">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>

                    <el-submenu index="" class="title">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">导航一</span>
                        </template>
                        <el-menu-item-group>
                            <span slot="title">分组一</span>
                            <el-menu-item index="userlists">角色列表</el-menu-item>
                            <el-menu-item index="addrole">添加角色</el-menu-item>
                        <el-submenu index="">
                            <span slot="title">选项4</span>
                            <el-menu-item index="404">404</el-menu-item>
                        </el-submenu>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="home">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="table">
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
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
                isCollapse: false,
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
    }

    .title {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-size: 18px;
    }

</style>