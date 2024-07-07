// PreviewModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './surveyPreview.css'
// import CustomComponent from '../SurveyForm'

export default function PreviewModal({ show, onHide }){
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Render the custom component */}
        {/* <CustomComponent /> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

