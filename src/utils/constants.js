//=============================Переменные=========
export const configuration = {
  formSelector: '.popup__form',
  inputTextSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__error_active'
};
export const optionsApi = {
  //Адрес сервера проекта Mesto
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  // информации о пользователе с сервера
  urlUser: '/users/me',
  //автар пользователя с сервера
  urlAvatar: '/users/me/avatar',
  // начальные карточки с сервера
  urlCards: '/cards',
  headers: {
    authorization: '75e10885-ab4a-4ce4-a42e-f0872951e9bf',
    'Content-Type': 'application/json'
  }
};
export const optionsUserInfo = {
  profileName: document.querySelector('.profile__name'),
  profileDescription: document.querySelector('.profile__description'),
  profileAvatar: document.querySelector('.profile__avatar')
};
export const buttonEditeProfile = document.querySelector('.profile__edite-button');
export const buttonAddPlace = document.querySelector('.profile__add-button');
export const buttonAvatarEdit = document.querySelector('.profile__avatar-edite');
export const page = document.querySelector('.page');
