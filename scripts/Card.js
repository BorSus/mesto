import { openPopup } from './index.js';
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    this._cardPlace.querySelector('.element__like').classList.toggle('element__like_active');
  }
  //функция удалить карточку
  _handleDelPlaceClick() {
    this._cardPlace.querySelector('.element__delete').closest('.element').remove();
  }
  ////функция открыть попап с полным изображением
  _handleImageClick() {
    const popupImage = document.querySelector('.popup__image');
    popupImage.src = this._link;
    popupImage.alt = this._name;
    document.querySelector('.popup__caption').textContent = this._name;
    const fullImgPopup = document.querySelector('#popupFullImg');
    openPopup(fullImgPopup);
  }
  //функция установить слушателей событий
  _setEventListeners() {
    this._cardPlace.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._cardPlace.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDelPlaceClick();
    });
    this._cardPlace.querySelector('.element__img').addEventListener('click', () => {
      this._handleImageClick();
    });
  }
  //метод generateCard подготовит карточку к публикации
  generateCard() {
    this._cardPlace = this._getTemplate();
    this._setEventListeners();
    this._cardPlace.querySelector('.element__caption').textContent = this._name;
    this._cardPlace.querySelector('.element__img').src = this._link;
    // возврат карточки с текстом и картинкой
    return this._cardPlace;
  }
}
