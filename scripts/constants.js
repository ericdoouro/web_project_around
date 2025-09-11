const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__fields-input",
  submitButtonSelector: ".form__submit",
};

export default validationConfig;

// Botões principais
export const profileEditButton = document.querySelector(".popup__edit-profile-button");
export const addCardButton = document.querySelector(".profile__add");

// Informações do perfil
export const profileName = document.querySelector(".profile__info-name");
export const profileProfession = document.querySelector(".profile__info-profession");
export const profileAvatar = document.querySelector(".profile__avatar");
export const avatarEditButton = document.querySelector(".profile__avatar-edit");

// Container de cards
export const cardsContainer = document.querySelector(".cards");

// Template de card
export const cardTemplateSelector = "#card-template";

// Formulários
export const editProfileForm = document.querySelector("#edit-profile-form");
export const addCardForm = document.querySelector("#add-card-form");