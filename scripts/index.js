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
const deletePlace = document.querySelector('.element__delete');
// PopupImage
const imagePopup = document.querySelector('#popupImage');
const closeImage = document.querySelector('#closeImage');
//кнопка редактирования профиля
const editeProfile = document.querySelector('.profile__edite-button');
// PopupProfile
const profilePopup = document.querySelector('#popupProfile');
const closeProfile = document.querySelector('#closeProfile');
const formProfile = document.querySelector('#formProfile');
const inputName = document.querySelector('#inputName');
const inputDescription = document.querySelector('#inputDescription');
//кнопка добавления места
const addPlaceButton = document.querySelector('.profile__add-button');
// PopupPlace
const placePopup = document.querySelector('#popupPlace');
const closePlace = document.querySelector('#closePlace');
const formPlace = document.querySelector('#formPlace');
const inputPlacename = document.querySelector('#inputPlacename');
const inputImageLink = document.querySelector('#inputImageLink');

// функция добавить Место
function addPlace(placename, linkImage) {
  const cardImage = document.querySelector('#card-image').content;
  const element = cardImage.querySelector('.element').cloneNode(true);
  const placeDel = element.querySelector('.element__delete');
  element.querySelector('.element__img').src = linkImage;
  element.querySelector('.element__caption').textContent = placename;
  element.querySelector('.element__img').alt = placename;
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  placeDel.addEventListener('click', function (evt) {
    const placeCardDelete = evt.target.closest('.element');
    placeCardDelete.remove();
  });
  element.querySelector('.element__img').addEventListener('click', function () {
    document.querySelector('.popup__image').src = linkImage;
    document.querySelector('.popup__caption').textContent = placename;
    document.querySelector('.popup__image').alt = placename;
    openPopup(imagePopup);
  });

  document.querySelector('.elements').prepend(element);
}
// перебор массива, добавление мест из  initialCards
initialCards.forEach(item => addPlace(item.name, item.link));

//закрыть Popup
const closePopup = function (namePopup) {
  namePopup.classList.remove('popup_opened');
};
//открыть Popup
function openPopup(namePopup) {
  namePopup.classList.add('popup_opened');
}

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

//открыть PopupPlace
function openPopupPlace() {
  openPopup(placePopup);
}
//закрыть PopupPlace
function closePopupPlace() {
  inputPlacename.value = '';
  inputImageLink.value = '';
  closePopup(placePopup);
}
//сохранить изменения и закрыть PopupPlace
function savePopupPlace(evt) {
  evt.preventDefault();
  if (inputPlacename.value === '') {
    alert('Отсутствует назавание места');
  } else if (inputImageLink.value == '') {
    alert('Отсутствует ссылка на изображение места');
  } else {
    console.log(inputName.value);
    addPlace(inputPlacename.value, inputImageLink.value);
    inputPlacename.value = '';
    inputImageLink.value = '';
    closePopup(placePopup);
  }
}

closeProfile.addEventListener('click', closePopupProfile);
editeProfile.addEventListener('click', openPopupProfile);
formProfile.addEventListener('submit', savePopupProfile);
addPlaceButton.addEventListener('click', openPopupPlace);
closePlace.addEventListener('click', closePopupPlace);
formPlace.addEventListener('submit', savePopupPlace);
closeImage.addEventListener('click', () => closePopup(imagePopup));
