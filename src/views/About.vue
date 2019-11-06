<template>
  <div class="about">
    <el-switch v-model="value1"></el-switch>

  </div>
</template>

<script>

    export default {
        name: 'About',
        data() {
            return {
                value1: true,

            }
        }
    }
</script>
