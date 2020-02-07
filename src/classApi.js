`use strict`;

export default class Api {
    constructor({ baseUrl, headers }) {
      this.baseUrl = baseUrl;
      this.headers = headers;
    }
  
    //получить существующие на сервере карточки
    getInitialCards(){
      return fetch(`${this.baseUrl}/cards`, {
        headers: this.headers
      })
      .then(res => this._getResponseData(res))
    }
  
    //получить информацию о пользователе
    getUserInfo(){
      return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers
    })
    .then(res => this._getResponseData(res))
  
  }
  
    //изменить инфу аккаунта на введеную
    updateUserInfo(name, about){
      return fetch(`${this.baseUrl}/users/me`, {
        method: `PATCH`,
        headers: this.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        })
      })
      .then(res => this._getResponseData(res))
    }
  
    //добавить новую карточку
    createNewCard(name, link){
      return fetch(`${this.baseUrl}/cards`, {
        method: `POST`,
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
        .then(res => this._getResponseData(res))
    }
  
    deleteCard(deleteId){
      return fetch(`${this.baseUrl}/cards/${deleteId}`, {
        method: `DELETE`,
        headers: this.headers,
      })
      .then(res => this._getResponseData(res))
    }
  
    likeCard(cardId){
      return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
        method: `PUT`,
        headers: this.headers,
      })
      .then(res => this._getResponseData(res))
  }
  
    unlikeCard(cardId){
      return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
        method: `DELETE`,
        headers: this.headers,
      })
      .then(res => this._getResponseData(res))
    }
  
    _getResponseData(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }