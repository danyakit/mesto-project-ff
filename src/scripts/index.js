import { createCard, likeCard, deleteCard, handleImageClick } from "./cards.js";
import {
  handleCardFormSubmit,
  handleProfileFormSubmit,
  placesList,
  profileForm,
  newCardForm,
  closePopup,
  handleAvatarFormSubmit,
  avatarForm,
} from "./modal.js";
import "../pages/index.css";
import { enableValidation, clearValidation } from "./validation.js";
import { getInitialCards, getUserInfo } from "./api.js";
import { 
  openAddCardModalWindow,
  openProfileModalWindow,
  openEditAvatarWindow } from "./utils.js"

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

profileForm.addEventListener("submit", handleProfileFormSubmit);
newCardForm.addEventListener("submit", handleCardFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", openAddCardModalWindow);

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", openProfileModalWindow);

const editAvatar = document.querySelector(".profile__image");
editAvatar.addEventListener("click", openEditAvatarWindow);

const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

clearValidation(profileForm, newCardForm, avatarForm);

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, cards]) => {
      updateProfileInfo(userInfo);
      renderInitialCards(cards);
    })
    .catch((error) => {
      console.error('Ошибка при получении данных:', error);
    });
});

function renderInitialCards(cards) {
  if (Array.isArray(cards)) {
    cards.forEach((cardData) => {
      const card = createCard(
        cardData,
        deleteCard,
        likeCard,
        handleImageClick,
        false
      );
      placesList.appendChild(card);
    });
  }
}

function updateProfileInfo(userInfo) {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
}

renderInitialCards();
