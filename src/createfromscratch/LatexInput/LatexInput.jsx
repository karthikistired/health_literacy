import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function LatexInput({ onClose, onSubmit,latexData,setLatexData }){
  const [latexInput, setLatexInput] = useState('');

  const handleInputChange = (event) => {
    setLatexInput(event.target.value);
  };

  const handleSubmit = () => {
    // Validate and process the LaTeX input if needed
    while(latexData.latex.length>0)latexData.latex.shift();
    latexData.latex.push(latexInput); // Create an object with the LaTeX input
    setLatexData(latexData);
    onSubmit(latexData); // Pass the object back to the parent component
    onClose(); // Close the modal
  };

  return (
    <div>
      <TextField
        label="Enter LaTeX"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={latexInput}
        placeholder={[...(latexData.latex)]}
        onChange={handleInputChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit LaTeX
      </Button>
    </div>
  );
};