import { data } from 'autoprefixer';

export class Card {
  constructor(data, templateSelector, handleCardClick, handleDelClick, handleLikeClick, idMe) {
    this._name = data.name;
    this._link = data.link;
    this.id = `/${data._id}`;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._idMe = idMe;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelClick = handleDelClick;
    this._handleLikeClick = handleLikeClick;
    this._cardPlace = null;
    this.isLikedCard = this._likes.some(item => item._id === this._idMe);
    this.likeActiveClass = 'element__like_active';
  }
  // метод взять разметку из HTML и клонировать элемент
  _getTemplate() {
    const cardPlace = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardPlace;
  }
  //метод удалить карточку
  deleteCard() {
    this._cardPlace.remove();
    this._cardPlace = null;
  }
  //метод установить счетчик лайков
  setLikeScore(array) {
    this._cardPlace.querySelector('.element__like-score').textContent = array.length;
  }
  //метод установить лайк
  setLike() {
    this._likeButton.classList.add(this.likeActiveClass);
    this.isLikedCard = true;
  }
  //метод удалить лайк
  deleteLike() {
    this._likeButton.classList.remove(this.likeActiveClass);
    this.isLikedCard = false;
  }
  //метод установить слушателей событий
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDelClick(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
  //метод generateCard подготовит карточку к публикации
  generateCard() {
    this._cardPlace = this._getTemplate();
    this._likeButton = this._cardPlace.querySelector('.element__like');
    this._deleteButton = this._cardPlace.querySelector('.element__delete');
    this._cardImage = this._cardPlace.querySelector('.element__img');
    this._cardPlace.querySelector('.element__caption').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    if (this.isLikedCard) {
      this.setLike();
    }
    this.setLikeScore(this._likes);
    if (this._idMe === this._ownerId) {
      this._deleteButton.classList.remove('element__delete_hide');
    }
    this._setEventListeners();
    return this._cardPlace;
  }
}
