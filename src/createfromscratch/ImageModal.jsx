// PreviewModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './imageModal.css'
import CustomComponent from './ImageInput'

const ImageModal = ({ open, onClose,strs }) => {
  return (
    <Modal show={open} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Upload Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Render the custom component */}
        <CustomComponent onClose={onClose} strs={strs}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;
