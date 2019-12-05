<template>
  <el-input-number v-bind="{...$attrs,...item.attrs}" v-on="$listeners"></el-input-number>
</template>

<script>
import tFormItemMixin from './t-form-item-mixin'
export default {
  name: 't-input-number',
  mixins: [tFormItemMixin]
}
</script>

<style scoped>

</style>
