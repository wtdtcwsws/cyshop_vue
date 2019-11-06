<template>
    <el-container>
        <el-header style="background-color: rgb(33, 33, 33)"></el-header>
        <el-container>
            <el-aside style="background-color: rgb(84, 92, 100)">
                <nvabar></nvabar>
            </el-aside>
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
    import nvabar from "@/components/NavMenu"

    export default {
        name: "Main",
        components:{
            nvabar:nvabar
        }
    }
</script>

<style scoped>
    .el-container{
        height: 100%;
    }

</style>