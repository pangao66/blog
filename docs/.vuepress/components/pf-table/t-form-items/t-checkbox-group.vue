<template>
  <el-checkbox-group v-bind="{...$attrs,...item.attrs}" v-on="$listeners">
    <el-checkbox label="复选框 A" v-for="opt in item.options" :key="opt.label" :label="opt.label"></el-checkbox>
  </el-checkbox-group>
</template>

<script>
import tFormItemMixin from './t-form-item-mixin'

export default {
  name: 't-checkbox-group',
  mixins: [tFormItemMixin]
}
</script>

<style scoped>

</style>
