//=======================валидация
//функция показать  ошибку ввода input
const showInputError = (form, formInput, errorText, inputErrorClass, errorClass) => {
  //выбрать span для вывода текста ошибки
  const errorSpan = form.querySelector(`#${formInput.id}-error`);
  //добавить input стиль ошибки
  formInput.classList.add(inputErrorClass);
  //добавить текст ошибки в span
  errorSpan.textContent = errorText;
  errorSpan.classList.add(errorClass);
};
//функция скрыть ошибку ввода input
const hideInputError = (form, formInput, inputErrorClass, errorClass) => {
  //выбрать span для вывода текста ошибки
  const errorSpan = form.querySelector(`#${formInput.id}-error`);
  //удалить input стиль ошибки
  formInput.classList.remove(inputErrorClass);
  //убрать текст ошибки в span
  errorSpan.classList.remove(errorClass);
  errorSpan.textContent = '\u00A0';
};
//функция проверить валидность всех input внутри формы
const checkFormValidity = inputList => {
  return inputList.some(formInput => {
    return !formInput.validity.valid;
  });
};
//функция скрыть|показать кнопку submit в зависимости от валидации формы
const switchButtonSave = (inputList, button, inactiveButtonClass) => {
  if (checkFormValidity(inputList)) {
    button.classList.add(inactiveButtonClass);
  } else button.classList.remove(inactiveButtonClass);
};
//функция проверить валидность input-text внутри формы
const checkInputValidity = (form, formInput, inputErrorClass, errorClass) => {
  if (!formInput.validity.valid) {
    showInputError(form, formInput, formInput.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(form, formInput, inputErrorClass, errorClass);
  }
};
//функция добавить события для каждого input-text  внутри формы
const setEventListeners = (
  form,
  inputTextSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  // найти все input-text внутри popup__form
  const inputList = Array.from(form.querySelectorAll(inputTextSelector));
  //найти кнопку submit внутри popup__form
  const buttonSave = form.querySelector(submitButtonSelector);
  // добавить событие для каждого  input-text внутри popup__form
  inputList.forEach(inputItem => {
    inputItem.addEventListener('input', function () {
      checkInputValidity(form, inputItem, inputErrorClass, errorClass);
      switchButtonSave(inputList, buttonSave, inactiveButtonClass);
    });
  });
};
//функция валидации форм
const enableValidation = config => {
  // найти все формы на странице
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formItem => {
    formItem.addEventListener('submit', function (evt) {
      // отменить действия браузера по умолчанию для каждой popup__form
      evt.preventDefault();
    });
    setEventListeners(
      formItem,
      config.inputTextSelector,
      config.submitButtonSelector,
      config.inactiveButtonClass,
      config.inputErrorClass,
      config.errorClass
    );
  });
};
enableValidation({
  formSelector: '.popup__form',
  inputTextSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__error_active'
});
