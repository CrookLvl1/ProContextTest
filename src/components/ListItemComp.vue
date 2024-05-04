<template>
  <div class="list-item">
    <CustomCheckbox :label="label" v-model="selected" />

    <div class="list-item__inputs">
      <label class="list-item__count-input">
        <input
          type="number"
          @beforeinput="beforeInputValidate"
          @input="inputValidate"
          v-model="count"
        />
      </label>
      <label class="list-item__color-input">
        <input type="color" v-model.lazy="color" />
        <div
          class="list-item__color-current"
          :style="{ backgroundColor: color }"
        ></div>
      </label>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineModel } from "vue";
import CustomCheckbox from "./ui/CustomCheckbox.vue";

defineProps({
  label: {
    type: String,
  },
});

//  v-model значения

const color = defineModel("color", { type: String, required: true });
const count = defineModel("count", {
  type: Number,
  required: true,
});
const selected = defineModel("selected", { type: Boolean, required: true });

const regExp = new RegExp("[0-9]");

//  проверка ввода

const beforeInputValidate = (ev) => {
  if (
    ev.inputType === "deleteContentBackward" ||
    ev.inputType === "deleteWordBackward"
  )
    return;

  if (!regExp.test(ev.data)) ev.preventDefault();
};

const inputValidate = (ev) => {
  if (!ev.target.value) ev.target.value = count.value = 0;
};
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: center;
  max-width: 320px;
  justify-content: space-between;
  gap: 0.5rem;

  &__inputs {
    display: flex;
    gap: 0.5rem;

    & > label {
      cursor: pointer;

      > input {
        height: 100%;
        max-width: 30px;
      }
    }
  }

  &__count-input {
    > input {
      background-color: transparent;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      & {
        -moz-appearance: textfield;
      }
    }
  }

  &__color-input {
    display: block;
    width: 20px;
    height: 20px;
    > input {
      width: 100%;
      height: 100%;
      display: none;
    }
  }

  &__color-current {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
