class Validator {
    constructor (form) {
        this.patterns = { //шаблон, это типа словарь
            name: /^[a-zа-яё]+$/i, //^ - начало текста
            // surname: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i  //ТАКЖЕ ОШИБКА БЫЛА ЗДЕСЬ, ИЗ_ЗА ПРОБЕЛА 2, 4 не работало!!!
        };
        this.errors = { //сообщения при ошибках
            name: 'Имя должно содержать только буквы', 
            phone: 'Телефон ...',
            email: 'Почта тоже там что-то'
        };
        this.errorClass = 'error-msg'; //наш ошибочный класс содержит error message
        this.form = form; 
        this.valid = false; //по-умолчанию невалидированная
        this._validateForm (); //типа рендера
    }

    _validateForm () {
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)]; //собираем все ошибки
        for (let error of errors) {
            error.remove () //ошибки надо удалить
        }

        let formFields = [...document.getElementById(this.form).querySelectorAll(`input`)]; //массив из полей формы

        for (let field of formFields) {
            this._validate(field); //валидируем массив
        }

        if (![...document.getElementById(this.form).querySelectorAll(`.invalid`)].length) { //если массив с элементами класс invalid пустой, то валидация прошла
            this.valid = true
        }
    }
    _validate (field) {
        if (this.patterns[field.name]) {
            if(!this.patterns[field.name].test(field.value)){ //ЭТО УСЛОВИЕ НЕ ДОБАВИЛИ НА УРОКЕ, ИЗ_ЗА ЭТОГО ПОЛЯ ВСЕ ВРЕМЯ ВЫДАВАЛИ КЛАСС INVALID
                field.classList.add ('invalid'); //если существует, то стиль ошибочного поля
                this._addErrorMsg (field);
                this._watchField(field);
            }
        }
    }

    _addErrorMsg (field) {
        let error = `<div class ="${this.errorClass}">${this.errors[field.name]}</div>`;
        field.parentNode.insertAdjacentHTML ('beforeend', error); //ВОПРОС: не поняла, куда добавляет
    }

    _watchField (field) { //на поля, проверка ввел пользователь правильно или неправильно, на исправление
        field.addEventListener ('input', () => { //когда ввод завершен, то передаем функцию
            let error = field.parentNode.querySelector (`.${this.errorClass}`); //ищем ошибку
            if (this.patterns[field.name].test(field.value)) { //если ошибка устранена, совпадает 
                field.classList.remove ('invalid'); //убираем инвалид
                field.classList.add ('valid'); //вешаем верный зеленый
                if (error) { //если была ошибка, то удалить ее, повторно например
                    error.remove (); 
                }
            } else { //в ином случае меняем классы, если пользователь не исправил свою ошибку
                field.classList.remove ('valid');
                field.classList.add ('invalid');
                if (!error) { //если не было ошибки, то должны добавить - что???
                    this._addErrorMsg (field);
                }
            } 

        })
    }
}