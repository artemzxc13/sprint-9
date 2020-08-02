

(function() {
  
  const api = new API({
    baseURL: 'https://praktikum.tk/cohort11',
    headers: {
      authorization: '79c5fb89-adf3-490a-a84d-3cee899cb226',
      'Content-Type': 'application/json',
    },
  });
  const myID = { id: '7e8ba14e2a3c8b968845a8e2' };
  const placesList = document.querySelector('.places-list');
  const todoList = document.getElementById('img_img');
  const popupContainer = document.getElementById('popup_new')
  const poopUpEditProfile = document.getElementById('popup_edit');
  const poopUpEditAvatar = document.getElementById('popup_avatar');
  const userButton = document.querySelector('.user-info__button');
  const openButton = document.querySelector('.profile__edit-button');
  const saveCard = document.querySelector('.save__card');
  const formEdit = document.forms.formProfile;
  const formNewCard = document.forms.new;
  const formNewAvatar =document.forms.avatar;
  const name = document.querySelector('.user-info__name');
  const info = document.querySelector('.user-info__job');
  const avatar = document.querySelector('.user-info__photo');
  const saveButton = document.querySelector('.save');
  const placeValidity = new ValidityForm(formNewCard);
  const profileValidity = new ValidityForm(formEdit);
  const avatarValidity = new ValidityForm(formNewAvatar);
  const addCardPopup = new Popup(popupContainer,resetForm );
  const editProfilePopup = new Popup(poopUpEditProfile,resetForm);
  const avatarPopup = new Popup(poopUpEditAvatar,resetForm);
  


  const userData = {name, info, avatar, editProfilePopup,saveButton};
  const userInfo = new UserInfo({ userData, api, saveButtonState });


  const imagePopup = new Popup(todoList);
  function openImg(imageLink) {
    document.querySelector('.popup__image').setAttribute('src', imageLink);
    imagePopup.open();
  }


  const createCard = (cardData) => {
    const card = new Card({ cardData, openImg, api, myID });
    return card.create();
  };
  const cardList = new CardList(placesList,createCard,api,addCardPopup,saveCard,saveButtonState);


  function resetForm(popup) {
    if (popup.querySelector('.popup__form')) {
      const form = popup.querySelector('.popup__form');
      const inputs = Array.from(form.elements);
      inputs.forEach((element) => {
        if (!element.classList.contains('button')) {
          const errorElement = form.querySelector(`#error-${element.id}`);
          errorElement.classList.remove('popup__error-message');
          errorElement.textContent = '';
        }
      });
      form.reset();
    }
  }


  
  userInfo.setUserInfo();
  cardList.render();


  userButton.addEventListener('click', () => {
    placeValidity.setSubmitButtonState(false);
    addCardPopup.open();
  });
  userData.avatar.addEventListener('click', () => {
    avatarValidity.setSubmitButtonState(false);
    avatarPopup.open();
  });
  openButton.addEventListener('click', () => {
    editProfilePopup.open();
    formProfile.elements.user.value = userData.name.textContent;
    formProfile.elements.job.value = userData.info.textContent;
    profileValidity.setSubmitButtonState(true);
  });
  formNewCard.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.currentTarget.elements.name.value;
    const link = event.currentTarget.elements.link.value;
    cardList.postCard({ name, link });
  });
  formProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.currentTarget.elements.user.value;
    const job = event.currentTarget.elements.job.value;
    userInfo.updateUserInfo({ name, job });
  });
  formNewAvatar.addEventListener('submit', (event) => {
    event.preventDefault();
    const avatarLink = event.currentTarget.elements.avatar.value;
    userInfo.updateAvatar(avatarLink);
    avatarPopup.close(event);
    avatarValidity.setSubmitButtonState(false);
  });

  function saveButtonState(buttonState, button, buttonText) {
    if (buttonState) {
      button.textContent = 'Загрузка...';
     
    } else {
      button.textContent = buttonText;
      button.style.border = '';
    }
  }

  /*
    Можно лучше: у Вас получился крутой функционал, но лучше бы Вы выкинули 
    jquery и реализовали это самостоятельно. jquery не стоит использовать в учебном проекте
    или на дипломе
  */
    // для проверки 
  function backtoTop () {
    let button = $('.back-to-top');
 
    $(window).on('scroll',() => {
      if ($(this).scrollTop() >= 50) {
        button.fadeIn();
         } else {
           button.fadeOut();
         }
    });
 
    button.on('click' , (e) => {
      e.preventDefault();
      $('html').animate({scrollTop:0}, 1000);
    })
  }
  backtoTop();

})();


/*
  Хорошая работа, обмен с сервером сделан верно, но есть небольшое замечание:

  Надо исправить:
  - при сохранении профиля в консоли ошибка 
  "Не возможно обновить данные пользователя TypeError: this.userPopup.closeHandling is not a function"
  и попап не закрывается 

  Можно лучше:
  - в программе захардкожен const myID = { id: '7e8ba14e2a3c8b968845a8e2' };
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Решается это с помощью Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values; //
        ......................  //все данные получены - картчоки и _id пользователя в userData, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })

  - замечание по предыдущему спринту - класс Popup сильно перегружен, такое решение не будет 
  отвечать на дипломе принципу единственной ответсвенности, лучше разбить на несколько классов,
  например PopupWithForm и PopupWithImage

*/

/*
  Отлично, критическое замечание исправлено

  Но я советую все же попрактиковаться с Promise.all, хардкодить
  данные плохая практика

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!

*/