<template>
  <el-rate v-bind="{...$attrs,...item.attrs}" v-on="$listeners"></el-rate>
</template>

<script>
import tFormItemMixin from './t-form-item-mixin'

export default {
  name: 't-rate',
  mixins: [tFormItemMixin]
}
</script>

<style scoped>

</style>
