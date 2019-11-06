<template>
    <div>
        <el-form-item :label=fItem.label >
            <el-radio  :name=fItem.name v-for='(n,i) in items' :key="i" v-model="radio" :label="i">{{n.name}}</el-radio>
        </el-form-item>
    </div>

</template>

<script>
    export default {
        name: "RadioGroup",
        data () {
            return {
                radio: 0
            };
        },
        props:{
            items:Array,
            fItem:{
                type:Object
                ,
                default(){
                    return{
                        name:"name",
                        label:"标签"
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>