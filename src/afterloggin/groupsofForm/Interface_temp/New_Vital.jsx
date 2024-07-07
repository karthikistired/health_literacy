import React, { useState } from 'react';
import new_vitals from '../data_in_database/new_vital.json';
import { Form, Table, Button } from 'react-bootstrap';

export default function New_Vital() {
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
                <h1><strong>The Newest Vital Sign </strong></h1>
                <h5>Category: Nutrition</h5>
                <h3>Population: Adults: Older Adults: 65+ Years, Adults: 18 To 64 Years</h3>
                <h4>The NVS is a useful tool for assessing nutrition literacy among adolescents and adults.It can be used to identify individuals who may need additional support to develop their nutrition literacy skills.</h4>
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
                            {new_vitals ?
                                new_vitals.map((new_vital) => (
                                    new_vital.description_domain.map((consume, index) => (
                                        <tr key={consume.options}>
                                            {index === 0 && (
                                                <>
                                                    <td rowSpan={new_vital.description_domain.length}>{new_vital.id}</td>
                                                </>
                                            )}
                                            <td>{consume.sub_id}. {consume.description}</td>
                                            {consume.options.map((option, optionIndex) => (
                                                <td key={optionIndex}>
                                                    <Form.Check required
                                                        key={option}
                                                        type="radio"
                                                        name={new_vital.id} // Group radio buttons by question ID
                                                        value={option}
                                                        checked={userAnswers[new_vital.id] === option}
                                                        onChange={(e) => handleAnswerChange(new_vital.id, e.target.value)}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )) : <tr colSpan={new_vitals.length}>No data found</tr>
                            }
                        </tbody>
                    </Table>
                </div>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            <p>
                How To Use the Newest Vital Sign
                1. Who and when to administer the Newest Vital Sign.A nurse(or other trained clinic staff) is the preferred administrator of the Newest Vital Sign.Administer at the same time that other vital signs are being taken.
                2. Hand the nutrition label to the patient.The patient can and should retain the nutrition label throughout administration of the Newest Vital Sign.The patient can refer to the label as often as desired.
                3. Start Asking the 6 questions, one by one, giving the patient as much time as needed to refer to the nutrition label to answer the questions.There is no maximum time allowed to answer the questions.
            </p>
            <p>
                Record the NVS score in the patient’s medical record, preferably near other vital sign measures
            </p>
            <ul>
                <li> Score of 0 - 1 suggests high likelihood(50 % or more) of limited literacy </li>
                <li> Score of 2 - 3 indicates the possibility of limited literacy. </li>
                <li> Score of 3: This indicates that the person often needs help when reading written material from their  </li>
            </ul>
        </div>
    )
}