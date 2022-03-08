import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusic from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      musics: [],
      albumData: {
        artistName: '',
        albumName: '',
      },
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusic(id);
    this.setState({
      musics: [...response],
      albumData: {
        artistName: response[0].artistName,
        albumName: response[0].collectionName,
      },
    });
  }

  render() {
    const { musics, albumData: { artistName, albumName } } = this.state;
    return (
      <div className="page-album" data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{ artistName }</h3>
        <h2 data-testid="album-name">{ albumName }</h2>
        { musics.map((music) => {
          const { trackName, previewUrl } = music;
          if (music.previewUrl === undefined) {
            return null;
          }
          return (
            <MusicCard
              trackName={ trackName }
              previewUrl={ previewUrl }
              key={ trackName }
            />);
        })}
      </div>
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
