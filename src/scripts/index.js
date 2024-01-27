import { createCard, likeCard, deleteCard, handleImageClick } from "./cards.js";
import {
  openAddCardModalWindow,
  openProfileModalWindow,
  openEditAvatarWindow,
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


// После загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
  // Получаем данные профиля
  getUserInfo()
    .then((userInfo) => {
      // Вставляем данные профиля в DOM
      updateProfileInfo(userInfo);
    })
    .catch((error) => {
      console.error('Ошибка при получении данных профиля:', error);
    });

  // Получаем карточки
  getInitialCards()
    .then((cards) => {
      // Отрисовываем карточки
      renderInitialCards(cards);
    })
    .catch((error) => {
      console.error('Ошибка при получении карточек:', error);
    });
});

// Функция для отрисовки карточек
function renderInitialCards(cards) {
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

// Функция для вставки данных профиля в DOM
function updateProfileInfo(userInfo) {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const profileImage = document.querySelector('.profile__image');

  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
}


renderInitialCards();
