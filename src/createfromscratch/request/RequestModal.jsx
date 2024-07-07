// PreviewModal.js
import React from 'react';
import { Modal, Button } from '@material-ui/core';
import './RequestModal.css'
import CustomComponent from '../SurveyForm'

export default function RequestModal({ show, onHide }){
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Render the custom component */}
        <CustomComponent />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};