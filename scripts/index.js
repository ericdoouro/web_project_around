// scripts/index.js
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const initialCards = [
    {
      name: "Vale de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    },
    {
      name: "Montanhas Carecas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    },
    {
      name: "Parque Nacional da Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    }
  ];

  // Seletores e elementos do DOM
  const cardContainer = document.querySelector('.cards');
  const cardTemplateSelector = '#card-template';
  
  const popupEditProfile = document.querySelector('.popup-edit-profile');
  const popupAddCard = document.querySelector('.popup-add-card');
  const popupImageView = document.querySelector('.popup-image-view');

  const profileName = document.querySelector('.profile__info-name');
  const profileProfession = document.querySelector('.profile__info-profession');
  
  const editProfileButton = document.querySelector('.popup-edit-profile-button');
  const addCardButton = document.querySelector('.profile__add');

  const editProfileForm = popupEditProfile.querySelector('form');
  const addCardForm = popupAddCard.querySelector('form');

  const nameInput = editProfileForm.querySelector('#name');
  const aboutInput = editProfileForm.querySelector('#about');
  
  // Função para abrir popup de imagem ao clicar no card
  function handleCardClick(name, link) {
    const popupImage = popupImageView.querySelector('.popup__image');
    const popupCaption = popupImageView.querySelector('.popup__image-text');
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(popupImageView);
  }

  // Cria e adiciona um card na lista
  function addCard(cardData) {
    const card = new Card(cardData, cardTemplateSelector, handleCardClick);
    const cardElement = card.generateCard();
    cardContainer.prepend(cardElement);
  }

  // Renderiza os cards iniciais
  initialCards.forEach(addCard);

  // Eventos de abrir popups
  editProfileButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileProfession.textContent;
    openPopup(popupEditProfile);
    editProfileFormValidator.resetValidation();
  });

  addCardButton.addEventListener('click', () => {
    openPopup(popupAddCard);
    addCardFormValidator.resetValidation();
  });

  // Fechar popups com o botão fechar
  document.querySelectorAll('.popup__close-button').forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });

  // Fechar popups clicando no overlay
  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', (e) => {
      if (e.target === popup) {
        closePopup(popup);
      }
    });
  });

  // Fechar popup com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openedPopup = document.querySelector('.popup.popup_opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  });

  // Submit do formulário Editar Perfil
  editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = aboutInput.value;
    closePopup(popupEditProfile);
  });

  // Submit do formulário Adicionar Card
  addCardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newCardData = {
      name: addCardForm.title.value,
      link: addCardForm['image-link'].value,
    };
    addCard(newCardData);
    addCardForm.reset();
    closePopup(popupAddCard);
  });

  // Configuração de validação
  const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".form__fields-input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit:disabled",
    inputErrorClass: "input-error",
    errorClass: "form__error_visible"
  };

  // Instanciar validadores para os formulários
  const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
  const addCardFormValidator = new FormValidator(validationConfig, addCardForm);

  editProfileFormValidator.enableValidation();
  addCardFormValidator.enableValidation();

});