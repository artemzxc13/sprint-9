 class ValidityForm {
  constructor(formElement) {
    this.formElement = formElement;
    this.setEventListeners = this.setEventListeners.bind(this);
    this.formElement.addEventListener('input', this.setEventListeners);
  }

  checkInputValidity(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    const errorMessage = {
      url: 'Здесь должна быть ссылка',
      fieldLength: `Должно быть от ${element.getAttribute(
        'minlength'
      )} до ${element.getAttribute('maxlength')} символов`,
      required: 'Это обязательное поле',
    };

    if (element.validity.typeMismatch) {
      if (element.type === 'url') {
        errorElement.textContent = errorMessage.url;
      }
     
      this.activateError(errorElement);
      return false;
    }
    if (element.validity.tooShort || element.validity.tooLong) {
      errorElement.textContent = errorMessage.fieldLength;
      this.activateError(errorElement);
      return false;
    }
    if (element.validity.valueMissing) {
      errorElement.textContent = errorMessage.required;
      this.activateError(errorElement);
      return false;
    }
    this.resetError(errorElement);
    return true;
  }

  activateError(element) {
    element.classList.add('popup__error-message');
  }

  resetError(element) {
    element.classList.remove('popup__error-message');
    element.textContent = '';
  }

  reset() {
    this.formElement.reset();
  }

  setSubmitButtonState(validityState) {
    const button = this.formElement.querySelector('.popup__button');
    if (!validityState) {
      button.classList.remove('popup__button_is_active');
      button.setAttribute('disabled', '');
    } else {
      button.classList.add('popup__button_is_active');
      button.removeAttribute('disabled');
    }
  }

  setEventListeners() {
    const inputs = Array.from(this.formElement.elements);
    let isValidForm = true;
    inputs.forEach((element) => {
      if (!element.classList.contains('button')) {
        if (!this.checkInputValidity(element)) {
          isValidForm = false;
        }
      }
    });
    this.setSubmitButtonState(isValidForm);
  }
}