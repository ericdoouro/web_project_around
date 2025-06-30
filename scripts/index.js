import { resetValidation } from './validate.js';

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

  const addButton = document.querySelector('.profile__add');
  const popupAddCard = document.querySelector('.popup-add-card');
  const closeAddCardBtn = document.querySelector('.popup-add-card__close-button');
  const formAddCard = document.querySelector('#add-card-form');
  const cardsContainer = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#card-template').content;

  const editProfileBtn = document.querySelector('.popup-edit-profile-button');
  const popupEditProfile = document.querySelector('.popup-edit-profile');
  const formEditProfile = popupEditProfile.querySelector('.form');
  const nameInput = formEditProfile.querySelector('#name');
  const aboutInput = formEditProfile.querySelector('#about');
  const profileName = document.querySelector('.profile__info-name');
  const profileProfession = document.querySelector('.profile__info-profession');
  const profileForm = document.querySelector('#edit-profile-form');
  const submitButton = profileForm.querySelector('.form__submit');

  function openPopup(popup) {
    popup.classList.add('popup_opened');
  }

  function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }

  function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__item-img');
    const cardTitle = cardElement.querySelector('.element__item-info-text');
    const likeButton = cardElement.querySelector('.element__button');
    const deleteButton = cardElement.querySelector('.element__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    likeButton.addEventListener('click', () => {
      const likeImg = likeButton.querySelector('.element__button-img');
      const isLiked = likeButton.classList.toggle('element__button_active');

      if (isLiked) {
        likeImg.src = './images/like2.png';
        likeImg.alt = 'Descurtir';
      } else {
        likeImg.src = './images/like.svg';
        likeImg.alt = 'Curtir';
      }
    });

    deleteButton.addEventListener('click', () => {
      deleteButton.closest('.card').remove();
    });

    cardImage.addEventListener('click', () => {
      const popup = document.querySelector('.popup-image-view');
      const popupImage = popup.querySelector('.popup__image');
      const popupCaption = popup.querySelector('.popup__image-text');

      popupImage.src = cardData.link;
      popupImage.alt = cardData.name;
      popupCaption.textContent = cardData.name;

      openPopup(popup);
    });

    return cardElement;
  }

  function renderInitialCards() {
    initialCards.forEach(cardData => {
      const card = createCard(cardData);
      cardsContainer.appendChild(card);
    });
  }

  addButton.addEventListener('click', () => {
    openPopup(popupAddCard);
  });

  closeAddCardBtn.addEventListener('click', () => {
    closePopup(popupAddCard);
  });

  editProfileBtn.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileProfession.textContent;
    openPopup(popupEditProfile);
  });

  formEditProfile.addEventListener('submit', (e) => {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = aboutInput.value;
    closePopup(popupEditProfile);
  });

  document.querySelectorAll('.popup__close-button').forEach(button => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup');
      closePopup(popup);
    });
  });

  function enableOverlayClose() {
    const allPopups = document.querySelectorAll('.popup');
    allPopups.forEach((popup) => {
      popup.addEventListener('mousedown', (event) => {
        if (popup.classList.contains('popup_opened') && event.target === popup) {
          closePopup(popup);
        }
      });
    });
  }

  enableOverlayClose();

  formAddCard.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = formAddCard.title.value;
    const image = formAddCard['image-link'].value;
    const newCard = createCard({ name: title, link: image });
    cardsContainer.prepend(newCard);
    formAddCard.reset();
    closePopup(popupAddCard);
  });

  renderInitialCards();

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup.popup_opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  });

  const showError = (inputElement, errorElementId) => {
    const errorElement = profileForm.querySelector(`#${errorElementId}`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add("form__line-popup");
  };

  const hideError = (errorElementId, inputElement) => {
    const errorElement = profileForm.querySelector(`#${errorElementId}`);
    inputElement.classList.remove("form__line-popup");
    errorElement.textContent = '';
  };

  const toggleButtonState = () => {
    submitButton.disabled = !(nameInput.validity.valid && aboutInput.validity.valid);
  };

  const validateInput = (inputElement, errorElementId) => {
    if (!inputElement.validity.valid) {
      showError(inputElement, errorElementId);
    } else {
      hideError(errorElementId, inputElement);
    }
    toggleButtonState();
  };

  nameInput.addEventListener('input', () => validateInput(nameInput, 'name-error'));
  aboutInput.addEventListener('input', () => validateInput(aboutInput, 'about-error'));

  const cardForm = document.querySelector('#add-card-form');
  const titleInput = cardForm.querySelector('#title');
  const urlInput = cardForm.querySelector('#image-link');
  const cardSubmitButton = cardForm.querySelector('.form__submit');

  const showCardError = (input, errorId) => {
    const errorEl = cardForm.querySelector(`#${errorId}`);
    errorEl.textContent = input.validationMessage;
    input.classList.add('input-error');
  };

  const hideCardError = (input, errorId) => {
    const errorEl = cardForm.querySelector(`#${errorId}`);
    errorEl.textContent = '';
    input.classList.remove('input-error');
  };

  const validateCardInput = (input, errorId) => {
    if (!input.validity.valid) {
      showCardError(input, errorId);
    } else {
      hideCardError(input, errorId);
    }
    toggleCardButton();
  };

  const toggleCardButton = () => {
    cardSubmitButton.disabled = !(titleInput.validity.valid && urlInput.validity.valid);
  };

  titleInput.addEventListener('input', () => validateCardInput(titleInput, 'title-error'));
  urlInput.addEventListener('input', () => validateCardInput(urlInput, 'image-link-error'));

});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".form__fields-input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__fields-input_type_error",
  errorClass: "form__error_visible"
});


addButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  resetValidation(formAddCard, validationConfig);
});

editProfileBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileProfession.textContent;
  openPopup(popupEditProfile);
  resetValidation(profileForm, validationConfig);
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

