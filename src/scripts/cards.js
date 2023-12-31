import { openImagePopup } from './modal'

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

export function createCard(data,  deleteCard, likeCard, handleImageClick) {
  const template = document.getElementById('card-template');
  const clone = document.importNode(template.content, true);
  const card = clone.querySelector('.card');

  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    deleteCard(card);
  });

  const likeButtonElement = card.querySelector('.card__like-button');
  likeButtonElement.addEventListener('click', likeCard);

  cardImage.addEventListener('click', handleImageClick);

  return card;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function handleImageClick(event) {
  const target = event.target;
  if (target.classList.contains("card__image")) {
    const imageLink = target.src;
    const imageName = target.alt;
    openImagePopup(imageLink, imageName);
  }
}
