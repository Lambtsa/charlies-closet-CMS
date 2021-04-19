import React from 'react';

const ProfileWidget = ({ userDetails }) => (
  <>
    <div className="sidebar__profile">
      <h2 className="sidebar__userCircle">{`${userDetails.given_name[0].toUpperCase()}${userDetails.family_name[0].toUpperCase()}`}</h2>
      <div className="sidebar__profile--details">
        <h2>{userDetails.name}</h2>
        <p>{userDetails.email}</p>
      </div>
    </div>
  </>
);

export default ProfileWidget;
