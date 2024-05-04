<template>
  <div class="dropdown-menu">
    <label class="dropdown-menu__label">
      <div class="dropdown-menu__activator">
        <div
          class="dropdown-menu__chevron"
          :class="{ 'dropdown-menu__chevron-active': listOpened }"
        ></div>
      </div>
      <input type="checkbox" v-model="listOpened" />
      <slot name="label"></slot>
    </label>

    <div class="dropdown-menu__content" v-show="listOpened">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const listOpened = ref(false);
</script>

<style lang="scss" scoped>
.dropdown-menu {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &__label {
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;
    // background-color: red;
    position: relative;
    width: 100%;
    cursor: pointer;
    padding-bottom: 0.5rem;

    > input {
      display: none;
    }

    &::after {
      content: "";
      position: absolute;
      display: block;
      height: 1px;
      width: 100%;
      background-color: gray;
      bottom: 0;
      opacity: 0;
      transition: opacity 150ms linear;
    }

    &:hover {
      &::after {
        opacity: 100%;
      }
    }
  }

  &__activator {
    display: block;
    position: relative;
  }

  &__chevron {
    width: 16px;
    height: 16px;
    background-color: transparent;
    position: relative;
    transition: transform 250ms cubic-bezier(0.175, 0.885, 0.32, 1.5);

    &-active {
      transform: rotate(90deg);
    }

    &::before,
    &::after {
      display: block;
      content: "";
      position: absolute;
      background-color: black;
      width: 50%;
      height: 1px;
      border-radius: 2px;
    }
    &::before {
      top: 32.5%;
      left: 30%;
      transform: rotate(50deg);
    }
    &::after {
      transform: rotate(130deg);
      top: 67.5%;
      left: 30%;
    }
  }

  &__content {
  }
}
</style>
