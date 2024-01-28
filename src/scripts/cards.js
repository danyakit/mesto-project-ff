import { openImagePopup } from "./modal.js";
import { likeCardApi, unlikeCard, deleteCardApi } from "./api.js";

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
  },
];

export function createCard(
  data,
  deleteCard,
  likeCard,
  handleImageClick,
  isOwner
) {
  const template = document.getElementById("card-template");
  const clone = document.importNode(template.content, true);
  const card = clone.querySelector(".card");
  card.dataset.cardId = data._id;

  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const likeCountElement = card.querySelector(".card__like-count");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  likeCountElement.textContent = data.likes.length;

  const deleteButton = card.querySelector(".card__delete-button");
  if (isOwner) {
    deleteButton.addEventListener("click", function () {
      deleteCard(card, data._id);
    });
  } else {
    deleteButton.style.display = "none";
  }

  const likeButtonElement = card.querySelector(".card__like-button");
  likeButtonElement.addEventListener("click", function (evt) {
    likeCard(evt, likeCountElement, data._id);
  });
  cardImage.addEventListener("click", function () {
    handleImageClick(data.link, data.name);
  });
  return card;
}

export function deleteCard(card, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.error(err);
    });
}

export function likeCard(evt, likeCountElement, cardId) {
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  if (isLiked) {
    unlikeCard(cardId)
      .then((data) => {
        updateLikeStatus(evt.target, likeCountElement, data.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCardApi(cardId)
      .then((data) => {
        updateLikeStatus(evt.target, likeCountElement, data.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function updateLikeStatus(likeButton, likeCountElement, likeCount) {
  likeButton.classList.toggle("card__like-button_is-active");
  likeCountElement.textContent = likeCount;
}

export function handleImageClick(imageLink, imageName) {
  openImagePopup(imageLink, imageName);
}
