//==========================import=======
import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  initialCards,
  configuration,
  buttonAddPlace,
  buttonEditeProfile
} from '../utils/constants.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

//создать объект список форм с валидаторами
const formValidatorList = {};
//функция создания объекта с экземплярами валидаторов всех форм и включение валидации форм
const enableValidation = config => {
  const arrayPopupForm = Array.from(document.querySelectorAll(config.formSelector));
  arrayPopupForm.forEach(elementForm => {
    //создать новый экземпляр класса FormValidator
    const instanceFormValidator = new FormValidator(config, elementForm);
    //получить атрибут name у формы
    const formName = elementForm.getAttribute('name');
    //console.log(formName);
    //записать в объект со списоком  форм с валидаторами созданный экземпляр
    formValidatorList[formName] = instanceFormValidator;
    //включение валидации
    instanceFormValidator.enableValidation();
  });
};
enableValidation(configuration);
//Создать разметку карточки
const createCard = cardData => {
  const card = new Card(cardData, '#card-place', handleCardClick);
  const cardPlace = card.generateCard();
  return cardPlace;
};
//создать экземпляр popupFullImg класса PopupWithImage
const popupFullImg = new PopupWithImage('#popupFullImg');
//добаить слушателей событий
popupFullImg.setEventListeners();
//Функция открыть popupFullImg.Эта функция должна открывать попап с картинкой при клике на карточку.
const handleCardClick = (name, link) => {
  popupFullImg.open(name, link);
};
//Добавление карточки мест из initialCards
const section = new Section(
  {
    items: initialCards,
    renderer: item => {
      section.addItem(createCard(item));
    }
  },
  '.elements'
);
section.renderItems();
//Функция SubmitForm для popupPlace
const submitFormPlace = cardData => {
  const { placename: name, imageLink: link } = cardData;
  section.addItem(createCard({ name, link }));
};
//создать экземпляр popupPlace класса PopupWithForm
const popupPlace = new PopupWithForm('#popupPlace', submitFormPlace);
//добаить слушателей событий
popupPlace.setEventListeners();
//открыть placePopup
function openPopupPlace() {
  formValidatorList['place-form'].resetValidation();
  popupPlace.open();
}
//создать экземпляр infoProfile класса UserInfo
const infoProfile = new UserInfo('.profile__name', '.profile__description');
//сохранить изменения и закрыть PopupProfile
const submitFormProfile = profileData => {
  infoProfile.setUserInfo(profileData);
};
//создать экземпляр popupPlace класса PopupWithForm
const popupProfile = new PopupWithForm('#popupProfile', submitFormProfile);
popupProfile.setEventListeners();

//открыть popupProfile
function openPopupProfile() {
  formValidatorList['profile-form'].resetValidation();
  popupProfile.setInputValues(infoProfile.getUserInfo());
  popupProfile.open();
}

buttonAddPlace.addEventListener('click', openPopupPlace);
buttonEditeProfile.addEventListener('click', openPopupProfile);
