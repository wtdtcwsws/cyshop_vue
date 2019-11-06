<template>
    <div class="div1">
        <el-menu default-active="2" class="div1" @open="handleOpen" @close="handleClose" background-color="#545c59" text-color="#fff" active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航2</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航3</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1">选项1</el-menu-item>
                    <el-menu-item index="3-2">选项2</el-menu-item>
                    <el-menu-item index="3-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="3-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="3-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航4</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="4-1">选项1</el-menu-item>
                    <el-menu-item index="4-2">选项2</el-menu-item>
                    <el-menu-item index="4-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="4-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="4-4-1">选项4</el-menu-item>
                </el-submenu>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: true
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
};
</script>

<style >
.div1 {
    height: 100%;
}
</style>