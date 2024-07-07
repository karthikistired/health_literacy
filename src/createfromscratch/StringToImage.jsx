// Base64ToImage.js
import React from 'react';

const StringToImage = ({ base64String }) => {
  return (
    <div>
      {base64String && (
        <div>
        
          <img src={`data:image/jpeg;base64,${base64String}`} alt="Converted Image" style={{ maxWidth: '100%', marginTop: '10px' }} />
        </div>
      )}
      {!base64String && <p>No image to display</p>}
    </div>
  );
};

export default StringToImage;
