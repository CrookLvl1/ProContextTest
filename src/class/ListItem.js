import ListItemSquare from "./ListItemSquare";

class ListItem {
  constructor(color, count) {
    this._color = color;
    this._selected = false;
    this.id = ListItem.id++;
    //  Array<ListItemSquare>
    this._items = [];

    for (let index = 0; index < count; index++) {
      this._items.push(new ListItemSquare(this._color));
    }
  }

  set color(value) {
    this._color = value;
    this._items.forEach((item) => (item.color = value));
  }
  get color() {
    return this._color;
  }

  set count(value) {
    if (typeof value !== "number" || value < 0) return;

    if (value < this.count) this._items = this._items.slice(0, value);
    else if (value > this.count) {
      const appendItemsCount = value - this.count;

      for (let index = 0; index < appendItemsCount; index++)
        this._items.push(new ListItemSquare(this._color));
    } else {
      console.log("nothing happended, count", this);
      return;
    }
  }

  get count() {
    return this._items.length;
  }

  set selected(value) {
    this._selected = value;
  }

  get selected() {
    return this._selected;
  }

  get name() {
    return `Item ${this.id}`;
  }

  get items() {
    return this._items;
  }

  removeItem(id) {
    const itemIndex = this._items.findIndex((item) => {
      return item.id === id;
    });
    if (itemIndex === -1) return;

    this._items.splice(itemIndex, 1);
  }
}

ListItem.id = 1;

export default ListItem;
