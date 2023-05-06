//==========================import=======
import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  page,
  configuration,
  buttonAddPlace,
  buttonEditeProfile,
  buttonAvatarEdit,
  optionsApi,
  optionsUserInfo
} from '../utils/constants.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import Api from '../components/Api.js';
//===Валидация форм===
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
//===Section==
const section = new Section(
  {
    renderer: item => {
      section.addItemServer(createCard(item));
    }
  },
  '.elements'
);
//===API===
//создать экземпляр api класса Api
const api = new Api(optionsApi);

//===Profile===
//создать экземпляр infoProfile класса UserInfo
const infoProfile = new UserInfo(optionsUserInfo);
//Переменная для хранения id пользователя
let idMe;
//сохранить изменения и закрыть PopupProfile
const submitFormProfile = async profileData => {
  try {
    popupProfile.setSubmitButtonLoading();
    const response = await api.patchUserInfo(profileData);
    infoProfile.setUserInfo(response);
    popupProfile.close();
  } catch (error) {
    console.error(`Ошибка при редактировании данных пользователя: ${error}`);
  } finally {
    popupProfile.unsetSubmitButtonLoading();
    console.info('Редактирование данных пользователя-завершено');
  }
};
//создать экземпляр popupProfile (редактирование данных пользователя) класса PopupWithForm
const popupProfile = new PopupWithForm('#popupProfile', submitFormProfile);
popupProfile.setEventListeners();

//открыть popupProfile
const openPopupProfile = () => {
  formValidatorList['profile-form'].resetValidation();
  popupProfile.setInputValues(infoProfile.getUserInfo());
  //console.log(popupProfile._getInputValues());
  popupProfile.open();
};
//===popupAvatar (редактирование аватара пользователя)===
//Функция SubmitForm для popupAvatar
const submitFormAvatar = async avatar => {
  try {
    popupAvatar.setSubmitButtonLoading();
    const response = await api.patchUserAvatar(avatar);
    infoProfile.setUserAvatar(response);
    popupAvatar.close();
  } catch (error) {
    console.error(`Ошибка при редактировании аватара пользователя : ${error}`);
  } finally {
    popupAvatar.unsetSubmitButtonLoading();
    console.info('Редактирование аватара пользователя-завершено');
  }
};
//создать экземпляр popupAvatar (редактирование аватара пользователя) класса PopupWithForm
const popupAvatar = new PopupWithForm('#popupAvatar', submitFormAvatar);
popupAvatar.setEventListeners();
//открыть popupAvatar
function openPopupAvatar() {
  popupAvatar.open();
}

//===CARD===
//Функция создает DOM-element карточки готовый для добавления на страницу
const createCard = cardData => {
  const card = new Card(
    cardData,
    '#card-place',
    handleCardClick,
    handleDelClick,
    handleLikeClick,
    idMe
  );
  const cardPlace = card.generateCard();
  return cardPlace;
};
//Функция открыть popupFullImg.
const handleCardClick = (name, link) => {
  popupFullImg.open(name, link);
};
//===PopupWithConfirmation===
//создать экземпляр popupConfirm (подтверждение удаления карточки) класса PopupWithConfirmation
const popupConfirm = new PopupWithConfirmation('#popupConfirm');
popupConfirm.setEventListeners();
//Функция открыть подтверждение удаления карточки
const handleDelClick = card => {
  //Функция SubmitForm для popupConfirm
  const submitFormConfirm = async () => {
    try {
      const response = await api.deleteCard(card.id);
      console.info(response);
      card.deleteCard();
      popupConfirm.close();
    } catch (error) {
      console.error(`Ошибка при удалении карточки: ${error}`);
    } finally {
      console.info(`Удаление карточки-завершено`);
    }
  };
  popupConfirm.setSubmitAction(submitFormConfirm);
  popupConfirm.open();
};
//Функция поставить|удалить like
const handleLikeClick = async card => {
  let response = {};
  try {
    if (!card.isLikedCard) {
      response = await api.putLike(card.id);
      card.setLike();
    } else {
      response = await api.deleteLike(card.id);
      card.deleteLike();
    }
  } catch (error) {
    console.error(`Ошибка при установка|удаления лайка карточки на странице: ${error}`);
  } finally {
    card.setLikeScore(response.likes);
    console.info('установка|удаление лайка карточки на странице-завершено');
  }
};
//===popupPlace добавление новой карточки===
//Функция SubmitForm для popupPlace
const submitFormPlace = async cardData => {
  try {
    popupPlace.setSubmitButtonLoading();
    const response = await api.postNewCard(cardData);
    section.addItemUser(createCard(response));
    popupPlace.close();
  } catch (error) {
    console.error(`Ошибка при добавлении новой карточки на страницу: ${error}`);
  } finally {
    popupPlace.unsetSubmitButtonLoading();
    console.info('Добавление новой карточки на странице-завершено');
  }
};
//создать экземпляр popupPlace (добавление новой карточки)класса PopupWithForm
const popupPlace = new PopupWithForm('#popupPlace', submitFormPlace);
popupPlace.setEventListeners();

//открыть placePopup
function openPopupPlace() {
  formValidatorList['place-form'].resetValidation();
  popupPlace.open();
}
//создать экземпляр popupFullImg(открыть изображение карточки) класса PopupWithImage
const popupFullImg = new PopupWithImage('#popupFullImg');
//добаить слушателей событий
popupFullImg.setEventListeners();

function receiveData() {
  page.classList.add('page_wait');
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfo, initialCards]) => {
      infoProfile.setUserInfo(userInfo);
      infoProfile.setUserAvatar(userInfo);
      idMe = `${userInfo._id}`;
      section.renderItems(initialCards);
    })
    .catch(error => {
      console.error(`Ошибка при добавлении данных сервера: ${error}`);
    })
    .finally(() => {
      console.info('Добавление данных с сервера-завершено');
      page.classList.remove('page_wait');
    });
}
receiveData();

buttonAddPlace.addEventListener('click', openPopupPlace);
buttonEditeProfile.addEventListener('click', openPopupProfile);
buttonAvatarEdit.addEventListener('click', openPopupAvatar);
