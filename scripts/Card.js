export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    //!!Передавайте handleCardClick в конструктор класса Card OK
    this._handleCardClick = handleCardClick;
  }
  //  Функция взять разметку из HTML и клонировать элемент
  _getTemplate() {
    const cardPlace = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    // возврат DOM-элемент карточки
    return cardPlace;
  }
  //функция поставить лайк
  _handleLikeClick() {
    /*!!Все элементы, которые используются в нескольких разных методах классов или поиск которых осуществляется при каждом срабатывании метода, желательно найти 1 раз  OK*/
    this._likeButton.classList.toggle('element__like_active');
  }
  //функция удалить карточку
  _handleDelPlaceClick() {
    this._cardPlace.querySelector('.element__delete').closest('.element').remove();
  }
  ////функция открыть попап с полным изображением
  /* 
  _handleImageClick() {
    this._popupImage.alt = this._name;
    this._popupImage.src = this._link;
    this._popupCaption.textContent = this._name;
    openPopup(this._popupFullImg);
  } 
  */
  //функция установить слушателей событий
  _setEventListeners() {
    /*!!Все элементы, которые используются в нескольких разных методах классов или поиск которых осуществляется при каждом срабатывании метода, желательно найти 1 раз OK*/
    this._likeButton = this._cardPlace.querySelector('.element__like');
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });
    /*!!Все элементы, которые используются в нескольких разных методах классов или поиск которых осуществляется при каждом срабатывании метода, желательно найти 1 раз OK*/
    this._deleteButton = this._cardPlace.querySelector('.element__delete');
    this._deleteButton.addEventListener('click', () => {
      this._handleDelPlaceClick();
    });
    //!! _handleCardClic теперь в _setEventListeners навешивайте на элемент картинки его OK
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
  //метод generateCard подготовит карточку к публикации
  generateCard() {
    this._cardPlace = this._getTemplate();
    /*!!Все элементы, которые используются в нескольких разных методах классов или поиск которых осуществляется при каждом срабатывании метода, желательно найти 1 раз  OK*/
    this._cardImage = this._cardPlace.querySelector('.element__img');
    this._cardPlace.querySelector('.element__caption').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    // возврат карточки с текстом и картинкой
    return this._cardPlace;
  }
}
