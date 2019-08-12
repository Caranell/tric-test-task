import * as React from 'react';
import { longStackSupport } from 'q';

interface State {
  firstName: string;
  secondName: string;
  email: string;
  category: string;
  message: string;
  img: File | null;
}
class FormControl extends React.Component<{}, State> {
  constructor() {
    super({});
    this.state = {
      firstName: '',
      secondName: '',
      email: '',
      category: '',
      message: '',
      img: null,
    };
  }
  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: field, value } = event.target;
    this.setState({
      ...this.state,
      [field]: value,
    });
  };
  private onSelectChnage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    this.setState({
      ...this.state,
      category: value,
    });
    console.log(this.state);
  };
  private onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileSize = file.size / 1024 / 1024;
      if (fileSize < 2 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        this.setState({
          ...this.state,
          img: file,
        });
      } else {
        this.setState({
          ...this.state,
          img: null,
        });
      }
    }
  };
  private onSend = () => {
    const { firstName, secondName, email, category, message, img } = this.state;
    if (email && (firstName || secondName) && category && message.length > 9 && img) {
      //create json object
    }
  };

  private onFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = new FormData();
  };
  public render() {
    return (
      <form action="">
        <label htmlFor="">Name</label>
        <input type="text" name="firstName" onInput={this.onInputChange} />
        <label htmlFor="">SecondName</label>
        <input type="text" name="secondName" onInput={this.onInputChange} />
        <label htmlFor="">Email</label>
        <input type="email" name="email" onInput={this.onInputChange} />
        <label htmlFor="">Message</label>
        <input type="text" name="message" onInput={this.onInputChange} />
        <select name="category" id="" onChange={this.onSelectChnage}>
          <option value="" selected hidden>
            Выберите тип
          </option>
          <option value="Жалоба">Жалоба</option>
          <option value="Благодарность">Благодарность</option>
        </select>
        <input type="file" name="image" onChange={this.onImageChange} />
      </form>
    );
  }
}

export default FormControl;
