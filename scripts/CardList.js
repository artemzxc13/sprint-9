 class CardList {
  constructor(
    placesList,
    createCard,
    api,
    addCardPopup,
    saveCard,
    saveButtonState) {


    this.container = placesList;
    this.createCard = createCard;
    this.api = api;
    this.addCardPopup = addCardPopup;
    this.saveCard = saveCard;
    this.saveCarddButtonText = this.saveCard.textContent;
    this.saveButtonState = saveButtonState;
  }

  addCard(cardData) {
    const template = this.createCard(cardData);
    this.container.append(template);
  }

  render() {
    this.api
      .getInitialCards()
      .then((cards) => {
        for (const card of cards) {
          this.addCard(card);
        }
      })
      .catch((err) => console.log('Не возможно загрузить карточки' + err));
  }

  postCard(cardData) {
    this.saveButtonState(
      true,
      this.saveCard,
      this.saveCarddButtonText
    );
    this.api
      .postNewCard(cardData)
      .then((res) => {
        this.addCard(res);
      })
      .then(() => {
        this.addCardPopup.closeImg();
      })
      .catch((err) => console.log('Не возможно загрузить карточку' + err))
      .finally(() =>
        this.saveButtonState(
          false,
          this.saveCard,
          this.saveCarddButtonText
        )
      );
  }
}
