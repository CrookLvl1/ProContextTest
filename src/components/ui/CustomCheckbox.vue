<template>
  <label class="custom-checkbox-shared custom-checkbox">
    <input
      class="custom-checkbox-shared__input"
      type="checkbox"
      v-model="checkboxChecked"
    />

    <div
      class="custom-checkbox-shared__icon"
      :style="{ minWidth: `${size}px`, minHeight: `${size}px` }"
    >
      <div
        class="custom-mark-shared"
        :class="{ 'custom-mark-shared-active': checkboxChecked }"
      ></div>
    </div>

    <div>{{ label }}</div>
  </label>
</template>

<script setup>
import { defineModel, defineProps } from "vue";

defineProps({
  size: {
    type: Number,
    default: 16,
  },

  label: {
    type: String,
  },
});

const checkboxChecked = defineModel({ type: Boolean, default: false });
</script>

<style lang="scss" scoped>
@import "@/style/ui/CustomCheckboxShared.scss";
@import "@/style/ui/CustomMarkShared.scss";
.custom-checkbox {
  display: flex;
  cursor: pointer;
  width: 100%;
}
</style>
