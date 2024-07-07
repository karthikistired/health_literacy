import React, { useState } from 'react';
import sils from '../data_in_database/sils.json';
import { Form, Table, Button } from 'react-bootstrap';

function SILS() {
    const [userAnswers, setUserAnswers] = useState({}); // Store user answers

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission (e.g., send answers to the server)
        console.log('User answers:', userAnswers);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <h1><strong>Single Item Screener – SILS </strong></h1>
                <h5>Category: General</h5>
                <h3>Population: Adults: 18 To 64 Years</h3>
                <div className="table-container">
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th rowSpan={2}>Item</th>
                                <th rowSpan={2}>Questions</th>
                                <th colSpan={5}>Responses</th>
                            </tr>
                            <tr>
                                <td>"Never"</td>
                                <td>"Rarely"</td>
                                <td>"Sometimes"</td>
                                <td>"Usually"</td>
                                <td>"Always"</td>
                            </tr>
                        </thead>
                        <tbody>
                            {sils ?
                                sils.map((sil) => (
                                    sil.description_domain.map((consume, index) => (
                                        <tr key={consume.options}>
                                            {index === 0 && (
                                                <>
                                                    <td rowSpan={sil.description_domain.length}>{sil.id}</td>
                                                </>
                                            )}
                                            <td>{consume.description}</td>
                                            {consume.options.map((option, optionIndex) => (
                                                <td key={optionIndex}>
                                                    <Form.Check required
                                                        key={option}
                                                        type="radio"
                                                        name={sil.id} // Group radio buttons by question ID
                                                        value={option}
                                                        checked={userAnswers[sil.id] === option}
                                                        onChange={(e) => handleAnswerChange(sil.id, e.target.value)}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )) : <tr colSpan={sils.length}>No data found</tr>
                            }
                        </tbody>
                    </Table>
                </div>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            <p>
                The SILS is a single-item tool that is used to screen for inadequate health literacy. The question asks how often a person needs help when reading written material from their doctor or pharmacy. The answer options range from "never" to "always."
                <b>Interpretation</b>
                The critical nutrition literacy instrument is a 17-item scale that is scored on a 5-point Likert scale. The scale has been shown to be reliable and valid in measuring critical nutrition literacy among adolescents and adults.
            </p>
            <p>
                Score:
                The SILS is scored on a scale of 1 to 5, with 1 being "never" and 5 being "always." A score of 2 or higher is considered to be a positive screen for inadequate health literacy.
                Interpretation of scores:
            </p>
            <ul>
                <li> Score of 1: This indicates that the person does not need help when reading written material from their doctor or pharmacy. </li>
                <li> Score of 2: This indicates that the person sometimes needs help when reading written material from their doctor or pharmacy. </li>
                <li> Score of 3: This indicates that the person often needs help when reading written material from their doctor or pharmacy. </li>
                <li> Score of 4: This indicates that the person frequently needs help when reading written material from their doctor or pharmacy. </li>
                <li> Score of 5: This indicates that the person always needs help when reading written material from their doctor or pharmacy. </li>
            </ul>
        </div>
    )
}

export default SILS