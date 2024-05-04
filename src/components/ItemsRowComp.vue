<template>
  <div class="list-row">
    <ul class="list-row__items-lists" @click="deleteItemHandler">
      <li
        v-for="(squaresArray, index) in currentObject"
        :key="`${parentKey}-${index}`"
      >
        <ul class="list-row__squares-list">
          <li
            class="list-row__square"
            v-for="(square, index) in squaresArray"
            :data-id="square.id"
            :data-color="square.color"
            :style="{ backgroundColor: square.color }"
            :key="`${parentKey}-${index}`"
          ></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, defineModel, ref, watchEffect } from "vue";
import { shuffleArray } from "@/utils/ListItemUtils.js";

const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
  parentKey: { type: String, required: true },
});

const emit = defineEmits(["deleteItem"]);

const isSortedArray = defineModel("isSortedArray", {
  required: true,
  type: Boolean,
});

//  Array<[key: string | number]: Array<ListItemSquare>>
const currentObject = ref([]);

//  Наблюдение и изменение переменной (currentObject)
watchEffect(() => {
  currentObject.value = isSortedArray.value
    ? Object.groupBy(props.items, ({ color }) => color)
    : [shuffleArray(props.items)];
});

const deleteItemHandler = (ev) => {
  const target = ev.target.closest(".list-row__square");
  if (!target) return;

  const { id, color } = {
    id: +target.dataset.id,
    color: target.dataset.color,
  };

  //  Индекс и ключ для удаления квадрата ListItemSquare
  let squareIndex = -1;
  let squareKey = null;

  for (const key in currentObject.value) {
    squareIndex = currentObject.value[key].findIndex(
      (squareItem) => squareItem.id === id
    );

    if (squareIndex !== -1) {
      squareKey = key;
      break;
    }
  }

  if (squareIndex === -1) return;
  //  Удаление по id локально (чтобы избежать обновления компонента)
  currentObject.value[squareKey].splice(squareIndex, 1);
  emit("deleteItem", props.parentKey, color, id);
};
</script>

<style lang="scss" scoped>
.list-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__items-lists {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__squares-list {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
  }

  &__square {
    display: block;
    cursor: pointer;
    width: 10px;
    height: 10px;
  }
}
</style>
