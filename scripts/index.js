import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import { avatarEditButton } from "./constants.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import { validationConfig } from "./constants.js";
import api from "./Api.js";
import {
  profileName,
  profileProfession,
  cardTemplateSelector,
  editProfileForm,
  addCardForm
} from "./constants.js";

let currentUserId;
let cardSection;

// Instância do popup de avatar
const popupAvatarForm = new PopupWithForm(".popup__edit-avatar", (formData) => {
  console.log(formData)
  popupAvatarForm.renderLoading(true);
  api.updateAvatar(formData.avatar)
  .then(res => res.json())
    .then((res) => {
      console.log(res)
      userInfo.setUserAvatar(res.avatar);
      popupAvatarForm.close();
    })
    .catch((err) => console.error(err))
    .finally(() => popupAvatarForm.renderLoading(false));
});
popupAvatarForm.setEventListeners();

// Abrir popup ao clicar no botão
avatarEditButton.addEventListener("click", () => {
  popupAvatarForm.open();
});

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-profession",
  avatarSelector: ".profile__avatar",
});

// Buscar dados iniciais
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
    currentUserId = userData._id;

    const userId = userData._id;

    // Lista de cartões
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const cardElement = createCard(item);
          cardSection.addItem(cardElement);
        },
      },
      ".elements"
    );
    cardSection.renderItems(cards);
  })
  .catch(console.error);

const handleUpdateProfile = (values) => {
  api.editUserInfo(values).then((user) => {
    profileName.textContent = user.name;
    profileProfession.textContent = user.about;
  });
};

const handleCreateNewCard = (values) => {
  api.addNewCard(values).then((card) => {
    
    const cardElement = createCard(card);
    console.log(card, cardElement, cardSection)
    cardSection.addItem(cardElement);
  });
};

const popupProfileForm = new PopupWithForm(".popup-edit-profile", handleUpdateProfile);
popupProfileForm.setEventListeners();

const popupAddCardForm = new PopupWithForm(".popup-add-card", handleCreateNewCard);
popupAddCardForm.setEventListeners();

// Popups

// Função abrir popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Função fechar popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Popup Delete //
const popupWithImage = new PopupWithImage(".popup-image-view");
popupWithImage.setEventListeners();

const popupConfirmDelete = new PopupWithConfirmation(".popup-delete");
popupConfirmDelete.setEventListeners();

function createCard(data, userId) {
  const card = new Card(
    data,
    "#card-template",
    currentUserId,
    cardTemplateSelector,
    (name, link) => popupWithImage.open(name, link),
    (cardInstance) => {
      if (cardInstance.isLiked) {
        api.unlikeCard(cardInstance.getId())
          .then((res) => {
            cardInstance.setLikeCard(res.isLiked);
          })
          .catch(console.error);
      } else {
        api.likeCard(cardInstance.getId())
          .then((res) => {
            cardInstance.setLikeCard(res.isLiked);
          })
          .catch(console.error);
      }
    },
    (cardInstance) => {
      popupConfirmDelete.setSubmitAction(() => {
        api.deleteCard(cardInstance.getId())
          .then(() => {
            cardInstance.removeCard();
            popupConfirmDelete.close();
          })
          .catch(console.error);
      });
      popupConfirmDelete.open();
    }
  );
  return card.generateCard();
}

// Validação dos formulários
const profileFormValidator = new FormValidator(validationConfig, editProfileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();

const avatarFormElement = document.querySelector(".popup__edit-avatar form");
const avatarFormValidator = new FormValidator(validationConfig, avatarFormElement);
avatarFormValidator.enableValidation();

// Formulários e botões
document.querySelector(".popup__edit-profile-button").addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  document.querySelector("#name").value = name;
  document.querySelector("#about").value = about;
  popupProfileForm.open();
});

document.querySelector(".profile__add").addEventListener("click", () => {
  document.querySelector("#add-card-form").reset();
  popupAddCardForm.open();
});