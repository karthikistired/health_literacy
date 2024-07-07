import React, { useState } from 'react';
import composites from '../data_in_database/composite_health.json';
import { Form, Table } from 'react-bootstrap';

export default function CompositeHealth() {

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
            <h1><strong>Composite Health Literacy Scale and Subjective Numeracy Scale - HLS / SNS</strong></h1>
            <h5> Category: Diabetes</h5>
            <h3>Population: Adults: Older Adults: 65 + years, Adults: 18 to 64 years</h3>
            <Form onSubmit={handleSubmit}>
                <div className="table-container">
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th rowSpan={2}>Item number</th>
                                <th rowSpan={2}>Domain</th>
                                <th rowSpan={2}>Questions</th>
                                <th colSpan={5}>Responses</th>
                            </tr>
                            <tr>
                                <th>Not_at_all</th>
                                <th>A_little </th>
                                <th>Somewhat </th>
                                <th>Quite_a_bit </th>
                                <th>Very_much</th>
                            </tr>
                        </thead>
                        <tbody>
                            {composites ?
                                composites.map((composite) => (
                                    composite.description_domain.map((consume, index) => (
                                        <tr key={`${consume.id}-${index}`}>
                                            {index === 0 && (
                                                <>
                                                    <td rowSpan={composite.description_domain.length}>{composite.id}</td>
                                                    <td rowSpan={composite.description_domain.length}>{composite.domain}</td>
                                                </>
                                            )}
                                            <td>{consume.sub_id}. {consume.description}</td>
                                            {consume.options.map((option, optionIndex) => (
                                                <td key={optionIndex}>
                                                    <Form.Check required
                                                        name={`${composite.id}-${index}`}
                                                        type="radio"
                                                        aria-label={`radio-${optionIndex}`}
                                                        value={option}
                                                        onChange={(event)=>{handleOptionChange(composite.id,composite.domain,consume.sub_id,event.target.value)}}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )) : <tr colSpan={composites.length}>No data found</tr>
                            }
                        </tbody>
                    </Table>
                </div>
            </Form>
            <p>
                <b>Score/ Interpretation</b>
                The HLS and SNS are scored on a scale of 0 to 10, with 10 being the highest possible score. A high score on the HLS indicates that a person has good health literacy skills, while a high score on the SNS indicates that a person has good numeracy skills.
            </p>
            <p>
                Score of 0-26: Low health literacy and numeracy skills.
                Score of 27-43: Moderate health literacy and numeracy skills.
                Score of 44-52: High health literacy and numeracy skills.
                Interpreting the HLS and SNS
            </p>
            <p>
                The HLS and SNS can be used to assess a person's health literacy and numeracy skills. These skills are important for understanding and making decisions about health information. People with low health literacy and numeracy skills may have difficulty understanding their health information, making decisions about their health, and following their doctor's instructions.
            </p>
            <p>
                The HLS and SNS can also be used to identify people who may need additional help understanding and using health information. These people may benefit from educational programs or other interventions that can help them improve their health literacy and numeracy skill
            </p>
        </div>
    );
}