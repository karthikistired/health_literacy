import React, { useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import concepts from '../data_in_database/conceptss.json';

export default function Concept() {
    const [userAnswer, setUserAnswer] = useState({});

    const handleOptionChange = (itemnum, optionselected) => {
        setUserAnswer((prevDetails) => (
            {
                ...prevDetails,
                [itemnum]: optionselected,
            }
        ));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Answer is: ', userAnswer);
    }

    return (
        <div>
            <h1><strong>Conceptual based short-form health literacy questionnaire (HLS-SF12)</strong></h1>
            <h5>Category: General</h5>
            <h3>Population: Adults: Older Adults: 65+ years, Adults: 18 to 64 years</h3>
            <Form onSubmit={handleSubmit}>
                <div className="table-container">
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th rowSpan={2}>Id</th>
                                <th rowSpan={2}>On a scale from very easy to very difficult, how easy would you say it is to: </th>
                                <th>Very difficult</th>
                                <th>Fairly difficult</th>
                                <th>Fairly easy</th>
                                <th colSpan={4}>Very easy</th>
                            </tr>
                            <tr>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                concepts.map((concept) => {
                                    return (
                                        <tr key={concept.questionid}>
                                            <td>{concept.questionid}</td>
                                            <td>{concept.description}</td>
                                            {
                                                concept.options.map((option) => {
                                                    return (
                                                        <td key={option}>
                                                            <Form.Check required type="radio"
                                                                name={`option_${concept.questionid}`}
                                                                aria-label="radio 1"
                                                                value={option}
                                                                onChange={(event) => { handleOptionChange(concept.questionid, event.target.value) }}
                                                            />
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </Form>
        </div>
    )
}
