import React, { useState } from 'react'
import aahls from '../data_in_database/aahlss.json'
import { Button, Form, Table } from 'react-bootstrap'


export default function AAHLS() {

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
        console.log('Answer is: ', userAnswer);
    }
    return (
        <div>
            <h1><strong>All Aspects of Health Literacy Scale – AAHLS</strong></h1>
            <h5>Category: General</h5>
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
                                <td>"Never"/"Yes"</td>
                                <td>"Rarely"/"No"</td>
                                <td>"Sometimes"</td>
                                <td>"Usually"</td>
                                <td>"Always"</td>
                            </tr>
                        </thead>
                        <tbody>
                            {aahls ?
                                aahls.map((aahl) => (
                                    aahl.description_domain.map((consume, index) => (
                                        <tr key={`${aahl.id}-${consume.sub_id}`}>
                                            {index === 0 && (
                                                <>
                                                    <td rowSpan={aahl.description_domain.length}>{aahl.id}</td>
                                                    <td rowSpan={aahl.description_domain.length}>{aahl.domain}</td>
                                                </>
                                            )}
                                            <td>{consume.sub_id}. {consume.description}</td>
                                            {consume.options.map((option, optionIndex) => (
                                                <td key={++optionIndex}>
                                                    <Form.Check required
                                                        name={`${aahl.id}-${index}`}
                                                        type="radio"
                                                        aria-label={`radio-${optionIndex}`}
                                                        value={option}
                                                        onChange={(event) => { handleOptionChange(aahl.id, aahl.domain, consume.sub_id, event.target.value) }}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )) : <tr colSpan={aahls.length}>No data found</tr>
                            }
                        </tbody>
                    </Table>
                </div>
                <Button variant='primary' type='submit'>Submit</Button>
            </Form>
            <p>
                Interpretation/ Scoring the AAHLS:

                Total Score: Sum the scores for all 14 items.
                Subscale Scores: Calculate the average score for each of the three subscales (functional, communicative, and critical) by dividing the sum of the items in that subscale by the number of items in the subscale.
                Interpretation of Scores:
            </p>
            <p>
                There are no standardized cut-off points for interpreting AAHLS scores. However, the following general guidelines can be used:
            </p>
            <p>
                Total Score:
                46-56: Excellent health literacy
                36-45: Good health literacy
                26-35: Moderate health literacy
                14-25: Limited health literacy
            </p>
            <p>
                Subscale Scores:
                Scores of 3.5 or higher on each subscale indicate adequate skills in that domain.
                Scores below 3.5 may indicate areas where an individual needs improvement.
            </p>

        </div>
    )
}
