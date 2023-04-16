import { Popup } from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._name = this._popup.querySelector('.popup__caption');
    this._img = this._popup.querySelector('.popup__image');
  }
  // методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
  open(name, link) {
    super.open();
    this._name.textContent = name;
    this._img.alt = name;
    this._img.src = link;
  }
}
