export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return template;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__item-img');
    this._title = this._element.querySelector('.element__item-info-text');
    this._likeButton = this._element.querySelector('.element__button');
    this._deleteButton = this._element.querySelector('.element__delete-button');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('element__button_active');
    });

    this._deleteButton.addEventListener('click', () => {
      this._element.remove();
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}