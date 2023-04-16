export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  // метод взять разметку из HTML и клонировать элемент
  _getTemplate() {
    const cardPlace = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardPlace;
  }
  //метод поставить лайк
  _handleLikeClick() {
    this._likeButton.classList.toggle('element__like_active');
  }
  //метод удалить карточку
  _handleDelPlaceClick() {
    this._cardPlace.querySelector('.element__delete').closest('.element').remove();
  }
  //метод установить слушателей событий
  _setEventListeners() {
    this._likeButton = this._cardPlace.querySelector('.element__like');
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(evt);
    });
    this._deleteButton = this._cardPlace.querySelector('.element__delete');
    this._deleteButton.addEventListener('click', () => {
      this._handleDelPlaceClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
  //метод generateCard подготовит карточку к публикации
  generateCard() {
    this._cardPlace = this._getTemplate();
    this._cardImage = this._cardPlace.querySelector('.element__img');
    this._cardPlace.querySelector('.element__caption').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    // возврат карточки с текстом и картинкой
    return this._cardPlace;
  }
}
