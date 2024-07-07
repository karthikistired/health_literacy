import React, { useState } from 'react';
import criticals from '../data_in_database/critical.json';
import { Form, Table } from 'react-bootstrap';

export default function Critical() {

    const [userAnswer, setUserAnswer] = useState([{}]);

    const handleOptionChange = (itemnum, domain_name, itssubid, optionselected) => {
        setUserAnswer((prevDetails) => (
            [
                ...prevDetails,
                {
                    [itemnum]: domain_name,
                    description_domain: [
                        {
                            [itssubid]: optionselected
                        }
                    ]
                }]
        ));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Answer is: ',userAnswer);
    }

    return (
        <div>
            <h1><strong>Critical Nutrition Literacy Instrument</strong></h1>
            <h5> Category: Nutrition</h5>
            <h3>Population: Adults: 18 To 64 Years</h3>
            <Form onSubmit={handleSubmit}>
                <div className="table-container">
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th rowSpan={2}>Item</th>
                                <th rowSpan={2}>Domain</th>
                                <th rowSpan={2}>Questions</th>
                                <th colSpan={5}>Responses</th>
                            </tr>
                            <tr>
                                <th>1. Disagree strongly</th>
                                <th>2. </th>
                                <th>3. </th>
                                <th>4. </th>
                                <th>5. Agree strongly</th>
                            </tr>
                        </thead>
                        <tbody>
                            {criticals ? (
                                criticals.map((critical) => (
                                    critical.description_domain.map((critica, index) => (
                                        <tr key={`${critical.id}-${index}`}>
                                            {index === 0 && (
                                                <>
                                                    <td rowSpan={critical.description_domain.length}>{critical.id}</td>
                                                    <td rowSpan={critical.description_domain.length}>{critical.domain}</td>
                                                </>
                                            )}
                                            <td>{critica.description}</td>
                                            {critica.options.map((option, optionIndex) => (
                                                <td key={++optionIndex}>
                                                    <Form.Check required
                                                        name={`${critical.id}-${index}`}
                                                        type="radio"
                                                        aria-label={`radio-${optionIndex}`}
                                                        value={option}
                                                        onChange={(event)=>{handleOptionChange(critical.id,critical.domain,critica.sub_id,event.target.value)}}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ))
                            ) : (
                                <tr><td colSpan="5">No data found</td></tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </Form>
            <p>
                <b>Interpretation</b>
                The critical nutrition literacy instrument is a 17-item scale that is scored on a 5-point Likert scale. The scale has been shown to be reliable and valid in measuring critical nutrition literacy among adolescents and adults.
            </p>

            <p>
                To score the critical nutrition literacy instrument, simply add up the scores for each item. The total score can range from 0 to 85. A higher score indicates a higher level of critical nutrition literacy.
            </p>
            <p>
                The following are the interpretation guidelines for the critical nutrition literacy instrument:
            </p>
            <ul>
                <li> Score of 0-24: Low critical nutrition literacy. Individuals with this score are not able to critically evaluate nutrition claims and their sources. They may be easily influenced by nutrition claims and may not be able to identify scientific nutrition claims.</li>
                <li> Score of 25-49: Moderate critical nutrition literacy. Individuals with this score are able to critically evaluate some nutrition claims, but they may not be able to identify all scientific nutrition claims. They may be able to identify some of the senders of nutrition claims and their potential biases.</li>
                <li> Score of 50-85: High critical nutrition literacy. Individuals with this score are able to critically evaluate most nutrition claims and are able to identify most scientific nutrition claims. They are also able to identify the senders of nutrition claims and their potential biases.</li>
            </ul>

            <p>
                The critical nutrition literacy instrument is a useful tool for assessing critical nutrition literacy among adolescents and adults. It can be used to identify individuals who may need additional support to develop their critical nutrition literacy skills.
                nutrition claims. They are also able to identify the senders of nutrition claims and their potential biases.
            </p>

            <p>
                The critical nutrition literacy instrument is a useful tool for assessing critical nutrition literacy among adolescents and adults. It can be used to identify individuals who may need additional support to develop their critical nutrition literacy skills.
            </p>
        </div>
    );
}
