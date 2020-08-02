 /*
  Можно лучше: в классе Popup намешана функциональность разных классов, лучше 
  оставить в нем только функционал характерный для всех попапов - открытие и закрытие, 
  а для классов с формой и изображением сделать отдельные классы используя наследование
 
 */
 
 class Popup {
  constructor(popup, resetForm) {
    this.popup = popup;
    this.closeButton = this.popup.querySelector('.popup__close');
    this.resetForm = resetForm;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this.close);
    this.popup.addEventListener('click', this.close);
  }

  closeImg() {
    this.reset();
    this.popup.classList.remove('popup_is-opened');
    if (this.popup.classList.contains('popup_type_image')) {
      this.popup.querySelector('.popup__image').removeAttribute('src');
    }
    document.removeEventListener('keydown', this.close);
    this.popup.removeEventListener('click', this.close);
  }

  close(event) {
    if (event.type === 'keydown' && event.key === 'Escape') {
      this.closeImg();
    }
    if (event.type === 'click') {
      if (
        event.target.classList.contains('popup_is-opened') ||
        event.target === this.closeButton
      ) {
        this.closeImg();
      }
    }
    if (event.type === 'submit') {
      this.closeImg();
    }
  }

  reset() {
    if (this.resetForm) {
      this.resetForm(this.popup);
    }
  }
}
