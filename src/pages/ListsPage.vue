<template>
  <section class="lists-page-wrapper">
    <section>
      <ul class="checkboxes-list">
        <li v-for="(items, label) in listItems" :key="label">
          <DropdownMenu>
            <template #label>
              <CustomCheckboxPartial
                :selected-count="items.filter((item) => item.selected).length"
                :items-count="items.length"
                @select-all="
                  items.forEach((item) => (item.selected = true));
                  updateSelectedItemsSquares();
                "
                @delete-selection="
                  items.forEach((item) => (item.selected = false));
                  updateSelectedItemsSquares();
                "
              />
              <div>{{ label }}</div>
            </template>
            <template #content>
              <ul class="items-list">
                <li
                  v-for="(item, index) in items"
                  :key="`list-item-comp-${index}`"
                >
                  <ListItemComp
                    :label="item.name"
                    v-model:color="item.color"
                    v-model:count="item.count"
                    v-model:selected="item.selected"
                    @update:selected="updateSelectedItemsSquares"
                    @update:count="updateSelectedItemsSquares"
                  />
                </li>
              </ul>
            </template>
          </DropdownMenu>
        </li>
      </ul>
    </section>

    <section>
      <ul class="selected-items__list">
        <li
          v-for="(itemsObject, label) in selectedItemsSquares"
          :key="`selected${label}`"
        >
          <div class="selected-items__header">
            <div>{{ label }}</div>
            <button
              class="selected-items__sort-btn"
              :style="{
                visibility: itemsObject.arr?.length > 0 ? 'visible' : 'hidden',
              }"
              @click="itemsObject.isSortedArray = !itemsObject.isSortedArray"
            >
              {{ itemsObject.isSortedArray ? "Перемешать" : "Сортировать" }}
            </button>
          </div>
          <ItemsRowComp
            v-if="itemsObject.arr.length > 0"
            @delete-item="deleteItemHandler"
            v-model:isSortedArray="itemsObject.isSortedArray"
            :items="itemsObject.arr"
            :label="label"
            :parentKey="label"
          />
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup>
import ListItemComp from "@/components/ListItemComp.vue";
import ListItem from "@/class/ListItem.js";
import { generateInt, generateHexColor } from "@/utils/ListItemUtils.js";
import { computed, onMounted, ref } from "vue";
import DropdownMenu from "@/components/ui/DropdownMenu.vue";
import CustomCheckboxPartial from "@/components/ui/CustomCheckboxPartial.vue";
import ItemsRowComp from "@/components/ItemsRowComp.vue";

//  Объект имеющий тип {[key: string]: Array<ListItem>}
const listItems = ref({});

//  generate items

for (let i = 0; i < 5; i++) {
  const listItemsArray = [];

  for (let j = 0; j < generateInt(4, 10); j++)
    listItemsArray.push(new ListItem(generateHexColor(), generateInt(5, 25)));

  listItems.value[`list#${i}`] = listItemsArray;
}

//

//  Объект типа {[key: string]: Array<ListItem>};
//  ListItem: {color: string, items: Array<ListItemSquare>}

const selectedListItems = computed(() => {
  const result = {};

  Object.keys(listItems.value).forEach(
    (key) =>
      (result[key] = listItems.value[key].filter((item) => item.selected))
  );

  return result;
});

//  объект выбранных квадратов типа {[key: string]: }
const selectedItemsSquares = ref({});

//  Ручное обновление объекта selectedItemsSquares
const updateSelectedItemsSquares = () => {
  const result = {};

  Object.keys(selectedListItems.value).forEach((key) => {
    const selectedItems = selectedListItems.value[key];

    //  Flat массив элементов ListItemSquare
    const squaresInnerArray = selectedItems.reduce(
      (resultArray, selectedItem) => {
        resultArray.push(...selectedItem.items);
        return resultArray;
      },
      []
    );

    result[key] = {
      isSortedArray: true,
      arr: squaresInnerArray,
    };
  });

  selectedItemsSquares.value = result;
  console.log(result);
};

onMounted(updateSelectedItemsSquares);

const deleteItemHandler = (parentKey, color, id) => {
  const listItem = listItems.value[parentKey].find(
    (item) => item.color === color
  );
  if (!listItem) return;

  listItem.removeItem(id);
};
</script>

<style lang="scss" scoped>
.lists-page-wrapper {
  display: flex;
  gap: 20rem;
  padding: 1rem;
  min-height: 100dvh;
  min-width: 100dvw;
  box-sizing: border-box;

  > section {
    border: 1px solid black;
    padding: 1rem;
    display: block;
    width: 30%;
    min-width: 320px;
    min-height: 100%;
    height: fit-content;
    box-sizing: border-box;
  }
  .selected-items__list,
  .checkboxes-list,
  .items-list {
    display: flex;
    flex-direction: column;
    > li {
      padding: 0.5rem 0;
    }
  }

  .items-list {
    padding-left: 3rem;
  }

  .selected-items {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    &__sort-btn {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      background-color: rgb(111, 138, 248);
      color: white;
      cursor: pointer;
      transition: opacity 150ms linear;

      &:hover {
        opacity: 70%;
      }
      &:active {
        transition-duration: 50ms;
        opacity: 50%;
      }
    }
  }
}
</style>
