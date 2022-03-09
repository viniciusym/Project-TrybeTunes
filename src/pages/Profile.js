import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: {
        description: '',
        email: '',
        image: '',
        name: '',
      },
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const userData = await getUser();
      const { description, email, image, name } = await userData;
      this.setState({
        loading: false,
        user: {
          description,
          email,
          image,
          name,
        },
      });
    });
  }

  render() {
    const { loading, user: { description, name, image, email } } = this.state;
    return (
      <div className="page-profile" data-testid="page-profile">
        <Header currentPage="profile" />
        { loading ? <Loading /> : (
          <div>
            <img src={ image } alt={ name } data-testid="profile-image" />
            <Link to="/profile/edit">
              Editar perfil
            </Link>
            <h3>Nome</h3>
            <p>{ name }</p>
            <h3>E-mail</h3>
            <p>{ email }</p>
            <h3>Descrição</h3>
            <p>{ description }</p>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
