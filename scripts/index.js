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
//!!Если добавить слово button ко всем кнопкам - станет яснее, что это кнопки. OK
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardsFrame = document.querySelector('.elements');
const cardPlace = document.querySelector('#card-place').content.querySelector('.element');
//const buttonDeletePlace = document.querySelector('.element__delete');
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
//кнопка добавления места
const buttonAddPlace = document.querySelector('.profile__add-button');
// PopupPlace
const placePopup = document.querySelector('#popupPlace');
const buttonClosePlace = document.querySelector('#closePlace');
const formPlace = document.querySelector('#formPlace');
const inputPlacename = document.querySelector('#inputPlacename');
const inputImageLink = document.querySelector('#inputImageLink');

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
  //!!В качестве второго параметра метода addEventListener следует использовать ранее объявленую функцию. OK
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

//закрыть Popup
const closePopup = function (namePopup) {
  namePopup.classList.remove('popup_opened');
};
//открыть Popup
const openPopup = function (namePopup) {
  namePopup.classList.add('popup_opened');
};

//закрыть PopupProfile
function closePopupProfile(evt) {
  evt.preventDefault();
  closePopup(profilePopup);
  inputName.value = '';
  inputDescription.value = '';
}

//открыть PopupProfile
function openPopupProfile() {
  openPopup(profilePopup);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

//сохранить изменения и закрыть PopupProfile
function savePopupProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(profilePopup);
}

//закрыть PopupPlace
function closePopupPlace() {
  formPlace.reset();
  closePopup(placePopup);
}

//сохранить изменения и закрыть PopupPlace
function savePopupPlace(evt) {
  evt.preventDefault();
  const cardData = {
    name: inputPlacename.value,
    link: inputImageLink.value
  };
  renderCard(cardData);
  //!!Очищать поля формы можно с помощью метода формы reset OK
  formPlace.reset();
  closePopup(placePopup);
}

// перебор массива, добавление мест из  initialCards
initialCards.forEach(item => renderCard(item));

//назначить событию обработчик
buttonCloseProfile.addEventListener('click', closePopupProfile);
buttonEditeProfile.addEventListener('click', openPopupProfile);
formProfile.addEventListener('submit', savePopupProfile);
buttonAddPlace.addEventListener('click', () => openPopup(placePopup));
buttonClosePlace.addEventListener('click', closePopupPlace);
formPlace.addEventListener('submit', savePopupPlace);
buttonCloseImage.addEventListener('click', () => closePopup(fullImgPopup));
