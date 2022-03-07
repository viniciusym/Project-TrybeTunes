import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div className="page-profile" data-testid="page-profile">
        <Header />
        Profile
      </div>
    );
  }
}

export default Profile;
