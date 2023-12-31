import {initialCards, createCard, likeButton, deleteCard} from './cards';
import { addModalWindow, editModalWindow, openImagePopup, handleCardFormSubmit, handleProfileFormSubmit, placesList} from './modal.js';
import '../pages/index.css';

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', addModalWindow);

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', editModalWindow);


  export function handleImageClick(event) {
    const target = event.target;
    if (target.classList.contains("card__image")) {
      const imageLink = target.src;
      const imageName = target.alt;
      openImagePopup(imageLink, imageName);
    }
  }

  function renderInitialCards() {
    initialCards.forEach(function(cardData) {
      const card = createCard(cardData, deleteCard, likeButton, addModalWindow, editModalWindow, openImagePopup, handleCardFormSubmit, handleProfileFormSubmit);
      placesList.appendChild(card);
    });
  }

  renderInitialCards();

