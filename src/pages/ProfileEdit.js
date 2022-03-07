import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div className="page-profile-edit" data-testid="page-profile-edit">
        <Header />
        Profile Edit
      </div>
    );
  }
}

export default ProfileEdit;
