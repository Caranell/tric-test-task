import * as React from 'react';
import { longStackSupport } from 'q';
import ErrorMessage from './ErrorMessage';
interface State {
  firstName: string;
  secondName: string;
  email: string;
  category: string;
  message: string;
  img: File | null;
}
class FormControl extends React.Component<{}, State> {
  state: State = {
    firstName: '',
    secondName: '',
    email: '',
    category: '',
    message: '',
    img: null,
  };

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
    const { name: field, value } = event.target;
    this.setState({
      ...this.state,
      [field]: value.trim(),
    });
    console.log(this.state);
  };

  private onSelectChnage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    this.setState({
      ...this.state,
      category: value,
    });
  };

  private onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileSize = file.size / 1024 / 1024;
      if (fileSize < 2) {
        this.setState({
          ...this.state,
          img: file,
        });
      } else {
      }
    }
  };

  private onFormSend = () => {
    const { firstName, secondName, email, category, message, img } = this.state;
    if (email && (firstName || secondName) && category && message.length > 9 && img) {
      //create json object
    }
  };

  public render() {
    const NOT_EMPTY_MESSAGE = 'не может быть пустым';
    return (
      <form action="">
        <label htmlFor="firstName">Name</label>
        <input type="text" name="firstName" id="firstName" onInput={this.onInputChange} />

        <label htmlFor="secondName">SecondName</label>
        <input type="text" name="secondName" id="secondName" onInput={this.onInputChange} />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onInput={this.onInputChange} />

        <label htmlFor="category">Message</label>
        <select name="category" id="category" onChange={this.onSelectChnage}>
          <option value="" selected hidden>
            Выберите тип
          </option>
          <option value="Жалоба">Жалоба</option>
          <option value="Благодарность">Благодарность</option>
        </select>

        <input type="text" name="message" id="message" onInput={this.onInputChange} />
        <label htmlFor="message">Message</label>

        <input type="file" name="image" accept=".jpg,.jpeg,.png" onChange={this.onImageChange} />
        <button>remove input file</button>
      </form>
    );
  }
}

export default FormControl;
