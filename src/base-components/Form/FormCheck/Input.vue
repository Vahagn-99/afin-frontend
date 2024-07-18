<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import _ from "lodash";
import { twMerge } from "tailwind-merge";
import { computed,type InputHTMLAttributes, useAttrs } from "vue";

interface InputProps extends /* @vue-ignore */ InputHTMLAttributes {
  modelValue?: InputHTMLAttributes["value"];
  type: "radio" | "checkbox";
}

interface InputEmit {
  (e: "update:modelValue", value: string): void;
}

const props = defineProps<InputProps>();

const attrs = useAttrs();

const computedClass = computed(() =>
  twMerge([
    // Default
    "transition-all duration-100 ease-in-out",

    // Input type radio
    props.type == "radio" &&
      "shadow-sm border-slate-200 cursor-pointer  dark:bg-darkmode-800 dark:border-transparent",

    // Input type checkbox
    props.type == "checkbox" &&
      "shadow-sm border-slate-200 cursor-pointer rounded  dark:bg-darkmode-800 dark:border-transparent",

    // On checked
    "[&[type='radio']]:checked:bg-[#2a7cef] [&[type='radio']]:checked:border-primary [&[type='radio']]:checked:border-opacity-10",
    "[&[type='checkbox']]:checked:bg-[#2a7cef] [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10",

    // On checked and not disabled
    "[&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:dark:bg-darkmode-800/50",

    // On checked and disabled
    "[&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:dark:bg-darkmode-800/50",

    typeof attrs.class === "string" && attrs.class,
  ])
);

const emit = defineEmits<InputEmit>();

const localValue = computed({
  get() {
    return props.modelValue;
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
    style="box-shadow: none!important;"
  />
</template>
