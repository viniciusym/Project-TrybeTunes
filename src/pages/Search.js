import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { search } = this.state;
    return (
      <div className="page-search" data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              type="text"
              name="search"
              id="search"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="searchButton">
            <input
              disabled={ search.length < 2 }
              type="button"
              value="Pesquisar"
              name="searchButton"
              id="searchButtom"
              data-testid="search-artist-button"
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
