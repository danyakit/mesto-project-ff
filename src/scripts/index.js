import {initialCards, createCard, likeButton, deleteCard} from './cards';
import { addModalWindow, editModalWindow, openImagePopup, formNewCard, handleFormSubmit} from './modal.js';
import '../pages/index.css';

  function handleImageClick(event) {
    const target = event.target;
    if (target.classList.contains("card__image")) {
      const imageLink = target.src;
      const imageName = target.alt;
      openImagePopup(imageLink, imageName);
    }
  }

  document.addEventListener("click", handleImageClick);

  function renderInitialCards() {
    const placesList = document.querySelector('.places__list');
    initialCards.forEach(function(cardData) {
      const card = createCard(cardData, deleteCard, likeButton, addModalWindow, editModalWindow, openImagePopup, formNewCard, handleFormSubmit);
      placesList.appendChild(card);
    });
  }

  renderInitialCards();

