import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div className="page-album" data-testid="page-album">
        <Header />
        Album
      </div>
    );
  }
}

export default Album;
