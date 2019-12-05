<template>
  <el-dialog
      :title="title"
      visible
      center
      v-on="$listeners"
      v-bind="dialogConfig"
      :close-on-click-modal="false"
      :append-to-body="$attrs['append-to-body']"
      :close-on-press-escape="false"
      :custom-class="customClass"
  >
    <t-form v-bind="$attrs" :form-items="formItems" ref="form">
      <template v-for="slot in formSlots" :slot="slot" slot-scope="{ item ,form}">
        <slot :name="item.slot" :form="form" :item="item"></slot>
      </template>
    </t-form>
    <slot name="footer" slot="footer">
      <div class="dialog-footer">
        <el-button @click="$emit('close')">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
import TForm from './t-form'

export default {
  name: 't-dialog-form',
  props: {
    title: {
      type: String
    },
    dialogConfig: {
      type: Object,
      default: () => {}
    },
    formItems: {
      type: Array,
      default: () => []
    },
    customClass: {
      type: String
    }
  },
  methods: {
    async confirm () {
      let res = await this.$refs.form.validate()
      if (res) {
        this.$emit('confirm', res)
      }
    }
  },
  computed: {
    formSlots () {
      const formItems = this.formItems
      let list = []
      formItems.forEach((item) => {
        if (item.slot) {
          list.push(item.slot)
        }
      })
      return list
    }
  },
  components: { TForm }
}
</script>

<style scoped>

</style>
