export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

import {addModalWindow, editModalWindow} from './modal';

export function createCard(data, deleteCallback, likeButton) {
  const template = document.getElementById('card-template');
  const clone = document.importNode(template.content, true);
  const card = clone.querySelector('.card');

  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    deleteCallback(card); 
  });

  likeButton(card);
  const addButton = document.querySelector('.profile__add-button');
  addButton.addEventListener('click', addModalWindow);

  const editButton = document.querySelector('.profile__edit-button');
  editButton.addEventListener('click', editModalWindow);

  return card;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeButton(card) {
  card.querySelector('.card__like-button').addEventListener('click', function() {
    this.classList.toggle('card__like-button_is-active');
  });
}