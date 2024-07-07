// CatalogPage.js
import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import catalogItems from '../data_in_database/Catalog.json';
import PreviewModal from '../../../createfromscratch/previews/PreviewModal'; // Import the PreviewModal component
import Offer from "../../../beforeLoggin/Offer";
import { FaWpforms } from 'react-icons/fa6';

export default function FormGroup() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('');


  const handleFilter = (event) => {
    if (event.target.value === 'reset') {
      setFilter('');
    } else {
      setFilter(event.target.value);
    }
  }

  const handlePreview = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <div className='group'>
        <h1 className="mt-4 mb-4">Built in Forms/Catalog</h1>
        <Form.Select onChange={handleFilter}>
          <option value="reset">All Forms</option>
          <option value="general">General</option>
          <option value="nutrition">Nutrition</option>
          <option value="diabetes">DIABETES</option>
          <option value="health promotion">HEALTH PROMOTION</option>
          <option value="kidney disease">Kidney Disease</option>
        </Form.Select>
        {catalogItems.map(item => {
          return (
            item.CATEGORY.map((category) => (
              filter === '' || filter === category.toLocaleLowerCase() ?
                <Offer key={item.id}
                  logo={<FaWpforms />}
                  description={item.tool}
                  category={item.CATEGORY + " "}
                  to={item?.to}
                  show={true}
                  onClick={handlePreview}
                  word="Request"
                /> : null
            ))
          )
        }
        )}
      </div>
      {/* Render the PreviewModal component */}
      <PreviewModal show={showModal} onHide={handleCloseModal} />
    </Container>
  );
};
