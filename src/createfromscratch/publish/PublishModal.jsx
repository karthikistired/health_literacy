import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import QRCode from 'qrcode';
import UrlShortener from './UrlShortener';

export default function PublishModal({ show, onHide, surveyId }) {
  console.log(surveyId);
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    const generateQR = async () => {
      try {
        const randomUrl = `localhost:3000/responsetemplate?surveyId=${surveyId}`; // Update with proper url
        setUrl(randomUrl);
        const response = await QRCode.toDataURL(randomUrl, { errorCorrectionLevel: 'H' }); // Use the random URL to generate the QR code
        setQrCode(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (show) { 
      generateQR(); }
  }, [show]);

  

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      console.log('URL copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy URL: ', err);
    });
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Publish</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Generated URL"
            defaultValue={url}
            disabled
          />
          {/* {url && <UrlShortener str={url} setUrl={setUrl}/>} */}
          {qrCode && <img src={qrCode} alt="QR Code" />}
          <Button variant="primary" onClick={copyUrlToClipboard} style={{ display: 'block' }}>
            Copy URL
          </Button>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};