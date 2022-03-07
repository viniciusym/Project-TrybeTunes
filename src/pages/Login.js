import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name } = this.state;
    const minNameLength = 3;
    return (
      <div className="page-login" data-testid="page-login">
        <form>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              id="name"
              onChange={ this.handleChange }
              data-testid="login-name-input"
            />
          </label>
          <label htmlFor="login">
            <input
              disabled={ name.length < minNameLength }
              onClick={ () => createUser({
                name,
              }) }
              type="button"
              value="Entrar"
              id="login"
              name="login"
              data-testid="login-submit-button"
            />
          </label>
        </form>
      </div>
    );
  }
}
export default Login;
