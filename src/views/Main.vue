<template>
    <el-container>
        <el-header>
            <ul>
                <li style="float: left">
                    <el-image
                            style="width: 120px; height: 30px;"
                            :src="url"
                            :fit="fit"></el-image>
                </li>
                <li style="float: left">
                    <el-radio-group v-model="isCollapse">
                        <el-radio-button :label="false"><i class="el-icon-s-fold"></i></el-radio-button>
                        <el-radio-button :label="true"><i class="el-icon-s-unfold"></i></el-radio-button>
                    </el-radio-group>
                </li>
                <li style="float: right">
                    <headerdown></headerdown>
                </li>
            </ul>
        </el-header>
        <el-container>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">导航一</span>
                        </template>
                        <el-menu-item-group>
                            <span slot="title">分组一</span>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <span slot="title">选项4</span>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>

            <el-container>
                <el-main>
                    <router-view/>
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
                fits:'fix',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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

    ul {
        list-style:none;
        padding-inline-start: 0px;
    }


    li:hover {
        background-color: #337ecc;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>