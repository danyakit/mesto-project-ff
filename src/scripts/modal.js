import { createCard, deleteCard, likeCard, handleImageClick } from './cards.js';

export const placesList = document.querySelector('.places__list');
export const profileForm = document.querySelector('.popup_type_edit .popup__form');
export const newCardForm = document.querySelector('.popup_type_new-card .popup__form');

const nameInputNewCard = document.querySelector('.popup__input_type_name');
const jobInputNewCard = document.querySelector('.popup__input_type_description');
const nameCard = document.querySelector('.popup__input_type_card-name');
const linkOnImage = document.querySelector('.popup__input_type_url');
export const сardPopup = document.querySelector('.popup_type_new-card');
export const profilePopup = document.querySelector('.popup_type_edit');
export const imagePopup = document.querySelector(".popup_type_image");
export const closeButtonNewCardPopup = сardPopup.querySelector('.popup__close');
export const closeButtonProfilePopup = profilePopup.querySelector('.popup__close');
export const closeButtonImagePopup = imagePopup.querySelector('.popup__close');

const imageElement = imagePopup.querySelector(".popup__image");
const captionElement = imagePopup.querySelector(".popup__caption");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');




export function openAddCardModalWindow() {
  openPopup(сardPopup);
}

export function openProfileModalWindow() {
  openPopup(profilePopup);

  nameInputNewCard.value = profileTitle.textContent;
  jobInputNewCard.value = profileDescription.textContent;
}

export function openImagePopup(imageLink, imageName) {
  imageElement.src = imageLink;
  imageElement.alt = imageName;
  captionElement.textContent = imageName;
  openPopup(imagePopup);
}

  function handleOverlayClick(event) {
    const popupContent = event.currentTarget.querySelector('.popup__content');
    const isClickPopup = popupContent.contains(event.target);
    if(!isClickPopup) {
      closePopup(event.currentTarget);
    }
  }

  function handleEscape(event) {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }

  export function openPopup(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
      popup.classList.add("popup_is-opened");
    }, 1);
    popup.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscape);
  }

  export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', handleOverlayClick);
    document.removeEventListener('keydown', handleEscape);
  }

  export function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInputNewCard.value;
    const jobValue = jobInputNewCard.value;
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closePopup(profilePopup);
    profileForm.reset();
  }

  
  export function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardValue = nameCard.value;
    const linkCard = linkOnImage.value;
    const newCardData = {
      name: cardValue,
      link: linkCard
    };

    const newCard = createCard(newCardData, deleteCard, likeCard, handleImageClick);
    placesList.prepend(newCard);
    closePopup(сardPopup);
    newCardForm.reset();
  }