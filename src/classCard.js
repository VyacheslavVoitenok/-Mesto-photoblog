`use strict`;

export default class Card {
    constructor(card) {
      this.name = card.name;
      this.link = card.link;
      this.ownerId = card.owner._id;
      this.cardId = card._id;
      this.likes = card.likes;
  
      this.cardElement = this.create(this.name, this.link);
      this.remove = this.remove.bind(this);
  
      this.cardElement.querySelector(`.place-card__like-icon`).addEventListener('click', this.like);
      this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    }
  
    like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
  
    create(name, link) {
  
      //тело карточки
      const cardBody = document.createElement('div');
      cardBody.classList.add('place-card');
      cardBody.setAttribute('data-owner_id', this.ownerId);
      cardBody.setAttribute('data-card_id', this.cardId);
  
      // верхняя часть карточки с картинкой
      const cardBackground = document.createElement('div');
      cardBackground.classList.add('place-card__image');
      cardBackground.style.backgroundImage = `url(${link})`;
  
      cardBackground.setAttribute("imgUrl", link); 
  
      const cardDeleteButton = document.createElement('button');
      cardDeleteButton.classList.add('place-card__delete-icon');
  
      if(this.ownerId === 'eaca96eb00e145a66cbad0bb'){
        cardDeleteButton.style.display = 'block';
      }
  
      cardBackground.appendChild(cardDeleteButton);
  
      //нижняя часть карточки
      const cardFooter = document.createElement('div');
      cardFooter.classList.add('place-card__description');
  
      const cardName = document.createElement('h3');
      cardName.classList.add('place-card__name')
      cardName.textContent = name;
  
      const cardLikeButton = document.createElement('button');
      cardLikeButton.classList.add('place-card__like-icon');
  
      const likeCounter = document.createElement('p');
      likeCounter.classList.add('place-card__like-counter');
      likeCounter.textContent = this.likes.length;
  
      const likeContainer = document.createElement('div');
      likeContainer.classList.add('place-card__like-container');
  
      likeContainer.appendChild(cardLikeButton);
      likeContainer.appendChild(likeCounter);
  
      cardFooter.appendChild(cardName);
      cardFooter.appendChild(likeContainer);
  
      //помещаем все в тело карточки
      cardBody.appendChild(cardBackground);
      cardBody.appendChild(cardFooter);
  
  
      return cardBody;
    }
  
    remove() {
      const card = event.target.closest('.place-card');
      const deleteId = card.getAttribute('data-card_id');
  
      api.deleteCard(deleteId)
        .then(card.parentNode.removeChild(card))
  
      this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
      this.cardElement.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
    }
  }