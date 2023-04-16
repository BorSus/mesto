export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._openPopupClass = 'popup_opened';
    this._popupCloseIcon = this._popup.querySelector('.popup__close');
    // устанавливаем привязанную функцию к this._handleEscClose, чтобы удалить ее позже
    this._handleEscClose = this._closeByEsc.bind(this);
  }
  //метод  отвечает за открытие  попапа.
  open() {
    this._popup.classList.add(this._openPopupClass);
    //console.log('я открыл попап');
    document.addEventListener('keydown', this._handleEscClose);
  }
  //метод  отвечает за закрытие  попапа.
  close() {
    this._popup.classList.remove(this._openPopupClass);
    document.removeEventListener('keydown', this._handleEscClose);
    // console.log('я закрыл попап');
  }
  //метод который содержит логику закрытия попапа клавишей Esc
  _closeByEsc(evt) {
    if (evt.code === 'Escape') {
      // console.log('закрыть на Esc');
      this.close();
    }
  }
  //метод  который  добавляет слушатель клика на затемнённую область вокруг формы
  _handleOverlaypopupClick() {
    this._popup.addEventListener('click', e => {
      if (e.target === this._popup) {
        // console.log('закрыть по оверлай');
        this.close();
      }
    });
  }
  //метод который  добавляет слушатель клика иконке закрытия попапа.
  _handleButtonCloseClick() {
    this._popupCloseIcon.addEventListener('click', () => {
      // console.log('закрыть по иконке');
      this.close();
    });
  }

  setEventListeners() {
    this._handleButtonCloseClick();
    this._handleOverlaypopupClick();
  }
}
