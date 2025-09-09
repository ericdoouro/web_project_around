import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, popupAvatarForm) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    // this._form = document.querySelector(".popup__form");
    this._popupAvatarForm = document.querySelector(".popup__edit-avatar");
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form") || this._popup.querySelector("form");

    console.log(this._form)
    this._submitButton =
      (this._form && this._form.querySelector('[type="submit"]')) ||
      (this._form && this._form.querySelector(".form__submit"));

    this._submitButtonText = this._submitButton ? this._submitButton.textContent : "";
  }

  renderLoading(isLoading, loadingText = "Salvando...") {
    if (!this._submitButton) return; {
      this._submitButton.textContent = isLoading ? loadingText : this._submitButtonText;
    }
  }

  _getInputValues() {
    const values = {};
    if (!this._form) return values;

    const inputs = this._form.querySelectorAll(".form__fields-input, input, textarea, select");
    inputs.forEach((input) => {
      if (input.name) values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    if (!this._form) return;

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = this._getInputValues();

      this._handleFormSubmit(data);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  open() {
    super.open();
  }
}

