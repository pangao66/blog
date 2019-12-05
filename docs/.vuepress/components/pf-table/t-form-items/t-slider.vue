<template>
  <el-slider v-bind="{...$attrs,...item.attrs}" v-on="$listeners">

  </el-slider>
</template>

<script>
import tFormItemMixin from './t-form-item-mixin'

export default {
  name: 't-slider',
  mixins: [tFormItemMixin]
}
</script>

<style scoped>

</style>
