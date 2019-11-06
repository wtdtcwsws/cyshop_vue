<template>
    <el-container>
        <el-header class="header" style="background-color: rgb(84, 92, 100)">
            <navigation></navigation>
        </el-header>
        <el-container>
            <el-aside style="background-color: rgb(205, 255, 255)">
                <mvabar></mvabar>
            </el-aside>
            <el-container>
                <el-main>
                    <card></card>
                    <router-view />
                </el-main>
                <el-footer></el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import mvabar from "@/components/MnuBar";
import navigation from "@/components/Navigation";
import card from "@/components/Card";
export default {
    name: "Main",
    components: {
        mvabar: mvabar,
        navigation: navigation,
        card: card
    }
};
</script>

<style scoped>
.el-container {
    height: 100%;
}
.header {
    margin: 0;
    padding: 0;
}
</style>