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
  optionsUserInfo,
  buttonSubmitProfile,
  buttonSubmitAvatar,
  buttonSubmitPlace
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
    buttonSubmitProfile.textContent = `${buttonSubmitProfile.textContent}...`;
    const response = await api.patchUserInfo(profileData);
    infoProfile.setUserInfo(response);
  } catch (error) {
    console.error(`Ошибка при редактировании данных пользователя: ${error}`);
  } finally {
    buttonSubmitProfile.textContent = buttonSubmitProfile.textContent.slice(0, -3);
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
//Функция SubmitForm для popupAvatar
const submitFormAvatar = async avatar => {
  try {
    buttonSubmitAvatar.textContent = `${buttonSubmitAvatar.textContent}...`;
    const response = await api.patchUserAvatar(avatar);
    //console.log(response);
    infoProfile.setUserAvatar(response);
  } catch (error) {
    console.error(`Ошибка при редактировании аватара пользователя : ${error}`);
  } finally {
    buttonSubmitAvatar.textContent = buttonSubmitAvatar.textContent.slice(0, -3);
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

//===CARDS===
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
//создать экземпляр popupConfirm (подтверждение удаления карточки) класса PopupWithConfirmation
const popupConfirm = new PopupWithConfirmation('#popupConfirm');
popupConfirm.setEventListeners();
//Функция открыть popupConfirm
const handleDelClick = card => {
  //Функция SubmitForm для popupConfirm
  const submitFormConfirm = async () => {
    try {
      const response = await api.deleteCard(card.id);
      console.info(response);
      card.deleteCard();
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
      //console.info(response);
      //console.info(`поставил лайк`);
    } else {
      response = await api.deleteLike(card.id);
      card.deleteLike();
      //console.info(response);
      //console.info(`удалил лайк`);
    }
  } catch (error) {
    console.error(`Ошибка при установка|удаления лайка карточки на странице: ${error}`);
  } finally {
    card.setLikeScore(response.likes);
    console.info('установка|удаление лайка карточки на странице-завершено');
  }
};

//Функция SubmitForm для popupPlace
const submitFormPlace = async cardData => {
  try {
    buttonSubmitPlace.textContent = `${buttonSubmitPlace.textContent}...`;
    const response = await api.postNewCard(cardData);
    //console.info(responsePostNewCard);
    //Экземпляр класса Section создаётся для каждого контейнера, в который требуется отрисовывать элементы.
    const section = new Section(
      {
        renderer: item => {
          section.addItemUser(createCard(item));
        }
      },
      '.elements'
    );
    section.addItemUser(createCard(response));
  } catch (error) {
    console.error(`Ошибка при добавлении новой карточки на страницу: ${error}`);
  } finally {
    buttonSubmitPlace.textContent = buttonSubmitPlace.textContent.slice(0, -3);
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

//функция добавить данные с сервера на страницу
async function receiveData() {
  try {
    page.classList.add('page_wait');
    const userInfo = await api.getUserInfo();
    const initialCards = await api.getInitialCards();
    //console.log(userInfo);
    infoProfile.setUserInfo(userInfo);
    infoProfile.setUserAvatar(userInfo);
    idMe = `${userInfo._id}`;
    //console.log(`Id пользователя ${idMe}`);
    //console.log(initialCards);
    const section = new Section(
      {
        items: initialCards,
        renderer: item => {
          section.addItemServer(createCard(item));
        }
      },
      '.elements'
    );
    section.renderItems();
  } catch (error) {
    console.error(`Ошибка при добавлении данных сервера: ${error}`);
  } finally {
    console.log('Добавление данных-завершено');
    page.classList.remove('page_wait');
  }
}
receiveData();

buttonAddPlace.addEventListener('click', openPopupPlace);
buttonEditeProfile.addEventListener('click', openPopupProfile);
buttonAvatarEdit.addEventListener('click', openPopupAvatar);

/*
const test = '/644fb2eaab818800859d7b57';
async function testFunction() {
  try {
    const info = await api.deleteCard(test);
    console.log(info);
  } catch (error) {
    console.error(`Ошибка : ${error}`);
  } finally {
    console.log('test done');
  }
}
testFunction();
*/
