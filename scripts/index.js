const editButton = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");

const inputName = document.getElementById("name");
const inputAbout = document.getElementById("about");

const profileName = document.querySelector(".profile__info-name");
const profileProfession = document.querySelector(".profile__info-profession");

editButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileProfession.textContent;
  popup.classList.add("popup_opened");
});

closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});

const form = document.querySelector(".popup__form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileProfession.textContent = inputAbout.value;

  popup.classList.remove("popup_opened");

  form.reset();
});

const addButton = document.querySelector(".profile__add");
const popupAddCard = document.querySelector(".popup-add-card");
const closeButtonAddCard = document.querySelector(".popup-add-card__close-button");

addButton.addEventListener("click", () => {
  popupAddCard.classList.add("popup_opened");
});

closeButtonAddCard.addEventListener("click", () => {
  popupAddCard.classList.remove("popup_opened");
});
