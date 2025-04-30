const editButton = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button")

editButton.addEventListener("click", () => {
  popup.classList.add("popup_opened");
});

closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});

const addButton = document.querySelector(".profile__add");
const popupAddCard = document.querySelector(".popup-add-card");
const closeButtonAddCard = document.querySelector(".popup-add-card__close-button")

addButton.addEventListener("click", () => {
  popupAddCard.classList.add("popup_opened");
});

closeButtonAddCard.addEventListener("click", () => {
  popupAddCard.classList.remove("popup_opened");
});
