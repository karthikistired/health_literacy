import React, { useState } from 'react';
import consumers from '../data_in_database/caphs.json';
import { Form, Table } from 'react-bootstrap';

export default function CAHPS() {

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
            <h1><strong>Consumer Assessment of Healthcare Providers and Systems – CAHPS</strong></h1>
            <h5> Category: Health Promotion</h5>
            <h3> Population: Adults: 18 To 64 Years</h3>
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
                                <th>"Never"/"Yes"</th>
                                <th>"Sometimes","No"</th>
                                <th>"Usually"</th>
                                <th>"Always"</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consumers.map((consumer) => (
                                consumer.description_domain.map((consume, index) => (
                                    <tr key={`${consumer.id}-${index}`}>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={consumer.description_domain.length}>{consumer.id}</td>
                                                <td rowSpan={consumer.description_domain.length}>{consumer.domain}</td>
                                            </>
                                        )}
                                        <td>{consume.sub_id}. {consume.description}</td>
                                        {consume.options.map((option, optionIndex) => (
                                            <td key={optionIndex}>
                                                <Form.Check required
                                                    name={`${consumer.id}-${index}`}
                                                    type="radio"
                                                    aria-label={`radio-${optionIndex}`}
                                                    value={option}
                                                    onChange={(event) => { handleOptionChange(consumer.id, consumer.domain, consume.sub_id, event.target.value) }}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Form>
            <p>
                Interpretation:
                Assign a score to each item. The HCAHPS Item Set for Addressing Health Literacy uses a 4-point scale to measure patients' experiences with communication and information. The scale is as follows:
                Never: I did not experience this at all. (Score = 0)
                Sometimes: I experienced this a little bit. (Score = 1)
                Usually: I experienced this a good amount. (Score = 2)
                Always: I experienced this all the time. (Score = 3)
            </p>

            <p>
                Calculate the average score for each domain. The HCAHPS Item Set for Addressing Health Literacy consists of 7 domains:
                Communication with nurses
                Communication with doctors
                Communication about tests
                Communication about caring for yourself at home
                Communication about medicines
                Interpreter services
                Communication about forms
            </p>

            <p>
                For each domain, add up the scores for all the items in the domain and divide by the number of items in the domain. This will give you the average score for the domain.
                Calculate the overall score. The overall score for the HCAHPS Item Set for Addressing Health Literacy is calculated by averaging the scores for the 7 domains.

                Interpret the scores.
                The scores for the HCAHPS Item Set for Addressing Health Literacy range from 0 to 10, with 10 being the best possible score. A score of 10 means that the patient experienced excellent communication and information from healthcare providers. A score of 0 means that the patient experienced no communication and information from healthcare providers.
            </p>

            <p>
                Here are some examples of how to interpret the scores:
                A score of 8 or 9 indicates that the patient experienced very good communication and information from healthcare providers.
                A score of 6 or 7 indicates that the patient experienced good communication and information from healthcare providers.
                A score of 4 or 5 indicates that the patient experienced fair communication and information from healthcare providers.
                A score of 3 or below indicates that the patient experienced poor communication and information from healthcare providers.
                It is important to note that the HCAHPS Item Set for Addressing Health Literacy is just one measure of patient experience. Other factors, such as clinical outcomes, should also be considered when making decisions about healthcare providers
            </p>
        </div>
    );
}
