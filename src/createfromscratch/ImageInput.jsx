import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function ImageInput({onClose,strs}){
  const MAX_FILE_SIZE = 1*1024*1024;
  const [image, setImage] = useState(null);
  const [base64String, setBase64String] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('File size exceeds the limit.'); // or handle error
        event.target.value = null; // reset the input
        return;
      }
      setImage(file);
      imageToString(file);
    }
  };

  const imageToString = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setBase64String(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    strs.push(base64String);
    //console.log('Base64 string:', base64String);
    onClose();
    // You can perform any local operations with the base64String here
    // For example, set it in local storage, send it to another component, etc.
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {base64String && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyItems:"space-between"}}>
          <img src={`data:image/jpeg;base64,${base64String}`} alt="Uploaded" style={{maxHeight:"80%",maxWidth:"80%"}}/>
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      )}
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
    </div>
  );
};