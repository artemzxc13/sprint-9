 class Card {
  constructor({ cardData, openImg, api, myID }) {
    this.api = api;
    this.cardData = cardData;
    this.openImg = openImg;
    this.card = document.createElement('div');
    this.setListeners = this.setListeners.bind(this);
    this.myID = myID;
    this.myID = this.myID.id;
  }

  like() {
    if (
      !this.card
        .querySelector('.place-card__like-icon')
        .classList.contains('place-card__like-icon_liked')
    ) {
      this.card
        .querySelector('.place-card__like-icon')
        .classList.add('place-card__like-icon_liked');
      this.api
        .likeCard(this.cardData._id)
        .then((res) => {
          this.card.querySelector('.place-card__like-quantity').textContent =
            res.likes.length;
        })
        .catch((err) => console.log(`Не возможно поставить лайк => ${err}`));
    } else {
      this.card
        .querySelector('.place-card__like-icon')
        .classList.remove('place-card__like-icon_liked');
      this.api
        .deletelike(this.cardData._id)
        .then((res) => {
          this.card.querySelector('.place-card__like-quantity').textContent =
            res.likes.length;
        })
        .catch((err) => console.log(`Не возможно удалить лайк  => ${err}`));
    }
  }

  delete() {
    const result = confirm('Вы уверены, что хотите удалить карточку?');
    if (result) {
      this.api
        .deleteCard(this.cardData._id)
        .then(() => {
          this.card.removeEventListener('click', this.setListeners);
          this.card.remove();
        })
        .catch((err) => console.log(`Не возможно удалить карточку  => ${err}`));
    }
  }

  openImage() {
    this.openImg(this.cardData.link);
  }

  create() {
    this.card.classList.add('place-card');
    this.card.insertAdjacentHTML(
      'beforeend',
      `
            <div class="place-card__image">
                <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
                <h3 class="place-card__name"></h3>
                <div class="place-card__like-wrapper">
                  <button class="place-card__like-icon"></button>
                  <span class="place-card__like-quantity"></span>
                </div>
            </div>`
    );

    this.card.querySelector(
      '.place-card__name'
    ).textContent = this.cardData.name;
    this.card.querySelector(
      '.place-card__image'
    ).style.backgroundImage = `url(${this.cardData.link})`;
    this.card.querySelector(
      '.place-card__like-quantity'
    ).textContent = this.cardData.likes.length;

    const cardOwnerID = this.cardData.owner._id;
  
    if (this.myID === cardOwnerID) {
      this.card.querySelector('.place-card__delete-icon').style.display =
        'block';
    }

 
    if (this.cardData.likes.some((owner) => owner._id === this.myID)) {
      this.card
        .querySelector('.place-card__like-icon')
        .classList.add('place-card__like-icon_liked');
    }

    this.card.addEventListener('click', this.setListeners);
    return this.card;
  }

  setListeners(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      this.like();
    }
    if (event.target.classList.contains('place-card__delete-icon')) {
      this.delete();
    }
    if (event.target.classList.contains('place-card__image')) {
      this.openImage();
    }
  }
}
