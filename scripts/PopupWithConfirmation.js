import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }
}


// setEventListeners() {
//   super.setEventListeners();
//   if (this._form) {  
//     this._form.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//       if (this._handleSubmit) {
//         this._handleSubmit();
//       }
//     });
//   } 
//   else {
//     console.error("PopupWithConfirmation: Nenhum formulário encontrado dentro do popup!");
//   }
// }
// }
