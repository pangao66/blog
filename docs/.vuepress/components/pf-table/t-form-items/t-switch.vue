<template>
  <el-switch v-bind="{...$attrs,...item.attrs}" v-on="$listeners"></el-switch>
</template>

<script>
import tFormItemMixin from './t-form-item-mixin'
export default {
  name: 't-switch',
  mixins: [tFormItemMixin]
}
</script>

<style scoped>

</style>
