import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaCopy } from "react-icons/fa";

const UrlShortener = ({ str, setUrl }) => {
  const [longUrl, setLongUrl] = useState(str);
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setLongUrl(str);
  }, [str]);

  useEffect(() => {
    const handleShortenUrl = async () => {
      try {
        let arr=longUrl.split("/");
        if(arr[1]=="is.gd"){
          throw new Error('Failed to shorten URL');
        }

        const id = encodeURIComponent(longUrl);
        const response = await fetch(`https://is.gd/create.php?format=json&url=${id}`);
        if (!response.ok) {
          
          throw new Error('Failed to shorten URL');
        }

        const data = await response.json();
        console.log(data);
        setShortUrl(data.shorturl);

        setError('');
      } catch (error) {
        if (error.name === 'TypeError') {
          console.error('Network error:', error);
          setError('Failed to fetch. Please check your internet connection and try again.');
        } else {
          console.error('Error shortening URL:', error);
          setError('Failed to shorten URL. Please try again.');
        }
      }
    };

    if (longUrl) {
      handleShortenUrl();
    }
  }, [longUrl, setUrl]);

  // const handleShortenUrl = async () => {
  //   try {
  //       const id=encodeURIComponent(longUrl);
  //     const response = await fetch(`https://is.gd/create.php?format=json&url=${id}`);
  //     if (!response.ok) {
  //       throw new Error('Failed to shorten URL');
  //     }
    
  //     const data = await response.json();
  //     console.log(data);
  //     setShortUrl(data.shorturl);
  //     setError('');
  //   } catch (error) {
  //     if (error.name === 'TypeError') {
  //       console.error('Network error:', error);
  //       setError('Failed to fetch. Please check your internet connection and try again.');
  //     } else {
  //       console.error('Error shortening URL:', error);
  //       setError('Failed to shorten URL. Please try again.');
  //     }
  //   }
  // };
  // handleShortenUrl();

  const copyUrlToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      console.log('URL copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy URL: ', err);
    });
  };

  return (
    <div>
      {shortUrl && (
        <div style={{ marginTop: '10px' }}>
          <InputGroup style={{ width: '100%' }}> 
          <Form.Control
            type="text"
            placeholder="Generated URL"
            defaultValue={shortUrl}
            disabled
          />


              <Button variant="outline-secondary" onClick={() => copyUrlToClipboard(shortUrl)}><FaCopy /></Button>


          </InputGroup>
          
        </div>
      )}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default UrlShortener;
