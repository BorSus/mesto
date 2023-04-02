export class FormValidator {
  constructor(configuration, form) {
    //this._formSelector = config.formSelector;
    this._inputTextSelector = configuration.inputTextSelector;
    this._submitButtonSelector = configuration.submitButtonSelector;
    this._inactiveButtonClass = configuration.inactiveButtonClass;
    this._inputErrorClass = configuration.inputErrorClass;
    this._errorClass = configuration.errorClass;
    this._form = form;
  }

  //метод показывает ошибку при вводе input
  _showInputError(inputForm, errorText) {
    //выбрать span для вывода текста ошибки
    this._errorSpan = this._form.querySelector(`#${inputForm.id}-error`);
    //добавить в input стиль ошибки
    inputForm.classList.add(this._inputErrorClass);
    //добавить текст ошибки в span
    this._errorSpan.classList.add(this._errorClass);
    this._errorSpan.textContent = errorText;
  }

  //метод скрывает ошибку ввода input
  _hideInputError(inputForm) {
    //выбрать span для вывода текста ошибки
    this._errorSpan = this._form.querySelector(`#${inputForm.id}-error`);
    //удалить  из input стиль ошибки
    inputForm.classList.remove(this._inputErrorClass);
    //убрать текст ошибки в span
    this._errorSpan.classList.remove(this._errorClass);
    this._errorSpan.textContent = '\u00A0';
  }

  //метод проверяет валидность input-text внутри формы
  _checkInputValidity(inputForm) {
    if (!inputForm.validity.valid) {
      this._showInputError(inputForm, inputForm.validationMessage);
    } else {
      this._hideInputError(inputForm);
    }
  }

  //метод проверяет валидность всех input внутри формы
  _checkFormValidity() {
    return this._inputFormList.some(inputForm => {
      return !inputForm.validity.valid;
    });
  }
  //метод скрывает|показывает кнопку submit в зависимости от валидности формы
  _switchButtonSave() {
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    if (this._checkFormValidity()) {
      submitButton.setAttribute('disabled', '');
      submitButton.classList.add(this._inactiveButtonClass);
    } else {
      submitButton.removeAttribute('disabled');
      submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  //метод добавляет события для элементов внутри формы
  _setEventListeners() {
    //создать массив элементов input внутри формы
    this._inputFormList = Array.from(this._form.querySelectorAll(this._inputTextSelector));
    // отменить действия браузера по умолчанию
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    //добавляем событие reset на форму, при сохранении срабатывает reset form и кнопка становится не активной
    this._form.addEventListener('reset', () => {
      setTimeout(() => {
        this._switchButtonSave(), 0;
      });
    });
    //для каждого input элемента внутри формы добавить событие по проверке валидности
    this._inputFormList.forEach(inputForm => {
      inputForm.addEventListener('input', () => {
        this._checkInputValidity(inputForm);
        this._switchButtonSave();
      });
    });
  }
  //метод  включает валидацию формы
  enableValidation() {
    this._setEventListeners();
  }
}
