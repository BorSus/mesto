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
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardsFrame = document.querySelector('.elements');
const cardPlace = document.querySelector('#card-place').content.querySelector('.element');
// PopupImage
const fullImgPopup = document.querySelector('#popupFullImg');
const buttonCloseImage = document.querySelector('#closeImage');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
//кнопка редактирования профиля
const buttonEditeProfile = document.querySelector('.profile__edite-button');
// PopupProfile
const profilePopup = document.querySelector('#popupProfile');
const buttonCloseProfile = document.querySelector('#closeProfile');
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
const buttonClosePlace = document.querySelector('#closePlace');
const formPlace = document.querySelector('#formPlace');
const inputPlacename = document.querySelector('#inputPlacename');
const inputImageLink = document.querySelector('#inputImageLink');
const buttonSavePlace = document.querySelector('#savePlace');

//============================Функции=============
//функция поставить лайк
const handleLikeClick = function (evt) {
  evt.target.classList.toggle('element__like_active');
};
//функция удалить карточку
const handleDelPlaceClick = function (evt) {
  evt.target.closest('.element').remove();
};
//функция открыть попап с полным изображением
const openPopupImage = function (evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openPopup(fullImgPopup);
};
// функция создать новое Место
function addPlace(cardData) {
  const element = cardPlace.cloneNode(true);
  const buttonDeletePlace = element.querySelector('.element__delete');
  const image = element.querySelector('.element__img');
  const caption = element.querySelector('.element__caption');
  image.src = cardData.link;
  caption.textContent = cardData.name;
  image.alt = cardData.name;
  //добавить событие для кнопки ЛАЙК
  element.querySelector('.element__like').addEventListener('click', handleLikeClick);
  //добавить событие для кнопки УДАЛИТЬ
  buttonDeletePlace.addEventListener('click', handleDelPlaceClick);
  //добавить событие для клика по КАРТИНКЕ
  image.addEventListener('click', openPopupImage);
  return element;
}
// функция добавить новое Место
function renderCard(card) {
  cardsFrame.prepend(addPlace(card));
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
  renderCard(cardData);
  formPlace.reset();
  /* Добавление класса и атрибута disabled, не нужно. по событию reset проверяется валидация кнопки
  buttonSavePlace.classList.add('popup__save_type_disabled');
  //!!Чтобы кнопка сабмита деактивировалась, нужно еще добавлять ей атрибут disabled OK
  buttonSavePlace.setAttribute('disabled', '');
  */
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
    // handlePopupKeydownEsc(popup, config.openPopupClass);
    handleButtonCloseClick(popup, config.closeButtonSelector);
  });
};

// перебор массива, добавление мест из  initialCards
initialCards.forEach(item => renderCard(item));
//назначить событию обработчик
addEventListenersClose({
  popupSelector: '.popup',
  closeButtonSelector: '.popup__close'
});
buttonEditeProfile.addEventListener('click', openPopupProfile);
formProfile.addEventListener('submit', savePopupProfile);
buttonAddPlace.addEventListener('click', () => openPopup(placePopup));
formPlace.addEventListener('submit', savePopupPlace);

/*const handlePopupKeydownEsc = (popup, openPopupClass) => {
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && popup.classList.contains(openPopupClass)) {
      closePopup(popup);
    }
  });
};
*/
