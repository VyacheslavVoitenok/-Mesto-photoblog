`use strict`;

import "./pages/index.css'";

import CardList from './modules/classCardList.js';
import Api from './modules/classApi.js';
import Validation from './modules/classValidation.js';
import Popup from './modules/classPopup.js'
import { errorMessages } from './modules/ErrorMessages.js'

/*
Переменные
*/

const root = document.querySelector('.root'); //тело страницы
const newPlaceWindow = root.querySelector('.popup'); //окно добавления новой карточки
const addButton = root.querySelector('.user-info__button'); //кнопка открытия окна добавления карточки
const closeButton = root.querySelector('.popup__close'); //кнопка закрытия окна для добавления 
const addNewCard = root.querySelector('.popup__button'); //кнопка добавления новой карточки
const likeIcon = root.querySelector('.place-card__like-icon'); //кнопка лайка
const likeCounter = root.querySelector('place-card__like-container');
const placesList = root.querySelector('.places-list'); //контейнер с карточками
const profileButton = root.querySelector('.user-info__profile-button');//кнопка редактирования профиля
const deleteButton = root.querySelector('.place-card__delete-icon');
const NewPlaceInputs = root.querySelectorAll(`.popup__content_new-place`); // все инпуты окна добавления карточки

const profileName = root.querySelector('.user-info__name'); //имя пользователя
const profileJob = root.querySelector('.user-info__job'); // род деятельности пользователя
const photoArea = root.querySelector('.popup_photo'); //попап с увеличенной по клику картинкой (затемнение фона)
const imageLarge = root.querySelector('.popup_photo__picture'); // увеличенная по клику картинка
const imageLargeClose = root.querySelector('.popup_photo__close'); // кнопка закрытия попапа с картинкой

const profileInfo = root.querySelector('.popup_profile'); //окно редактирования профиля
const profileCloseButton = root.querySelector('.popup_profile__close'); //кнопка закрытия окна редактирования профиля
const profileForm = root.querySelector('.popup__form'); // форма профиля
const profileNameInput = root.querySelector('.popup__input_profile_name'); // инпут с именем в профиле
const profileOccupationInput = root.querySelector('.popup__input_profile_occupation'); // инпут с родом занятий в профиле
const profileSaveButton = root.querySelector('.popup_profile__save-button'); //кнопка сохранения инфы профиля
const userName = root.querySelector('.user-info__name'); //имя аккаунта
const userOccupation = root.querySelector('.user-info__job'); // родя занятий

const form = document.forms.new; //форма добавления новой карточки
const profileForms = document.forms.profile; // форма редактирования профиля



/* 
Экземпляры классов
*/

const popup = new Popup(newPlaceWindow, 'popup_is-opened', closeButton); //создаем окно добавления новой карточки
const popupEdit = new Popup(profileInfo, 'popup_is-opened', profileCloseButton); // создаем окно редактирования профиля

const validation = new Validation(errorMessages); // объект для валидации инпутов

// Объект для работы с API
const api = new Api({
  baseUrl: 'http://95.216.175.5/cohort6',
  headers: {
    authorization: '3ed8c633-9c79-4f37-9ab9-ece399fdbd14',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
  .then(res => {
    profileName.textContent = res.name;
    profileJob.textContent = res.about;
})
  .catch(err => {
    console.log(err);
})

api.getInitialCards()
  .then(res => {
    const resArray = res;
    let createImageCards = new CardList(placesList, res);
    createImageCards.render(resArray);
    
})
  .catch(err => {
    console.log(err);
})

// Функции
// заменяет текущее имя аккаунта и работу на введеные
function profileEditor(event) {
  if(event.target.classList.contains('popup_profile__save-button')) {
    event.preventDefault();

    api.updateUserInfo(profileForms.elements.name.value, profileForms.elements.occupation.value)
      .then(res => {
            profileName.textContent = profileForms.elements.name.value
            profileJob.textContent = profileForms.elements.occupation.value
            popupEdit.close()
      })
      .catch(err => console.log(err))
  }
}

//открывает окно добавления карточки
function openNewPlaceWindow(event) {
  popup.open();
}

//закрывает окно добавления карточки
function closeNewPlaceWindow(event) {
  popup.close();
}

//открываем окно с картинкой по клику на нее
function imagePopup() {
  if (event.target.classList.contains('place-card__image')) {
    const img = event.target.getAttribute('imgUrl');
    imageLarge.setAttribute('src', img);
    photoArea.classList.add('popup_is-opened');
  }
}

//закрываем окно с большой картинкой
function imagePopupClose() {
  photoArea.classList.remove('popup_is-opened');
}

//обработчики событий
//открываем окно добавления новой карточки
addNewCard.addEventListener('click', () => {
  popup.open();
})

//открываем окно профиля, в инпуты вставляем имя и работу по умолчанию
profileButton.addEventListener('click', () => {
  popupEdit.open();
  profileNameInput.value = profileName.textContent;
  profileOccupationInput.value = profileJob.textContent;
})

//добавляем новую карточку и закрываем окно после добавления
profileForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const cardToAdd = new CardList(placesList); // создаем экземпляр класса CardList

  api.createNewCard(form.elements.name.value, form.elements.link.value)
    .then(data => {
          cardToAdd.addCard(data) // с помощью метода addCard класса CardList добавляем карточку к остальным без перезагрузки страницы
          addNewCard.disabled = true
          profileForm.reset()
          popup.close()})

    .catch(err => console.log(err))
});

//Валидируем инпуты
NewPlaceInputs.forEach((input) => {

    input.addEventListener('input', () => {
      validation.inputValidate(input);
      validation.checkFildsEditForm(addNewCard);
    })
});

addButton.addEventListener('click', openNewPlaceWindow); //обработчик кнопки, открывающей окно добавления карточки

placesList.addEventListener('click', imagePopup);//обработчик кнопок лайка/удаления
imageLargeClose.addEventListener('click', imagePopupClose) //закрытие окна с попапом картинки
profileInfo.addEventListener('click', profileEditor); //Сохраняет изменения в профиле