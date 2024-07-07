import React, { useState } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import surveyforms from '../data_in_database/helma.json';

const SurveyForm = () => {

  const [userAnswer, setUserAnswer] = useState({});

  const handleAnswerChange = (questionid, answer) => {
    setUserAnswer((prevAnswer) => ({
      ...prevAnswer,
      [questionid]: answer, // this is used for dynamic selection of option for each question to store it in a key value pair
    }))
  }

  const handleTextChange = (event) => {
    const { questionid, answer } = event.target;
    setUserAnswer((prevAnswer) => ({
      ...prevAnswer,
      [questionid]: answer,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send answers to the server)
    console.log('User Answer is: ', userAnswer);
  }

  return (
    <Container>
      <h1><strong>Health Literacy Measure for Adolescents – HELMA</strong></h1>
      <h5>Category: General</h5>
      <h3>Population: Adults: 10 To 64 Years</h3>
      <Form onSubmit={handleSubmit}>
        {
          surveyforms.map((surveyform) => {
            if (surveyform.type === 'TABLE') {
              return (
                <div key={surveyform.id} className='table-container'>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Question</th>
                        {
                          surveyform.hoptions.map((hoption) => (
                            <th key={hoption}>{hoption}</th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        surveyform.qs.map((q) => (
                          <tr key={q.id}>
                            <td>{q.id}</td>
                            <td>{q.text}</td>
                            {
                              q.options.map((option) => (
                                <td key={option}>
                                  <Form.Check required
                                    type='radio'
                                    key={option}
                                    name={q.id}
                                    value={option}
                                    checked={userAnswer[q.id] === option}
                                    onChange={(event) => handleAnswerChange(q.id, event.target.value)}
                                  />
                                </td>
                              ))}
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              )
            }
            // INFO 
            else if (surveyform.type === 'INFO') {
              return (
                <div className='table-container' key={surveyform.id}>
                  {surveyform.id + ". " + surveyform.text}
                  <Table striped bordered key={surveyform.id}>
                    <tbody>
                      {
                        surveyform.info.map((row) => (
                          <tr key={row}>
                            <td><pre>{row}</pre></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                  <Form.Control required
                    type='text'
                    id={surveyform.id}
                    pattern={surveyform.regex}
                    onChange={handleTextChange}
                  />
                </div>
              );
            }
            else if (surveyform.type === 'MULTIINFO') {
              return (
                <div className='table-container' key={surveyform.id}>
                  {surveyform.id + ". " + surveyform.text}
                  <Table striped bordered key={surveyform.id}>
                    <tbody>
                      {
                        surveyform.info.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((col, colIndex) => (
                              <td key={colIndex}><pre>{col}</pre></td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Form.Control required
                    type='text'
                    id={surveyform.id}
                    pattern={surveyform.regex}
                    onChange={handleTextChange}
                  />
                </div>
              );
            }
            return null;
          })}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br></br>
    </Container>
  );
};

export default SurveyForm;
