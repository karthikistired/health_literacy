import React, { useState } from 'react';
import {Modal,Button} from 'react-bootstrap';
import CustomComponent from './DynamicTable';
import "./TableInputModal.css"

const TableInputModal = ({ isTableModalOpen, closeModal, onSave, csvContent, setCsvContent }) => {
  const [tableData, setTableData] = useState([]);

  const handleAddRow = () => {
    const newRow = { id: tableData.length + 1, name: '', age: '', city: '' };
    setTableData([...tableData, newRow]);
  };

  const [csvcontent, setcsvContent] =useState(csvContent);
  const handleSave = () => {
    console.log(csvContent);
    setCsvContent(csvContent);
    onSave(csvContent);
    closeModal();
  };
  
  return (
    
    <Modal
      show={isTableModalOpen}
      onRequestClose={closeModal}
      contentLabel="Table Input Modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Upload Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Render the custom component */}
        <CustomComponent csvContent={csvcontent} handleSave={handleSave} TableData={tableData} setCsvContent={setcsvContent}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TableInputModal;
