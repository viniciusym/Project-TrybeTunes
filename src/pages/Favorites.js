import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favoritedSongs: [],
      loading: false,
    };

    this.getFavSongsData = this.getFavSongsData.bind(this);
  }

  componentDidMount() {
    this.getFavSongsData();
  }

  getFavSongsData() {
    this.setState({
      loading: true,
    }, async () => {
      const data = await getFavoriteSongs();
      this.setState({
        favoritedSongs: [...await data],
        loading: false,
      });
    });
  }

  render() {
    const { loading, favoritedSongs } = this.state;
    return (
      <div className="page-favorites" data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : (
          favoritedSongs.map((song) => (
            <MusicCard
              updateData={ this.getFavSongsData }
              music={ song }
              checked
              key={ song.trackId }
            />))
        ) }
      </div>
    );
  }
}

export default Favorites;
