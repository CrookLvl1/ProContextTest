<template>
  <button
    class="custom-checkbox-shared custom-button"
    @click.stop="selectAllClickHandler"
  >
    <div
      class="custom-checkbox-shared__icon"
      :style="{ minWidth: `${size}px`, minHeight: `${size}px` }"
    >
      <transition
        :name="checkboxStatus === 'empty' ? null : 'icon'"
        mode="out-in"
      >
        <div
          v-if="checkboxStatus !== 'full'"
          class="custom-button__status"
          :class="{
            'custom-button__status-partial': checkboxStatus === 'partial',
          }"
        ></div>

        <div v-else class="custom-mark-shared custom-mark-shared-active"></div>
      </transition>
    </div>
  </button>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  size: {
    type: Number,
    default: 16,
  },

  label: {
    type: String,
  },

  selectedCount: {
    type: Number,
    required: true,
  },

  itemsCount: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["select-all", "delete-selection"]);

//  checkbox-status: empty | partial | full
const checkboxStatus = computed(() => {
  if (props.selectedCount === props.itemsCount) return "full";

  if (props.selectedCount < props.itemsCount && props.selectedCount > 0)
    return "partial";

  return "empty";
});

const selectAllClickHandler = () => {
  if (checkboxStatus.value === "full") emit("delete-selection");
  else emit("select-all");
};
</script>

<style lang="scss" scoped>
@import "@/style/ui/CustomCheckboxShared.scss";
@import "@/style/ui/CustomMarkShared.scss";
.custom-button {
  background-color: transparent;
  border: none;
  width: fit-content;
  cursor: pointer;

  &__status {
    width: 40%;
    height: 40%;
    background-color: black;
    transform: scale(0);

    &-partial {
      transition: transform 150ms ease-out;

      transform: scale(1);
    }
  }
}

.icon-enter-from,
.icon-leave-to {
  transform: scale(0);
}
.icon-enter-to,
.icon-leave-from {
  transform: scale(1);
}

.icon-enter-active,
.icon-leave-active {
  transition: transform 75ms linear;
}
</style>
