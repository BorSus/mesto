import { Popup } from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, functionSubmitForm) {
    super(popupSelector);
    this._functionSubmitForm = functionSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__save');
    this._inputsArray = Array.from(this._form.querySelectorAll('.popup__input-text'));
    this._submitButtonTextContent = this._popup.querySelector('.popup__save').textContent;
  }
  //метод собирает данные всех полей формы.
  _getInputValues() {
    const dataInputValues = {};
    this._inputsArray.forEach(input => {
      dataInputValues[input.getAttribute('name')] = input.value;
    });
    return dataInputValues;
  }
  setSubmitButtonLoading() {
    this._submitButton.textContent = 'Сохранение...';
    this._submitButton.classList.add('popup__save_type_loading');
  }
  unsetSubmitButtonLoading() {
    this._submitButton.textContent = this._submitButtonTextContent;
    this._submitButton.classList.remove('popup__save_type_loading');
  }
  //метод принимает объект с данными  для установки в input формы.
  setInputValues(data) {
    this._inputsArray.forEach(input => {
      // ключ переданного объекта совпадает с input.name, то значение записываем в input.value
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._functionSubmitForm(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
