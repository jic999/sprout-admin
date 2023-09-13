<script setup lang="ts">
import { mapValues, omit } from 'lodash'
import { type FormRules } from 'naive-ui'
import type { SpFormProps } from '@/types'

const props = withDefaults(defineProps<SpFormProps>(), {
  disabled: true,
})

const $form = ref()
const formData = computed({
  get: () => props.modelValue,
  set: val => val,
})

function getFormData() {
  if (props.excludes)
    return omit(formData, props.excludes)
  return formData
}

const rules = computed(() => mapValues(props.items, item => item.rule) as FormRules)

defineExpose({
  validate: () => $form.value?.validate(),
  restore: () => $form.value?.restoreValidation(),
  getFormData,
})
</script>

<template>
  <n-form
    ref="$form"
    :model="formData"
    label-placement="left"
    label-width="auto"
    :disabled="disabled"
    :rules="rules"
    v-bind="props.nAttrs"
  >
    <template v-for="(item, key) in items" :key="key">
      <n-form-item :label="item.label" :path="key" v-bind="item.formItemProps">
        <template v-if="item.type === 'NumberInput'">
          <n-input-number v-model:value="formData[key]" v-bind="item.props" />
        </template>
        <template v-else-if="item.type === 'Input'">
          <n-input
            v-model:value="formData[key]"
            v-bind="item.props"
          />
        </template>
        <template v-else-if="item.type === 'Switch'">
          <n-switch v-model:value="formData[key]" v-bind="item.props" />
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
            :placeholder="`请选择${item.label}`"
            v-bind="item.props"
          />
        </template>
        <template v-else-if="item.type === 'Cascader'">
          <n-cascader
            v-model:value="formData[key]"
            :options="item.options"
            :placeholder="`请选择${item.label}`"
            v-bind="item.props"
          />
        </template>
        <template v-else-if="item.type === 'Upload'">
          <n-upload
            v-model:file-list="formData[key]"
            response-type="json"
            v-bind="item.props"
          />
        </template>
      </n-form-item>
    </template>
  </n-form>
</template>
