 class UserInfo {
  constructor({ userData, api, saveButtonState }) {
    this.nameElenement = userData.name;
    this.info = userData.info;
    this.avatarElement = userData.avatar;
    this.api = api;
    this.userPopup = userData.editProfilePopup;
    this.saveButtonState = saveButtonState;
    this.saveButton = userData.saveButton;
    this.saveButtonText = this.saveButton.textContent;
  }

  setUserInfo() {
    this.api
      .getUserData()
      .then((userData) => {
        this.nameElenement.textContent = userData.name;
        this.info.textContent = userData.about;
        this.avatarElement.style.backgroundImage = `url(${userData.avatar})`;
      })
      .catch((err) =>
        console.log('Не возможно загрузить информацию о пользователе' + err)
      );
  }

  updateUserInfo({ ...userData }) {
    this.saveButtonState(true, this.saveButton, this.saveButtonText);
    this.api
      .patchUserData(userData)
      .then((res) => {
        this.nameElenement.textContent = res.name;
        this.info.textContent = res.about;
      })
      .then(() => this.userPopup.closeImg())
      .catch((err) =>
        console.log('Не возможно  обновить данные пользователя' + err )
      )
      .finally(() =>
        this.saveButtonState(false, this.saveButton, this.saveButtonText)
      );
  }

  updateAvatar(avatarLink) {
    this.api
      .patchUserAvatar(avatarLink)
      .then((res) => {
        this.avatarElement.style.backgroundImage = `url(${res.avatar})`;
      })
      .catch((err) => console.log('Не возможно обновить аватар' +err) );
  }
}
