export class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this.profileDescription = document.querySelector(profileDescriptionSelector);
  }
  // метод возвращает объект с данными пользователя.
  getUserInfo() {
    const data = {};
    data['name'] = this._profileName.textContent;
    data['description'] = this.profileDescription.textContent;
    return data;
  }
  // метод  принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    console.log(data.name);
    console.log(data.description);
    this._profileName.textContent = data.name;
    this.profileDescription.textContent = data.description;
  }
}
