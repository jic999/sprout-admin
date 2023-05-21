<script setup lang="ts">
import _ from 'lodash'
import type { FormRules } from 'naive-ui'
import type { PropType } from 'vue'
import type { SmartFormItem } from '@/types'

const props = defineProps({
  formItems: {
    type: Object as PropType<SmartFormItem>,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  excludes: {
    type: Array as PropType<string[]>,
    default: undefined,
  },
})

const formRef = ref()
const formData = computed({
  get: () => props.modelValue,
  set: val => val,
})

function getFormData() {
  if (props.excludes)
    return _.omit(formData, props.excludes)
  return formData
}

const rules = computed<FormRules>(() => _.mapValues(props.formItems, item => item.rule))

defineExpose({
  validate: () => formRef.value?.validate(),
  restore: () => formRef.value?.restoreValidation(),
  getFormData,
})

console.log('formData.value :>> ', formData.value)
</script>

<template>
  <n-form
    ref="formRef"
    :model="formData"
    label-placement="left"
    label-width="auto"
    :disabled="disabled"
    :rules="rules"
  >
    <template v-for="(item, key) in formItems" :key="key">
      <n-form-item :label="item.label" :path="key" v-bind="item.formItemAttrs">
        <template v-if="item.type === 'NumberInput'">
          <n-input-number
            v-model:value="formData[key]"
            :placeholder="`请输入${item.label}`"
            v-bind="item.attrs"
          />
        </template>
        <template v-else-if="item.type === 'Input'">
          <n-input
            v-model:value="formData[key]"
            :placeholder="`请输入${item.label}`"
            v-bind="item.attrs"
          />
        </template>
        <template v-else-if="item.type === 'Switch'">
          <n-switch v-model:value="formData[key]" v-bind="item.attrs" />
        </template>
        <template v-else-if="item.type === 'Radio'">
          <n-radio-group v-model:value="formData[key]" name="radiogroup">
            <n-space>
              <n-radio
                v-for="option in item.options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </template>
        <template v-else-if="item.type === 'Checkbox'">
          <n-space item-style="display: flex;">
            <n-checkbox
              v-for="(option, i) in item.options"
              :key="option"
              v-model:checked="formData[key][i]"
              :label="option"
            />
          </n-space>
        </template>
        <template v-else-if="item.type === 'CheckboxGroup'">
          <n-checkbox-group v-model:value="formData[key]">
            <n-space item-style="display: flex;">
              <n-checkbox
                v-for="option in item.options"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </n-space>
          </n-checkbox-group>
        </template>
        <template v-else-if="item.type === 'Select'">
          <n-select
            v-model:value="formData[key]"
            :options="item.options"
            v-bind="item.attrs"
          />
        </template>
        <template v-else-if="item.type === 'Cascader'">
          <n-cascader
            v-model:value="formData[key]"
            :options="item.options"
            children-field="options"
            v-bind="item.attrs"
          />
        </template>
        <template v-else-if="item.type === 'Upload'">
          <n-upload
            v-model:file-list="formData[key]"
            response-type="json"
            v-bind="item.attrs"
          />
        </template>
      </n-form-item>
    </template>
  </n-form>
</template>
