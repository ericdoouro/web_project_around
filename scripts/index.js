import { initialCards } from './utils.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';

document.addEventListener('DOMContentLoaded', () => {
  const popupImage = new PopupWithImage('.popup-image-view');
  popupImage.setEventListeners();
  
  const cardSection = new Section({
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, '#card-template', (name, link) => popupImage.open(name, link));
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    }
  }, '.cards');
  cardSection.renderItems();

  const userInfo = new UserInfo({
    nameSelector: '.profile__info-name',
    aboutSelector: '.profile__info-profession'
  });

  const popupProfile = new PopupWithForm('.popup-edit-profile', (formData) => {
    userInfo.setUserInfo(formData);
    popupProfile.close();
  });
  popupProfile.setEventListeners();

  const popupAddCard = new PopupWithForm('.popup-add-card', (formData) => {
    const cardData = {
      name: formData.name,
      link: formData.link
    };
    const card = new Card(cardData, '#card-template', (name, link) => popupImage.open(name, link));
    cardSection.addItem(card.generateCard());
    popupAddCard.close();
  });
  popupAddCard.setEventListeners();

  document.querySelector('.popup-edit-profile-button').addEventListener('click', () => {
    const { name, about } = userInfo.getUserInfo();
    document.querySelector('#name').value = name;
    document.querySelector('#about').value = about;
    popupProfile.open();
  });

  document.querySelector('.profile__add').addEventListener('click', () => {
    document.querySelector('#add-card-form').reset();
    popupAddCard.open();
  });

  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.form__fields-input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'input-error',
    errorClass: 'form__error_visible'
  };

  new FormValidator(validationConfig, document.querySelector('#edit-profile-form')).enableValidation();
  new FormValidator(validationConfig, document.querySelector('#add-card-form')).enableValidation();
});