<template xmlns="" xmlns="" xmlns="" xmlns="">
  <el-form :model="form" v-bind="$attrs" v-on="$listeners" ref="form" label-width="120px" label-position="right"
           label-suffix="：" :class="formClass">

    <!--    <t-form-item :form="form" :item="item" v-for="(item,index) in formItems" v-if="!item.type==='row'"-->
    <!--                 :key="index"></t-form-item>-->
    <template v-for="item in formItems">
      <template v-if="item.slot">
        <template v-if="!item.slot.renderFn">
          <slot
              :name="item.slot"
              :item="item"
              :form="form"
              :scope="{form,item}"
          />
        </template>
        <template v-else>
          {{item.slot.renderFn(scope)}}
          <!--            <VNodes :vnodes="col.slot.renderFn(scope)"></VNodes>-->
        </template>
      </template>
      <template v-else>
        <template v-if="item.type&&item.type!=='grid'">
          <el-form-item
              :label="item.label"
              :prop="item.prop"
          >
            <component
                :is="getType(item.type)"
                v-model="form[item.prop]"
                :item="item"
            ></component>
          </el-form-item>
        </template>
        <el-row v-else>
          <el-col v-for="(col,index) in item.columns" :key="index" :span="col.span">
            <el-form-item
                :label="col.label"
                :prop="col.prop"
            >
              <component
                  :is="getType(col.type)"
                  v-model="form[col.prop]"
                  :item="col"
              ></component>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </template>
    <slot name="submit">
      <el-form-item v-if="isSearchForm">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>

<script>

import TFormItem from './t-form-items/t-form-item'
import TInput from './t-form-items/t-input'
import TSelect from './t-form-items/t-select'
import TCheckboxGroup from './t-form-items/t-checkbox-group'
import TDatePicker from './t-form-items/t-date-picker'
import TInputNumber from './t-form-items/t-input-number'
import TRadioGroup from './t-form-items/t-radio-group'
import TRate from './t-form-items/t-rate'
import TSlider from './t-form-items/t-slider'
import TTimePicker from './t-form-items/t-time-picker'

export default {
  name: 't-form',
  components: {
    TTimePicker,
    TSlider,
    TRate,
    TRadioGroup,
    TInputNumber,
    TDatePicker,
    TCheckboxGroup,
    TSelect,
    TInput,
    TFormItem
  },
  props: {
    // formOptions: {
    //   type: Object,
    //   default: () => {}
    // },
    originData: {
      type: Object,
      default: () => {}
    },
    isSearchForm: {
      type: Boolean,
      default: false
    },
    showSubmit: {
      type: Boolean,
      default: false
    },
    formItems: {
      type: Array,
      required: true
    },
    formClass: {
      type: String
    }
  },
  data () {
    return {
      form: {}
    }
  },
  created () {
    if (this.originData && Object.keys(this.originData).length) {
      this.form = { ...this.form, ...this.originData }
    }
  },
  methods: {
    search () {
      this.$emit('search', this.form)
    },
    reset () {
      this.$refs.form.resetFields()
      this.$nextTick(() => {
        this.$emit('reset', this.form)
      })
    },
    async validate () {
      try {
        await this.$refs.form.validate()
        return new Promise((resolve) => {
          resolve({ ...this.form })
        })
      } catch (e) {
        return new Promise((resolve) => {
          resolve(false)
        })
      }
    },
    async submit () {
      let valid = await this.validate()
      return new Promise((resolve, reject) => {
        if (valid) {
          resolve({ ...this.form })
        } else {
          reject('表单校验不通过')
        }
      })
    },
    getType (type) {
      const map = {
        'input': 't-input',
        'select': 't-select',
        'checkbox': 't-checkbox-group',
        'date': 't-date-picker',
        'radio': 't-radio-group',
        'rate': 't-rate',
        'slider': 't-slider',
        'switch': 't-switch',
        'time': 't-time-picker'
      }
      return map[type]
    }
  },
  watch: {
    form: {
      deep: true,
      handler (val) {
        this.$emit('form-change', val)
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
