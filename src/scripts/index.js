import {initialCards, createCard, likeCard, deleteCard, handleImageClick} from './cards';
import { openAddCardModalWindow, openProfileModalWindow, openImagePopup, handleCardFormSubmit, handleProfileFormSubmit, placesList, profileForm, newCardForm, closeButtonImagePopup, closeButtonNewCardPopup, closeButtonProfilePopup, closePopup, сardPopup, profilePopup, imagePopup} from './modal.js';
import '../pages/index.css';


profileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleCardFormSubmit);

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', openAddCardModalWindow);

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', openProfileModalWindow);

closeButtonNewCardPopup.addEventListener('click', function() {
  closePopup(сardPopup);
});
closeButtonProfilePopup.addEventListener('click', function() {
  closePopup(profilePopup);
});
closeButtonImagePopup.addEventListener('click', function() {
  closePopup(imagePopup);
});


  profileForm.addEventListener('submit', handleProfileFormSubmit);
  newCardForm.addEventListener('submit', handleCardFormSubmit);

  function renderInitialCards() {
    initialCards.forEach(function(cardData) {
    const card = createCard(cardData, deleteCard, likeCard, handleImageClick);
      placesList.appendChild(card);
    });
  }

  renderInitialCards();

