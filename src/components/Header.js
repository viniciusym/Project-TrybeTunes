import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      image: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const data = await getUser();
      this.setState({
        name: data.name,
        image: data.image,
        loading: false,
      });
    });
  }

  render() {
    const { name, loading, image } = this.state;
    const { currentPage } = this.props;
    const currentPageClassName = 'current-page';
    return (
      <header data-testid="header-component">
        <div className="header-profile">
          <img src="https://cdn.iconscout.com/icon/free/png-256/headphone-2496887-2088277.png" alt="" width="40px" />
          { loading ? <Loading /> : (
            <div data-testid="header-user-name" className="header-user">
              <img src={ image } alt={ name } />
              { name }
            </div>
          )}
        </div>
        <div className="header-links">
          <div className={ currentPage === 'search' && currentPageClassName }>
            <Link
              id="search"
              to="/search"
              data-testid="link-to-search"
            >
              Search
            </Link>
          </div>
          <div className={ currentPage === 'favorites' && currentPageClassName }>
            <Link
              id="favorites"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favorites
            </Link>
          </div>
          <div className={ currentPage === 'profile' && currentPageClassName }>
            <Link
              id="profile"
              to="/profile"
              data-testid="link-to-profile"
            >
              Profile
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default Header;
