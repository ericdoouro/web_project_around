export default class Section {
  constructor({items, renderer }, containerSelector) {
    this._items = items
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item)
    })  
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

// this._items.foreach(cards => this._renderer(cards));
    // this._items.foreach(item => {
    //   const element = this._renderer(item);
    //   this.addItem(element);
    // })