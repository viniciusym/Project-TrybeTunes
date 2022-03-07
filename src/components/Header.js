import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
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
        loading: false,
      });
    });
  }

  render() {
    const { name, loading } = this.state;
    return loading ? <Loading /> : (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ name }</p>
      </header>
    );
  }
}

export default Header;
