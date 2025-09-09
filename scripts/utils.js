export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const editButton = document.querySelector('.popup__edit-profile-button');
export const addButton = document.querySelector('.profile__add');

export const popupEditProfile = document.querySelector('.popup-edit-profile');
export const popupAddCard = document.querySelector('.form__fields');

export const profileForm = popupEditProfile.querySelector('.popup__form');
export const cardForm = document.querySelector('#add-card-form');

export const nameInput = popupEditProfile.querySelector('.form__fields-input');
export const aboutInput = popupEditProfile.querySelector('.form__fields-input');

export const cardsContainer = document.querySelector('.cards');
