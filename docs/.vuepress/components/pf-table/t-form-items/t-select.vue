<template>
  <el-select v-bind="{...$attrs,...item.attrs}" v-on="$listeners" clearable filterable default-first-option>
    <el-option v-for="opt in item.options" :label="opt.label" :value="opt.value" :key="opt.value"></el-option>
  </el-select>
</template>

<script>
import tFormItemMixin from './t-form-item-mixin'

export default {
  name: 't-select',
  mixins: [tFormItemMixin]
}
</script>

<style scoped>

</style>
