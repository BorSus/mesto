import { data } from 'autoprefixer';
export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._urlUser = options.urlUser;
    this._urlCards = options.urlCards;
    this._urlAvatar = options.urlAvatar;
  }
  //Загрузка карточек с сервера
  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}${this._urlCards}`, {
      headers: this._headers
    });
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
  //Загрузка информации о пользователе с сервера
  async getUserInfo() {
    const response = await fetch(`${this._baseUrl}${this._urlUser}`, {
      headers: this._headers
    });

    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
  // Редактирование профиля  пользователя на сервере
  async patchUserInfo(data) {
    const response = await fetch(`${this._baseUrl}${this._urlUser}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
  // Редактирование аватара  пользователя на сервере
  async patchUserAvatar(data) {
    const response = await fetch(`${this._baseUrl}${this._urlAvatar}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    });
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
  //Добавление новой карточки на сервер
  async postNewCard(data) {
    const response = await fetch(`${this._baseUrl}${this._urlCards}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
  //Удаление карточки на сервере
  async deleteCard(cardId) {
    const response = await fetch(`${this._baseUrl}${this._urlCards}${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });

    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    //console.info(response);
    return response.json();
  }
  //Добавление лайка на сервере
  async putLike(cardId) {
    const response = await fetch(`${this._baseUrl}${this._urlCards}${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
    //console.info(response);
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
  //Удаление лайка на сервере
  async deleteLike(cardId) {
    const response = await fetch(`${this._baseUrl}${this._urlCards}${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
    //console.info(response);
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
}
