export default class Card {
  constructor(
    data,
    templateSelector,
    currentUserId,
    cardTemplateSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this.isLiked = data.isLiked;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._element = undefined

    this._templateSelector = templateSelector;
    this._cardTemplateSelector = cardTemplateSelector;
    this._currentUserId = currentUserId;

    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  generateCard() {
    this._element = document.querySelector("#card-template").content.cloneNode(true);
    this._cardImage = this._element.querySelector(".element__item-img");
    this._likeButton = this._element.querySelector(".element__like-img");
    this._deleteButton = this._element.querySelector(".element__delete-button");
    this._cardText = this._element.querySelector(".element__item-info-text");
    const cardList = document.querySelector(".cards");
  
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;
  
    this._setEventListeners();
    cardList.prepend(this._element);

    return this._element;
  }
  
  _handleDeleteClick() {
    this._handleDeleteCard(this._cardId, this._element);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    }

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  setLikeCard(isLiked) {
    this.isLiked = isLiked;
    

    if (this.isLiked) {
      this._likeButton.src = "../images/like2.png";
    } else {
      this._likeButton.src = "../images/like.svg";
    }
  }

  getId() {
    return this._id;
  }

  removeCard() {
    console.log(this._element)
    this._element.firstChild.remove();
  }
}