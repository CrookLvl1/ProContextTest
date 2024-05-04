class ListItemSquare {
  constructor(color) {
    this.id = ListItemSquare.id++;
    this._color = color;
  }

  set color(value) {
    this._color = value;
  }

  get color() {
    return this._color;
  }
}

ListItemSquare.id = 0;

export default ListItemSquare;
