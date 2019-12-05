<template>
  <el-time-select
      v-bind="{...$attrs,...item.attrs}" v-on="$listeners"
  >
  </el-time-select>
</template>

<script>
import tFormItemMixin from './t-form-item-mixin'
export default {
  name: 't-time-picker',
  mixins: [tFormItemMixin]
}
</script>

<style scoped>

</style>
