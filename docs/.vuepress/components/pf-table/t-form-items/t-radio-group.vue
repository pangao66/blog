<template>
  <el-radio-group v-bind="{...$attrs,...item.attrs}" v-on="$listeners">
    <el-radio-button
        v-if="item.attrs.type='btn'"
        v-for="opt in  item.opts"
        :label="opt.label"
        :key="opt.label"
    >
    </el-radio-button>
    <el-radio v-else v-for="opt in  item.opts" :label="opt.label" :key="opt.label"></el-radio>
  </el-radio-group>
</template>

<script>
import tFormItemMixin from './t-form-item-mixin'

export default {
  name: 't-radio-group',
  mixins: [tFormItemMixin]
}
</script>

<style scoped>

</style>
