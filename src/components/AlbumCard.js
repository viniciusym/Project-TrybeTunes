import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const {
      album: { artistName, artworkUrl100, collectionName, collectionId },
    } = this.props;
    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
        className="album-card-div-link"
      >
        <div className="album-card">
          <img src={ artworkUrl100 } alt={ collectionName } />
          <div className="text-album-card">
            <h3>{ collectionName }</h3>
            <p>{ artistName }</p>
          </div>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionId: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumCard;
