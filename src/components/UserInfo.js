export class UserInfo {
  constructor(optionsUserInfo) {
    this._profileName = optionsUserInfo.profileName;
    this._profileDescription = optionsUserInfo.profileDescription;
    this._profileAvatar = optionsUserInfo.profileAvatar;
  }
  // метод возвращает объект с данными пользователя.
  getUserInfo() {
    const data = {};
    data['name'] = this._profileName.textContent;
    data['about'] = this._profileDescription.textContent;
    return data;
  }

  // метод  принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.about;
  }
  // метод  принимает данные пользователя и устанавливает аватар
  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}
