import { createCard, likeCard, deleteCard } from "./cards.js";
import {
  closePopup, openPopup
} from "./modal.js";
import "../pages/index.css";
import { enableValidation, clearValidation, toggleButtonState } from "./validation.js";
import { getInitialCards, getUserInfo, addNewCard, updateAvatar, updateProfile } from "./api.js";
import { 
  openAddCardModalWindow,
  openProfileModalWindow,
  openEditAvatarWindow } from "./utils.js"

export const profileForm = document.querySelector(".popup_type_edit .popup__form");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const avatarEditImage = document.querySelector(".edit__avatar");
export const inputList = Array.from(profileForm.querySelectorAll(".popup__input"));
export const buttonElement = profileForm.querySelector(".popup__button");
export const сardPopup = document.querySelector(".popup_type_new-card");
export const profilePopup = document.querySelector(".popup_type_edit");
export const imagePopup = document.querySelector(".popup_type_image");
export const placesList = document.querySelector(".places__list");
export const newCardForm = document.querySelector(".popup_type_new-card .popup__form");
export const avatarForm = document.querySelector(".edit__avatar .popup__form");
export const nameInputNewCard = document.querySelector(".popup__input_type_name");
export const jobInputNewCard = document.querySelector(".popup__input_type_description");
export const nameCard = document.querySelector(".popup__input_type_card-name");
export const linkOnImage = document.querySelector(".popup__input_type_url");
export const linkOnAvatar = document.querySelector(".popup__input_type_url-avatar");
export const imageElement = imagePopup.querySelector(".popup__image");
export const captionElement = imagePopup.querySelector(".popup__caption");
export const profileImage = document.querySelector('.profile__image');


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


export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInputNewCard.value;
  const jobInputValue = jobInputNewCard.value;
  buttonElement.textContent = "Сохранение...";

  updateProfile({ name: nameInputValue, about: jobInputValue })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(profilePopup);
      profileForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonElement.textContent = "Сохранить";
    });
}

export function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardValue = nameCard.value;
  const linkCard = linkOnImage.value;
  const newCardData = {
    name: cardValue,
    link: linkCard,
  };
  buttonElement.textContent = "Сохранение...";
  addNewCard(newCardData)
    .then((newCard) => {
      const card = createCard(
        newCard,
        deleteCard,
        likeCard,
        openImagePopup,
        true
      );
      placesList.prepend(card);
      closePopup(сardPopup);
      newCardForm.reset();
      toggleButtonState(inputList, buttonElement);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      buttonElement.textContent = "Сохранить";
    });
}

export function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = linkOnAvatar.value;
  buttonElement.textContent = "Сохранение...";
  updateAvatar(avatarUrl)
    .then((data) => {
      console.log('Аватар успешно обновлен:', data);
      profileImage.style.backgroundImage = `url(${avatarUrl})`;
      closePopup(avatarEditImage);
      avatarForm.reset();
      clearValidation(avatarForm);
    })
    .catch((error) => {
      console.error('Ошибка при обновлении аватара:', error);
    })
    .finally(() => {
      buttonElement.textContent = "Сохранить";
      
    });
}

function updateProfileInfo(userInfo) {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
}

 export function openImagePopup(imageLink, imageName) {
  imageElement.src = imageLink;
  imageElement.alt = imageName;
  captionElement.textContent = imageName;
  openPopup(imagePopup);
}

function renderInitialCards(cards) {
  if (Array.isArray(cards)) {
    cards.forEach((cardData) => {
      const card = createCard(
        cardData,
        deleteCard,
        likeCard,
        openImagePopup,
        false
      );
      placesList.appendChild(card);
    });
  }
}

renderInitialCards();