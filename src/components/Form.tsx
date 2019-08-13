import * as React from 'react';
import { longStackSupport } from 'q';
import ErrorMessage from './ErrorMessage';

const EMAIL_REGEX = new RegExp(
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
);
interface State {
  firstName: string;
  secondName: string;
  email: string;
  category: string;
  message: string;
  img: File | null;
  errors: {
    name: string;
    img: string;
    email: string;
    category: string;
    message: string;
  };
}

class FormControl extends React.Component<{}, State> {
  state: State = {
    firstName: '',
    secondName: '',
    email: '',
    category: '',
    message: '',
    img: null,
    errors: {
      name: '',
      img: '',
      email: '',
      category: '',
      message: '',
    },
  };

  // проверка корректности заполнения поля
  private validateField = (field: string): void => {
    const { firstName, secondName, email, category, message, img } = this.state;
    const imgSize = img ? img.size / 1024 / 1024 : 0;

    switch (field) {
      case 'email':
        !email.match(EMAIL_REGEX)
          ? this.setState({ errors: { ...this.state.errors, email: 'Некорректный адрес электронной почты' } })
          : this.setState({ errors: { ...this.state.errors, email: '' } });
        break;
      case 'firstName':
      case 'secondName':
        !(firstName || secondName)
          ? this.setState({ errors: { ...this.state.errors, name: 'Необходимо заполнить имя или фамилию' } })
          : this.setState({ errors: { ...this.state.errors, name: '' } });
        break;
      case 'category':
        !category
          ? this.setState({ errors: { ...this.state.errors, category: 'Необходимо выбрать тип обращения' } })
          : this.setState({ errors: { ...this.state.errors, category: '' } });
        break;
      case 'message':
        message.length < 10
          ? this.setState({
              errors: { ...this.state.errors, message: 'Сообщение должно содержать не менее 10 символов' },
            })
          : this.setState({ errors: { ...this.state.errors, message: '' } });
        break;
      case 'img':
        console.log('this.state.errors.img :', this.state.errors.img);
        imgSize > 2
          ? this.setState({
              errors: { ...this.state.errors, img: 'Размер изображения не должен превышать 2Мб' },
            })
          : this.setState({ errors: { ...this.state.errors, img: '' } });
        break;
      default:
        return;
    }
  };

  // обработка изменения текстовых полей
  private onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    console.log(this.state);
    const { name: field, value } = event.target;
    this.setState({ ...this.state, [field]: value.trim() }, () => this.validateField(field));
  };

  // обработка изменения выпадающего меню
  private onSelectChnage = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name: field, value } = event.target;
    this.validateField(field);
    this.setState({ ...this.state, [field]: value }, () => this.validateField(field));
  };

  // обработка добавления изображения
  private onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.files) {
      const file = input.files[0];
      await this.setState({ ...this.state, img: file }, () => {
        this.validateField('img');
      });
      if (this.state.errors.img !== '') {
        input.value = '';
        this.setState({ ...this.state, img: null });
      }
    }
  };

  private onFormSend = () => {
    const { firstName, secondName, email, category, message, img } = this.state;
    if (email && (firstName || secondName) && category && message.length > 9 && img) {
      //create json object
    }
  };

  public render(): React.ReactNode {
    const errors = this.state.errors;
    return (
      <form className="form">
        <label className="form__label">
          firstName <br />
          <input className="form__input" type="text" name="firstName" onChange={this.onTextChange} />
        </label>

        <label className="form__label">
          SecondName <br />
          <input className="form__input" type="text" name="secondName" onChange={this.onTextChange} />
        </label>

        <label className="form__label">
          Email <br />
          <input className="form__input" type="email" name="email" onChange={this.onTextChange} />
        </label>

        <label className="form__label">
          Category <br />
          <select name="category" onChange={this.onSelectChnage}>
            <option value="" selected hidden>
              Выберите тип
            </option>
            <option value="Жалоба">Жалоба</option>
            <option value="Благодарность">Благодарность</option>
          </select>
        </label>

        <label className="form__label">
          Message <br />
          <textarea
            className="from_input"
            name="message"
            placeholder="Расскажите нам что-нибудь"
            cols={30}
            rows={10}
            onChange={this.onTextChange}
          ></textarea>
        </label>

        <label className="form__label">
          Place Your File
          <br />
          <input
            className="form__input"
            type="file"
            name="image"
            accept=".jpg,.jpeg,.png"
            onChange={this.onImageChange}
          />
        </label>

        <div className="form-errors">
          {Object.values(errors).map((error, i) => (
            <ErrorMessage key={i} message={error} />
          ))}
        </div>
        <button type="submit"></button>
      </form>
    );
  }
}

export default FormControl;
