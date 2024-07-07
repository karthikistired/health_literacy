import React, { useState } from 'react';
import { Modal, Button, Container, Form } from 'react-bootstrap';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import './PreviewModal.css';
import Latex from 'react-latex-next';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const CustomComponent = ({ questions }) => {
  const [userAnswers, setUserAnswers] = useState({}); // Store user answers

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleTextChange = (event) => {
    const { id, value } = event.target;
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send answers to the server)
    console.log('User answers:', userAnswers);
  };
  console.log(questions);
  return (
    <Container style={{ pointerEvents: "none" }}>
      <h1>Survey</h1>
      <Form>

        {questions.map((question, i) => {
          if (question.questionType === 'MCQ') {

            // Render radio buttons for BRIEF questions
            return (
              <div>
                <Form.Group key={question.id} style={{ display: "flex", flexDirection: "column" }}>
                  <Form.Label>{++i + ". " + question.questionText}</Form.Label>
                  {

                    question.image && question.image.length > 0 && question.image.map(img => (
                      <img src={`data:image/jpeg;base64,${img}`} alt="Converted Image" style={{ maxWidth: '200px', marginTop: '10px' }} />
                    ))}
                  {<div>

                    <pre>



                    </pre>
                    <Table>
                      {question.table && question.table.length > 0 && question.table.map(rows => (
                        <TableBody>
                          <TableRow>
                            {rows.split(',').map(dat => (
                              <StyledTableCell>{dat}</StyledTableCell>
                            ))}
                          </TableRow>
                        </TableBody>

                      ))}
                    </Table>
                  </div>
                  }
                  {
                    question.latex && question.latex.length > 0 && question.latex.map((lat, index) => (
                      (
                        <Latex key={index} strict>{lat}</Latex>
                      )
                    ))
                  }
                  {question.options.map((option) => (
                    <Form.Check
                      key={option}
                      type="radio"
                      label={option.optionText}
                      name={question.id} // Group radio buttons by question ID
                      value={option}
                      checked={userAnswers[question.id] === option}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    />
                  ))}
                </Form.Group>
              </div>
            );
          } else if (question.questionType === 'MSQ') {

            // Render radio buttons for BRIEF questions
            return (
              <div>
                <Form.Group key={question.id} style={{ display: "flex", flexDirection: "column" }}>
                  <Form.Label>{++i + ". " + question.questionText}</Form.Label>
                  {

                    question.image && question.image.length > 0 && question.image.map(img => (
                      <img src={`data:image/jpeg;base64,${img}`} alt="Converted Image" style={{ maxWidth: '200px', marginTop: '10px' }} />
                    ))}
                  {<div>

                    <pre>



                    </pre>
                    <Table>
                      {question.table && question.table.length > 0 && question.table.map(rows => (
                        <TableBody>
                          <TableRow>
                            {rows.split(',').map(dat => (
                              <StyledTableCell>{dat}</StyledTableCell>
                            ))}
                          </TableRow>
                        </TableBody>

                      ))}
                    </Table>
                  </div>
                  }
                  {
                    question.latex && question.latex.length > 0 && question.latex.map((lat, index) => (
                      (
                        <Latex key={index} strict>{lat}</Latex>
                      )
                    ))
                  }
                  {question.options.map((option) => (
                    <Form.Check
                      key={option}
                      type="CheckBox"
                      label={option.optionText}
                      name={question.id} // Group radio buttons by question ID
                      value={option}
                      checked={userAnswers[question.id] === option}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    />
                  ))}
                </Form.Group>
              </div>
            );
          } else if (question.questionType === "TABLE") {
            // Render a table for other question types
            return (
              <div key={question.id} className="table-container">
                {

                  question.image && question.image.length > 0 && question.image.map(img => (
                    <img src={`data:image/jpeg;base64,${img}`} alt="Converted Image" style={{ maxWidth: '200px', marginTop: '10px' }} />
                  ))}
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Items</th>
                      {question.hoptions.map((option) => (
                        <th key={option}>{option}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {question.qs.map((qn) => (
                      <tr key={qn.id}>
                        <td>
                          <p align="justify">{qn.id + ". " + qn.text}</p>
                        </td>
                        {qn.options.map((option) => (
                          <td key={option}>
                            <Form.Check
                              key={option}
                              type="radio"
                              name={qn.id} // Group radio buttons by question ID
                              value={option}
                              checked={userAnswers[qn.id] === option}
                              onChange={(e) => handleAnswerChange(qn.id, e.target.value)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            );
          } else if (question.questionType === "INFO") {
            return (
              <div key={question.id}>
                <Form.Label className='form-label'>{++i + ". " + question.questionText}</Form.Label>
                {

                  question.image && question.image.length > 0 && question.image.map(img => (
                    <img src={`data:image/jpeg;base64,${img}`} alt="Converted Image" style={{ maxWidth: '200px', marginTop: '10px' }} />
                  ))}
                <div className="table-container">

                  {question.table && question.table.length > 0 && (
                    <Table striped bordered key={question.id}>
                      <tbody>
                        {question.table.map((row) => (
                          <tr key={row}>
                            <td><pre>{row}</pre></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </div>
                <Form.Control
                  type="text"
                  id={question.id}
                  pattern={question.regex} // Allow only integers
                  onChange={handleTextChange} // Use handleTextChange for input change
                />
              </div>
            );
          }
          return "null";
        })}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br></br>
    </Container>
  )
};

export default function PreviewScratchFormModal({ show, onHide, questions }) {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>{questions[0].id}</>
        {/* Render the custom component */}
        <CustomComponent questions={questions} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};