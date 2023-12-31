import { createCard, deleteCard, likeButton } from './cards.js';

export const placesList = document.querySelector('.places__list');
const formElement = document.querySelector('.popup__form'); // форма и профиля и новой карточки
const nameInputNewCard = document.querySelector('.popup__input_type_name');
const jobInputNewCard = document.querySelector('.popup__input_type_description');
const nameCard = document.querySelector('.popup__input_type_card-name');
const linkOnImage = document.querySelector('.popup__input_type_url');
const сardPopup = document.querySelector('.popup_type_new-card');
const profilePopup = document.querySelector('.popup_type_edit');
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
const imagePopup = document.querySelector(".popup_type_image");
const closeButtonNewCardPopup = сardPopup.querySelector('.popup__close');
const closeButtonProfilePopup = profilePopup.querySelector('.popup__close');
const closeButtonImagePopup = imagePopup.querySelector('.popup__close');

const profileForm = document.querySelector('.popup_type_edit .popup__form');
const imageElement = imagePopup.querySelector(".popup__image");
const captionElement = imagePopup.querySelector(".popup__caption");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

document.querySelector('.popup_type_edit .popup__form').addEventListener('submit', handleProfileFormSubmit);
document.querySelector('.popup_type_new-card .popup__form').addEventListener('submit', handleCardFormSubmit);


export function addModalWindow() {
  openPopup(сardPopup);
  closeButtonNewCardPopup.addEventListener('click', function() {
    closePopup(сardPopup);
  });
}

export function editModalWindow() {
  openPopup(profilePopup);

  nameInputNewCard.value = profileTitle.textContent;
  jobInputNewCard.value = profileDescription.textContent;

  closeButtonProfilePopup.addEventListener('click', function() {
    closePopup(profilePopup);
  });
}

export function openImagePopup(imageLink, imageName) {
  imageElement.src = imageLink;
  imageElement.alt = imageName;
  captionElement.textContent = imageName;
  openPopup(imagePopup);
  closeButtonImagePopup.addEventListener('click', function () {
    closePopup(imagePopup);
  });
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
    popup.classList.add('popup_is-opened', 'popup_is-animated');
    popup.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscape);
  
    if (popup.classList.contains('popup_type_edit')) {
      profileForm.addEventListener('submit', handleProfileFormSubmit);
    } else if (popup.classList.contains('popup_type_new-card')) {
      newCardForm.addEventListener('submit', handleCardFormSubmit);
    }
  }

  function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
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

    const newCard = createCard(newCardData, deleteCard, likeButton);
    placesList.prepend(newCard);
    closePopup(сardPopup);
    newCardForm.reset();
  }