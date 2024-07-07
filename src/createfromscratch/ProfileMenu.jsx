import React, { useState } from 'react';
//import './ProfileMenu.css'; // Assuming you have a CSS file for styling

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="profile-menu">
      <div className="profile-icon" onClick={toggleMenu}>
        <img src='../images/SampleSurvey.png' alt="Profile" />
      </div>
      {isOpen && (
        <ul className="menu-options">
          <li onClick={handleLogout}>Logout</li>
          {/* Add more menu options as needed */}
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
