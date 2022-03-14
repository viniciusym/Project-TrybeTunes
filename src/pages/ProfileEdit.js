import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: false,
      isButtonDisabled: true,
      loading: false,
      description: '',
      email: '',
      image: '',
      name: '',
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const userData = await getUser();
      const { description, email, image, name } = await userData;
      this.setState({
        loading: false,
        description,
        email,
        image,
        name,
      });
      this.validateForm();
    });
  }

  handleUserChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  }

  updateUserData() {
    const { name, email, description, image } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      updateUser({
        name,
        email,
        image,
        description,
      });
      this.setState({
        loading: false,
        logged: true,
      });
    });
  }

  validateForm() {
    const { name, email, description, image } = this.state;
    /**  emailRegex Source: https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript */
    const emailRegex = (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    const validateName = name.length > 0;
    const validateImage = image.length > 0;
    const validateLengthEmail = email.length > 0;
    const validateEmail = email.match(emailRegex);
    const validateDescription = description.length > 0;
    const validateAll = validateDescription
    && validateLengthEmail && validateImage && validateName && validateEmail;
    if (validateAll) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  render() {
    const {
      loading, description, name, image, email, isButtonDisabled, logged } = this.state;
    return (
      logged ? <Redirect to="/profile" /> : (
        <div className="page-profile-edit" data-testid="page-profile-edit">
          <Header currentPage="profile" />
          { loading ? <Loading /> : (
            <form className="profile-page">
              <label htmlFor="image" className="profile-block">
                <img src={ image } alt={ name } />
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={ image }
                  onChange={ this.handleUserChange }
                  data-testid="edit-input-image"
                  placeholder="Url da imagem"
                />
              </label>
              <label htmlFor="name" className="profile-block">
                Nome
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={ name }
                  onChange={ this.handleUserChange }
                  data-testid="edit-input-name"
                />
              </label>
              <label htmlFor="email" className="profile-block">
                E-mail
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={ email }
                  onChange={ this.handleUserChange }
                  data-testid="edit-input-email"
                />
              </label>
              <label htmlFor="description" className="profile-block">
                Descrição
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={ description }
                  onChange={ this.handleUserChange }
                  data-testid="edit-input-description"
                />
              </label>
              <label htmlFor="save">
                <input
                  disabled={ isButtonDisabled }
                  type="button"
                  value="save"
                  name="save"
                  id="save"
                  className="save-edit"
                  data-testid="edit-button-save"
                  onClick={ this.updateUserData }
                />
              </label>
            </form>
          ) }
        </div>
      )
    );
  }
}

export default ProfileEdit;
