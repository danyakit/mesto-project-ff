import { createCard, deleteCard, likeButton } from './cards.js';

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const nameCard = document.querySelector('.popup__input_type_card-name');
const linkOnImage = document.querySelector('.popup__input_type_url');
const placesList = document.querySelector('.places__list');


export function addModalWindow() {
    const newCardPopup = document.querySelector('.popup_type_new-card');
    newCardPopup.classList.add('popup_is-opened', 'popup_is-animated');
    newCardPopup.addEventListener('click', overlayClick);
    document.addEventListener('keydown', estOnClose);

    const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
    newCardForm.addEventListener('submit', formNewCard);

    const closeButtonAddPopup = newCardPopup.querySelector('.popup__close');
    closeButtonAddPopup.addEventListener('click', function() {
        closePopup(newCardPopup);
    });
  }

  export function editModalWindow() {
    const editPopup = document.querySelector('.popup_type_edit');
    editPopup.classList.add('popup_is-opened', 'popup_is-animated');
    editPopup.addEventListener('click', overlayClick);
    document.addEventListener('keydown', estOnClose);

    const editForm = document.querySelector('.popup_type_edit .popup__form');
    editForm.addEventListener('submit', handleFormSubmit);

    const closeButtonEditPopup = editPopup.querySelector('.popup__close');
    closeButtonEditPopup.addEventListener('click', function() {
        closePopup(editPopup);
    });
  }

  export function openImagePopup(imageLink, imageName) {
    const imagePopup = document.querySelector(".popup_type_image");
    const imageElement = imagePopup.querySelector(".popup__image");
    const captionElement = imagePopup.querySelector(".popup__caption");

    imageElement.src = imageLink;
    imageElement.alt = imageName;
    captionElement.textContent = imageName;

    imagePopup.classList.add('popup_is-opened', 'popup_is-animated');

    const closeButton = imagePopup.querySelector(".popup__close");
    closeButton.addEventListener("click", function () {
      closePopup(imagePopup);
    });
    imagePopup.addEventListener('click', overlayClick);
    document.addEventListener('keydown', estOnClose);
  }

  function overlayClick(event) {
    const popupContent = event.currentTarget.querySelector('.popup__content');
    const isClickPopup = popupContent.contains(event.target);
    if(!isClickPopup) {
      closePopup(event.currentTarget);
    }
  }

  function estOnClose(event) {
    if (event.key === 'Escape') {
      closePopup(document.querySelector('.popup_is-opened'));
    }
  }

  function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
  }

  export function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closePopup(document.querySelector('.popup_type_edit'));
  }

  
  export function formNewCard(evt) {
    evt.preventDefault();
    const cardValue = nameCard.value;
    const linkCard = linkOnImage.value;

    const newCardData = {
      name: cardValue,
      link: linkCard
    };

    const newCard = createCard(newCardData, deleteCard, likeButton);
    placesList.prepend(newCard);

    const newCardPopup = document.querySelector('.popup_type_new-card');
    closePopup(newCardPopup);
    formElement.reset();
  }