import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.loadingState = this.loadingState.bind(this);
  }

  loadingState(music) {
    this.setState({
      loading: true,
    }, (async () => {
      const favoritedSongs = await getFavoriteSongs();
      if (!favoritedSongs.some((song) => music.trackId === song.trackId)) {
        await addSong(music);
      }
      if (favoritedSongs.some((song) => music.trackId === song.trackId)) {
        await removeSong(music);
      }
      this.setState({
        loading: false,
      });
    }
    ));
  }

  render() {
    const { music: { previewUrl, trackName, trackId }, music, checked } = this.props;
    const { loading } = this.state;
    return (
      <div className="music-list">
        <p>{ trackName }</p>
        { loading ? <Loading /> : (
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
        )}
        <label htmlFor="favoriteSong">
          Favorita
          <input
            type="checkbox"
            name="favoriteSong"
            id="favoriteSong"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ () => this.loadingState(music) }
            defaultChecked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
