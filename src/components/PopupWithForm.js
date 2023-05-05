import { Popup } from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, functionSubmitForm) {
    super(popupSelector);
    this._functionSubmitForm = functionSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputsArray = Array.from(this._form.querySelectorAll('.popup__input-text'));
  }
  //метод собирает данные всех полей формы.
  _getInputValues() {
    const dataInputValues = {};
    this._inputsArray.forEach(input => {
      dataInputValues[input.getAttribute('name')] = input.value;
    });
    return dataInputValues;
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
      console.log(this._getInputValues());
      this._functionSubmitForm(this._getInputValues());
      this.close();
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
