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
    console.log(dataInputValues);
    return dataInputValues;
  }
  //метод принимает объект с данными  для установки в input формы.
  setInputValues(data) {
    console.log(this._inputsArray);
    this._inputsArray.forEach(input => {
      // ключ переданного объекта совпадает с input.name, то значение записываем в input.value
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }
  //Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._functionSubmitForm(this._getInputValues());
      this.close();
    });
  }
  close() {
    super.close();
    //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
    this._form.reset();
  }
}
