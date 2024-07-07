import React, { useState, useEffect } from 'react';
import moment from 'moment'; // Import momentjs for time calculations
import './Toolbar.css'; // Import CSS for styling
import PreviewScratchFormModal from './previews/PreviewScratchFormModal';
import { Button, Menu, MenuItem } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save'
import { AiOutlineEye } from 'react-icons/ai';
import ProfileMenu from './ProfileMenu';
import PublishModal from './publish/PublishModal';

export default function Toolbar({ data }){
  const [lastSaveTime, setLastSaveTime] = useState(moment().toDate()); // Use moment to set initial last save time
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeSaved, setTimeSaved] = useState('');

  const [showPublishModal, setShowPublishModal] = useState(false);

  const openPublishModal = () => {
    console.log("table open");
    setShowPublishModal(true);
  };

  const closePublishModal = () => {
    setShowPublishModal(false);
  };


  // Function to update last save time
  const handleSave = () => {
    setLastSaveTime(moment().toDate()); // Update last save time using moment
  };

  // Function to calculate time elapsed since last save
  const calculateTimeSaved = () => {
    if (lastSaveTime === null) {
      return 'No saves yet';
    } else {
      const duration = moment.duration(moment().diff(lastSaveTime));
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
      }
    }
  };

  useEffect(() => {
    let intervalId;

    if (lastSaveTime !== null) {
      // Update time every second
      intervalId = setInterval(() => {
        const newTimeSaved = calculateTimeSaved();
        setTimeSaved(newTimeSaved); // Update state to force re-render
      }, 1000);
    }

    // Clear interval on component unmount or when lastSaveTime becomes null
    return () => clearInterval(intervalId);
  }, [lastSaveTime]);

  // Function to open the preview modal
  const openPreviewModal = () => {
    setIsPreviewModalOpen(true);
  };

  // Function to close the preview modal
  const closePreviewModal = () => {
    setIsPreviewModalOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="toolbar">
      <div className='toolbar_left'>
        <div className="toolbar-item">
          {/* Dropdown for Tools */}
          <Button
            id="dropdown-tools"
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            onClick={handleClick}
            variant="contained"
          >
            Tools
          </Button>
          <Menu
            id="dropdown-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Item 1</MenuItem>
            <MenuItem onClick={handleClose}>Item 2</MenuItem>
            <MenuItem onClick={handleClose}>Item 3</MenuItem>
          </Menu>
        </div>
      </div>
      <div className='toolbar_mid'>
        <div className="toolbar-item">
          <span className="toolbar-label">Time Since Last Save:</span>

          <span className="toolbar-value">{timeSaved}</span>

        </div>
        <div className="toolbar-item">
          <Button className="toolbar-button" onClick={handleSave} style={{ backgroundColor: "#007BFF", alignItems: "center" }}>Save<SaveIcon /></Button>
        </div>
      </div>

      <div className='toolbar_right'>
        <div className="toolbar-item">
          <Button className="toolbar-button" onClick={openPreviewModal} variant='outlined' style={{ backgroundColor: "transparent", color: "var(--text2)", border: "1.5px solid var(--text2)" }}>Preview
            <AiOutlineEye fontSize="small" className="form_header_icon" style={{ color: "var(--text2)" }} /></Button>
        </div>
        <div className="toolbar-item">
          <Button className="toolbar-button" variant='contained' style={{ backgroundColor: "#66BB6A" }} onClick={openPublishModal}>Publish</Button>

        </div>
        {/*<div className="toolbar-item">
          <ProfileMenu />
        </div>*/}
      </div>
      <PreviewScratchFormModal questions={data.qs} show={isPreviewModalOpen} onHide={closePreviewModal} /> {/* Render the PreviewModal component */}
      <PublishModal surveyId={data.surveyId} show={showPublishModal} onHide={closePublishModal} />
    </div>
  );
};