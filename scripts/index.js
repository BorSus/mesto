//==========================import=======
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
//=============================Переменные=========
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const configuration = {
  inputTextSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__error_active'
};

const popupFormList = document.querySelectorAll('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardsFrame = document.querySelector('.elements');
const buttonEditeProfile = document.querySelector('.profile__edite-button');
// PopupProfile
const profilePopup = document.querySelector('#popupProfile');
//const buttonCloseProfile = document.querySelector('#closeProfile');
const formProfile = document.querySelector('#formProfile');
const inputName = document.querySelector('#inputName');
const inputDescription = document.querySelector('#inputDescription');
const inputNameError = document.querySelector('#inputName-error');
const inputDescriptionError = document.querySelector('#inputDescription-error');
const buttonSaveProfile = document.querySelector('#saveProfile');
//кнопка добавления места
const buttonAddPlace = document.querySelector('.profile__add-button');
// PopupPlace
const placePopup = document.querySelector('#popupPlace');
const formPlace = document.querySelector('#formPlace');
const inputPlacename = document.querySelector('#inputPlacename');
const inputImageLink = document.querySelector('#inputImageLink');

//============================Функции=============

// функция добавить в HTML разметку карточку с новым Местом
function renderCard(card) {
  cardsFrame.prepend(card);
}
//функция закрыть popup по нажатию ESC
const closePopupKeydownEsc = e => {
  if (e.code === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};
//закрыть Popup
const closePopup = function (namePopup) {
  namePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeydownEsc);
};
//открыть Popup
const openPopup = function (namePopup) {
  namePopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeydownEsc);
};
//открыть PopupProfile
function openPopupProfile() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  inputNameError.classList.remove('popup__error_active');
  inputDescriptionError.classList.remove('popup__error_active');
  inputName.classList.remove('popup__input-text_type_error');
  inputDescription.classList.remove('popup__input-text_type_error');
  buttonSaveProfile.classList.add('popup__save_type_disabled');
  buttonSaveProfile.setAttribute('disabled', '');
  openPopup(profilePopup);
}
//сохранить изменения и закрыть PopupProfile
function savePopupProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(profilePopup);
}
//сохранить изменения и закрыть PopupPlace
function savePopupPlace(evt) {
  evt.preventDefault();
  const cardData = {
    name: inputPlacename.value,
    link: inputImageLink.value
  };
  const card = new Card(cardData, '#card-place');
  const cardPlace = card.generateCard();
  renderCard(cardPlace);
  formPlace.reset();
  closePopup(placePopup);
}
//функция закрыть popup по клику на оверлай
const handleOverlaypopupClick = popup => {
  popup.addEventListener('click', e => {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
};

//функция добавления события на кнопку закрыть popup
const handleButtonCloseClick = (popup, closeButtonSelector) => {
  const buttonClose = popup.querySelector(closeButtonSelector);
  buttonClose.addEventListener('click', () => closePopup(popup));
};
//функция добавление событий закрытия popup
const addEventListenersClose = config => {
  //найти все popup
  const popupArray = Array.from(document.querySelectorAll(config.popupSelector));
  popupArray.forEach(popup => {
    handleOverlaypopupClick(popup);
    handleButtonCloseClick(popup, config.closeButtonSelector);
  });
};

// перебор массива, добавление мест из  initialCards
initialCards.forEach(item => {
  const card = new Card(item, '#card-place');
  //console.log(card.data);
  const cardPlace = card.generateCard();
  // console.log(cardPlace);
  renderCard(cardPlace);
});

//перебор массива со всеми popup на странице и включение валидации
Array.from(popupFormList).forEach(popupFormItem => {
  const popupForm = new FormValidator(configuration, popupFormItem);
  popupForm.enableValidation();
});

//назначить событию обработчик
addEventListenersClose({
  popupSelector: '.popup',
  closeButtonSelector: '.popup__close'
});
buttonEditeProfile.addEventListener('click', openPopupProfile);
formProfile.addEventListener('submit', savePopupProfile);
buttonAddPlace.addEventListener('click', () => openPopup(placePopup));
formPlace.addEventListener('submit', savePopupPlace);
export { openPopup };
