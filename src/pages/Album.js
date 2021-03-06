import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusic from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      favoritedMusics: [],
      musics: [],
      albumData: {
        artistName: '',
        albumName: '',
      },
    };

    this.getFavSongsData = this.getFavSongsData.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getFavSongsData();
    const response = await getMusic(id);
    this.setState({
      musics: [...response],
      albumData: {
        artistName: response[0].artistName,
        albumName: response[0].collectionName,
        albumCover: response[0].artworkUrl100,
      },
    });
  }

  getFavSongsData() {
    this.setState({
      loading: true,
    }, async () => {
      const data = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoritedMusics: [...await data],
      });
    });
  }

  render() {
    const {
      musics,
      albumData: { artistName, albumName, albumCover },
      loading,
      favoritedMusics,
    } = this.state;
    return (loading ? <Loading /> : (
      <div className="page-album" data-testid="page-album">
        <Header currentPage="search" />
        <div className="album-page">
          <div className="album-info">
            <img src={ albumCover } alt="" />
            <h2 data-testid="album-name">{ albumName }</h2>
            <h3 data-testid="artist-name">{ artistName }</h3>
          </div>
          <div className="music-list">
            { musics.map((music) => {
              const { trackId } = music;
              if (music.previewUrl === undefined) {
                return null;
              }
              return (
                <MusicCard
                  checked={ favoritedMusics
                    .some((song) => song.trackId === music.trackId) }
                  music={ music }
                  key={ trackId }
                />
              );
            })}
          </div>
        </div>
      </div>
    )
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
