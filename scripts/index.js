const editPopup = document.querySelector('.editpopup');
const addButton = document.querySelector('.profile__edite-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editPopupName = document.querySelector('.editpopup__name');
const editPopupDescription = document.querySelector('.editpopup__description');
const editPopupSave = document.querySelector('.editpopup__save');
const like = document.querySelectorAll('.element__like');
const editPopupClose = document.querySelector('.editpopup__close');

/*закрыть popUP*/
function closePopup(evt) {
  evt.preventDefault();
  editPopup.classList.remove('editpopup_opened');
  editPopupName.value = '';
  editPopupDescription.value = '';
}
editPopupClose.addEventListener('click', closePopup);

/*открыть popUP*/
function openPopup() {
  editPopup.classList.add('editpopup_opened');
  console.log(editPopup.classList);
  editPopupName.value = profileName.textContent;
  editPopupDescription.value = profileDescription.textContent;
}
addButton.addEventListener('click', openPopup);

/* сохранить изменения и закрыть popUp*/
function savePopup(evt) {
  evt.preventDefault();
  profileName.textContent = editPopupName.value;
  profileDescription.textContent = editPopupDescription.value;
  editPopup.classList.remove('editpopup_opened');
}
editPopupSave.addEventListener('click', savePopup);

/* Поставить/убрать LIKE*/
/*перебор массива всех LIKEов*/
like.forEach(element =>
  /*каждому элементу добавить по клику добавить функцию смены сердечка*/
  element.addEventListener('click', function () {
    element.classList.toggle('element__like_active');
  })
);
