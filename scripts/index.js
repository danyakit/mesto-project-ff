// @todo: Темплейт

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(data, deleteCallback) {
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
    return card;
  }
  
  function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  function renderInitialCards() {
    const placesList = document.querySelector('.places__list');
  
    initialCards.forEach(function(cardData) {
      const card = createCard(cardData, deleteCard);
      placesList.appendChild(card);
    });
  }
  
  renderInitialCards();
  
  