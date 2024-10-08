<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import _ from "lodash";
import { twMerge } from "tailwind-merge";
import { computed,type InputHTMLAttributes, useAttrs, inject } from "vue";
import {type ProvideFormInline } from "./FormInline.vue";
import {type ProvideInputGroup } from "./InputGroup/InputGroup.vue";

interface FormInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  value?: InputHTMLAttributes["value"];
  modelValue?: InputHTMLAttributes["value"];
  formInputSize?: "sm" | "lg";
  rounded?: boolean;
}

interface FormInputEmit {
  (e: "update:modelValue", value: string): void;
}

const props = defineProps<FormInputProps>();
const attrs = useAttrs();
const formInline = inject<ProvideFormInline>("formInline", false);
const inputGroup = inject<ProvideInputGroup>("inputGroup", false);

const computedClass = computed(() =>
  twMerge([
    "disabled:bg-slate-100 disabled:cursor-not-allowed border disabled:dark:bg-darkmode-800/50 !rounded-md bg-white",
    "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50",
    "transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm py-2 px-3 pr-8 h-[38px]",
    formInline && "flex-1",
    props.rounded && "rounded-full",
    formInline && "flex-1",
    inputGroup &&
      "rounded-none [&:not(:first-child)]:border-l-transparent first:rounded-l last:rounded-r z-10",
    typeof attrs.class === "string" && attrs.class,
  ])
);

const emit = defineEmits<FormInputEmit>();

const localValue = computed({
  get() {
    return props.modelValue === undefined ? props.value : props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>

<template>
  <input
    :class="computedClass"
    :type="props.type"
    v-bind="_.omit(attrs, 'class')"
    v-model="localValue"
    :data-maska="props.pattern"
  />
</template>
