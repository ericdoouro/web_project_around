// Dados dos cartões iniciais
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

// Seletores principais
const addButton = document.querySelector('.profile__add');
const popupAddCard = document.querySelector('.popup-add-card');
const closeAddCardBtn = document.querySelector('.popup-add-card__close-button');
const formAddCard = document.querySelector('#add-card-form');
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

const editProfileBtn = document.querySelector('.popup-edit-profile-button'); // botão com ícone de lápis
const popupEditProfile = document.querySelector('.popup-edit-profile.popup'); // popup de editar perfil
const formEditProfile = popupEditProfile.querySelector('.form');
const nameInput = formEditProfile.querySelector('#name');
const aboutInput = formEditProfile.querySelector('#about');
const profileName = document.querySelector('.profile__info-name');
const profileProfession = document.querySelector('.profile__info-profession');

// ---------- Funções auxiliares ----------

// Abre popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Fecha popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Cria um novo card baseado no template
function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__item-img');
  const cardTitle = cardElement.querySelector('.element__item-info-text');
  const likeButton = cardElement.querySelector('.element__button');
  const deleteButton = cardElement.querySelector('.element__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Curtir
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

  // Deletar
  deleteButton.addEventListener('click', () => {
    deleteButton.closest('.card').remove();
  });

  // Zoom na imagem
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

// Renderiza os cards iniciais
function renderInitialCards() {
  initialCards.forEach(cardData => {
    const card = createCard(cardData);
    cardsContainer.appendChild(card);
  });
}

// ---------- Eventos de popup ----------

// Abrir popup de adicionar card
addButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// Fechar popup de adicionar card
closeAddCardBtn.addEventListener('click', () => {
  closePopup(popupAddCard);
});

// Abrir popup de editar perfil
editProfileBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileProfession.textContent;
  openPopup(popupEditProfile);
});

// Submeter edição de perfil
formEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = aboutInput.value;
  closePopup(popupEditProfile);
});

// Fechar qualquer popup ao clicar no botão de fechar
document.querySelectorAll('.popup__close-button').forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

// Submeter novo card
formAddCard.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = formAddCard.title.value;
  const image = formAddCard['image-link'].value;

  const newCard = createCard({ name: title, link: image });
  cardsContainer.prepend(newCard);

  formAddCard.reset();
  closePopup(popupAddCard);
});

// ---------- Inicialização ----------
renderInitialCards();
