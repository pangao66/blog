<template>
  <el-input v-bind="{...$attrs,...item.attrs}" v-on="$listeners" clearable/>
</template>

<script>
import tFormItemMixin from './t-form-item-mixin'
export default {
  name: 't-input',
  mixins: [tFormItemMixin]
}
</script>

<style scoped>

</style>
