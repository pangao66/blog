<template>
  <el-date-picker
      v-bind="{...$attrs,...item.attrs}" v-on="$listeners"
      clearable
  >
  </el-date-picker>
</template>

<script>
import tFormItemMixin from './t-form-item-mixin'

export default {
  name: 't-date-picker',
  mixins: [tFormItemMixin]
}
</script>

<style scoped>

</style>
