import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loading: false,
      logged: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.creactUser = this.creactUser.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  creactUser() {
    const { name } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });
      this.setState({
        loading: false,
        logged: true,
      });
    });
  }

  render() {
    const { name, loading, logged } = this.state;
    const minNameLength = 3;
    return (
      logged ? <Redirect to="/search" /> : (
        <div className="page-login" data-testid="page-login">
          { loading ? <Loading /> : (
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
                  onClick={ this.creactUser }
                  type="button"
                  value="Entrar"
                  id="login"
                  name="login"
                  data-testid="login-submit-button"
                />
              </label>
            </form>
          ) }
        </div>
      )
    );
  }
}
export default Login;
