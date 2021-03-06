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
        <div className="search-content">
          { loading ? <Loading /> : (
            <form>
              <label htmlFor="search">
                <input
                  className="search-text-input"
                  type="text"
                  name="search"
                  id="search"
                  data-testid="search-artist-input"
                  placeholder="Nome do artista"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                className="search-button"
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
              {`Resultado de ??lbuns de: ${searchedName}`}
            </h2>
          )}
          <div className="search-result">
            { albums.length === 0 ? <h2>Nenhum ??lbum foi encontrado</h2> : (
              albums
                .map((album) => <AlbumCard album={ album } key={ album.collectionId } />)
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
