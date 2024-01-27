import { createCard, deleteCard, likeCard, handleImageClick } from "./cards.js";
import { toggleButtonState } from "./validation.js";
import { updateProfile, addNewCard, updateAvatar } from "./api.js";

export const placesList = document.querySelector(".places__list");
export const profileForm = document.querySelector(".popup_type_edit .popup__form");
export const newCardForm = document.querySelector(".popup_type_new-card .popup__form");
export const avatarForm = document.querySelector(".edit__avatar .popup__form");

const nameInputNewCard = document.querySelector(".popup__input_type_name");
const jobInputNewCard = document.querySelector(".popup__input_type_description");
const nameCard = document.querySelector(".popup__input_type_card-name");
const linkOnImage = document.querySelector(".popup__input_type_url");
const linkOnAvatar = document.querySelector(".popup__input_type_url-avatar");
export const сardPopup = document.querySelector(".popup_type_new-card");
export const profilePopup = document.querySelector(".popup_type_edit");
export const imagePopup = document.querySelector(".popup_type_image");
export const closeButtonNewCardPopup = сardPopup.querySelector(".popup__close");
export const closeButtonProfilePopup =
  profilePopup.querySelector(".popup__close");
export const closeButtonImagePopup = imagePopup.querySelector(".popup__close");

const imageElement = imagePopup.querySelector(".popup__image");
const captionElement = imagePopup.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editAvatarImage = document.querySelector(".edit__avatar");

export function openAddCardModalWindow() {
  openPopup(сardPopup);
}

export function openEditAvatarWindow() {
  openPopup(editAvatarImage);
}

export function openProfileModalWindow() {
  openPopup(profilePopup);

  nameInputNewCard.value = profileTitle.textContent;
  jobInputNewCard.value = profileDescription.textContent;

  const inputList = Array.from(profileForm.querySelectorAll(".popup__input"));
  const buttonElement = profileForm.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
}

export function openImagePopup(imageLink, imageName) {
  imageElement.src = imageLink;
  imageElement.alt = imageName;
  captionElement.textContent = imageName;
  openPopup(imagePopup);
}

function handleOverlayClick(event) {
  const popupContent = event.currentTarget.querySelector(".popup__content");
  const isClickPopup = popupContent.contains(event.target);
  if (!isClickPopup) {
    closePopup(event.currentTarget);
  }
}

function handleEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  popup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscape);
}

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInputNewCard.value;
  const jobInputValue = jobInputNewCard.value;

  const buttonElement = profileForm.querySelector(".popup__button");
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

  const buttonElement = newCardForm.querySelector(".popup__button");
  buttonElement.textContent = "Сохранение...";
  addNewCard(newCardData)
    .then((newCard) => {
      const card = createCard(
        newCard,
        deleteCard,
        likeCard,
        handleImageClick,
        true
      );
      placesList.prepend(card);
      closePopup(сardPopup);
      newCardForm.reset();
      const inputList = Array.from(
        newCardForm.querySelectorAll(".popup__input")
      );
      const buttonElement = newCardForm.querySelector(".popup__button");
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

  const buttonElement = avatarForm.querySelector(".popup__button");
  buttonElement.textContent = "Сохранение...";

  updateAvatar(avatarUrl)
    .then((data) => {
      // Обработка успешного ответа
      console.log('Аватар успешно обновлен:', data);

      // Обновление DOM с новым аватаром
      const profileImage = document.querySelector('.profile__image');
      profileImage.style.backgroundImage = `url(${avatarUrl})`;

      closePopup(editAvatarImage);
      avatarForm.reset();
    })
    .catch((error) => {
      // Обработка ошибок
      console.error('Ошибка при обновлении аватара:', error);
    })
    .finally(() => {
      buttonElement.textContent = "Сохранить";
    });
}

