// ProfileSidebar.js
import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // If using React Router

const ProfileSidebar = ({ handleLogout }) => {
  return (
    <Navbar bg="light" expand="md" className="flex-column">
      <Navbar.Brand as={Link} to="/dashboard">Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          {/* Add more sidebar links as needed */}
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ProfileSidebar;
