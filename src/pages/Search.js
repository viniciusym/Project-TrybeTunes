import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      searchedName: '',
      loading: false,
      albums: [],
      isSearchReady: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.getAlbums = this.getAlbums.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  getAlbums() {
    const { search } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      const data = await searchAlbumsAPI(search);
      return this.setState(() => ({
        searchedName: search,
        loading: false,
        albums: [...data],
        isSearchReady: true,
      }));
    });
  }

  render() {
    const { search, loading, isSearchReady, searchedName, albums } = this.state;
    return (
      <div className="page-search" data-testid="page-search">
        <Header currentPage="search" />
        { loading ? <Loading /> : (
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
            <button
              type="reset"
              disabled={ search.length < 2 }
              value="Pesquisar"
              name="searchButton"
              id="searchButtom"
              data-testid="search-artist-button"
              onClick={ this.getAlbums }
            >
              Pesquisar
            </button>
          </form>
        )}
        { isSearchReady && (
          <h2>
            {`Resultado de álbuns de: ${searchedName}`}
          </h2>
        )}
        { albums.length === 0 ? <h2>Nenhum álbum foi encontrado</h2> : (
          albums
            .map((album) => <AlbumCard album={ album } key={ album.collectionId } />)
        )}
      </div>
    );
  }
}

export default Search;
