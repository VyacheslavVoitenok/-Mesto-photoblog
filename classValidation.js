`use strict`;

class Validation{
    constructor(errorMessages){
        this.errorMessages = errorMessages;
    }

    //валидация инпутов
    inputValidate(input) {
        console.log(input)
        if (input.validity.valueMissing) {
            
            this.setInvalid(input, this.errorMessages.imptyField);
            return false;
        }
        if ((input.type === 'text') && (!input.validity.valid)) {
            this.setInvalid(input, this.errorMessages.wrongLength);
            return false;
        }
        if ((input.type === 'url') && (!input.validity.valid)) {
            this.setInvalid(input, this.errorMessages.notAnUrl);
            return false;
        }
        this.setValid(input);
        return true;

    }

    // если поле невалидно
    setInvalid(input, message) {
        
        input.classList.add('popup__input_invalid');
        input.nextElementSibling.textContent = message;
        input.nextElementSibling.classList.add('popup__error_active');

    }

    // если поле валидно
    setValid(input) {

        input.classList.remove('popup__input_invalid');
        input.nextElementSibling.textContent = '';

    }

    // включение/отключение кнопки если хотя бы одно поле формы Edit невалидно
    checkFildsEditForm(button) {

        this.button = button;

        const formEditName = form.elements.userName;
        const formEditAbout = form.elements.userAbout;

        if (this.inputValidate(formEditName) === true && this.inputValidate(formEditAbout) === true) {
            this.switchOnButton(this.button);
        } else {
            this.switchOffButton(this.button);
        }

    }
    // включение/выключение кнопки формы Avatar
    // checkFildsAvatarForm(button) {

    //     this.button = button;

    //     const formAvatarLink = formAvatar.elements.link;

    //     if (this.inputValidate(formAvatarLink) === true) {
    //         this.switchOnButton(this.button);
    //     } else {
    //         this.switchOffButton(this.button);
    //     }

    // }

    // выключение кнопки
    switchOffButton(button) {

        button.setAttribute('disabled', true);
        button.classList.add('popup__button_disabled');

    }

    // включение кнопки
    switchOnButton(button) {

        button.removeAttribute('disabled', true);
        button.classList.remove('popup__button_disabled');

    }   
}