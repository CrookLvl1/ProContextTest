<template>
  <main>
    <ListsPage />
  </main>
</template>

<script setup>
import ListsPage from "@/pages/ListsPage.vue";
</script>

<style lang="scss">
html {
  font-size: 16px;
}
body {
  background-color: lightgray;
  font-size: 1rem;
}

* {
  padding: 0;
  margin: 0;
  outline: none;
  border: none;
  &:active,
  &:focus,
  &:hover {
    outline: none;
    border: none;
  }
}
ul,
ol {
  list-style: none;
}
</style>
