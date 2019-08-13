import * as React from 'react';
import { longStackSupport } from 'q';
import ErrorMessage from './ErrorMessage';
import './Form.css';

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

interface finalState {
  firstName: string;
  secondName: string;
  email: string;
  category: string;
  message: string;
  img: string | null | ArrayBuffer;
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
      name: 'empty',
      img: '',
      email: 'empty',
      category: 'empty',
      message: 'empty',
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
  private onImageChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
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
    console.log(this.state.img);
  };

  // проверка корректности заполнения полей
  private checkFormCompletion = (): boolean => {
    const errors = this.state.errors;
    return !errors.email && !errors.category && !errors.message && !errors.name ? true : false;
  };

  private onSubmit = (event: React.FormEvent) => {
    const { firstName, secondName, email, category, message, img } = this.state;
    event.preventDefault();
    let returnState: finalState = { firstName, secondName, email, category, message, img: null };
    if (img) {
      this.convertFileToBase64(img)
        .then(result => {
          returnState.img = result;
        })
        .then(() => console.log(JSON.stringify(returnState)));
    } else {
      console.log(JSON.stringify(returnState));
    }
  };

  convertFileToBase64 = (img: File): Promise<string | null | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => resolve(reader.result);
    });
  };

  public render(): React.ReactNode {
    const errors = this.state.errors;
    const validForm = this.checkFormCompletion();
    console.log(validForm);
    return (
      <form className="form">
        <div>
          <label className="form__label">
            Имя <br />
            <input className="form__input form__required" type="text" name="firstName" onChange={this.onTextChange} />
          </label>

          <label className="form__label">
            Фамилия <br />
            <input className="form__input" type="text" name="secondName" onChange={this.onTextChange} />
          </label>
        </div>

        <label className="form__label form__required">
          Email <br />
          <input className="form__input" type="email" name="email" onChange={this.onTextChange} />
        </label>

        <label className="form__label">
          Тип обращения <br />
          <select name="category" onChange={this.onSelectChnage}>
            <option value="" selected hidden>
              Выберите тип
            </option>
            <option value="Жалоба">Жалоба</option>
            <option value="Благодарность">Благодарность</option>
          </select>
        </label>

        <label className="form__label">
          Сообщение <br />
          <textarea
            className="from_input"
            name="message"
            placeholder="Оставьте здесь ваше сообщение."
            cols={30}
            rows={10}
            onChange={this.onTextChange}
          ></textarea>
        </label>

        <label className="form__label">
          Изображение
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
          {Object.values(errors).map((error, i) => {
            if (error !== 'empty') return <ErrorMessage key={i} message={error} />;
          })}
        </div>
        <button disabled={!validForm} onClick={this.onSubmit}>
          asdf
        </button>
      </form>
    );
  }
}

export default FormControl;
