import * as React from 'react';
import { longStackSupport } from 'q';

interface State {
  firstName: string;
  secondName: string;
  email: string;
  category: string;
  message: string;
  img: '';
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
      img: '',
    };
  }
  private onFieldInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: field, value } = event.target;
    console.log(field);
    this.setState({
      ...this.state,
      [field]: value,
    });
    console.log(this.state);
  };
  private onSend = () => {};
  public render() {
    const { firstName, secondName, email, category, message, img } = this.state;
    return (
      <form action="">
        <label htmlFor="">Name</label>
        <input type="text" name="firstName" onInput={this.onFieldInput} />
      </form>
    );
  }
}

export default FormControl;
