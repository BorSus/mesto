const editPopup = document.querySelector('.popup');
const addButton = document.querySelector('.profile__edite-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editPopupName = document.querySelector('.popup__input-text_legend_name');
const editPopupDescription = document.querySelector('.popup__input-text_legend_description');
const editPopupClose = document.querySelector('.popup__close');
const formEdite = document.querySelector('.popup__form');

function close(namePopup) {
  namePopup.classList.remove('popup_opened');
}
function open(namePopup) {
  namePopup.classList.add('popup_opened');
}

/*закрыть popUP*/
function closePopup(evt) {
  evt.preventDefault();
  close(editPopup);
  editPopupName.value = '';
  editPopupDescription.value = '';
}

/*открыть popUP */
function openPopup() {
  open(editPopup);
  editPopupName.value = profileName.textContent;
  editPopupDescription.value = profileDescription.textContent;
}

/* сохранить изменения и закрыть popUp*/
function savePopup(evt) {
  evt.preventDefault();
  profileName.textContent = editPopupName.value;
  profileDescription.textContent = editPopupDescription.value;
  close(editPopup);
}

editPopupClose.addEventListener('click', closePopup);
addButton.addEventListener('click', openPopup);
//Клик по кнопке "Сохранить" необходимо удалить.Используйте событие submit у формы OK
formEdite.addEventListener('submit', savePopup);
