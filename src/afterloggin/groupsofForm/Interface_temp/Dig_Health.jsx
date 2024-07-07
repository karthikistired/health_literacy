import React, { useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import dighealths from '../data_in_database/dig_health.json';

export default function Dig_Health() {

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
            <h1><strong>Digital Healthy Diet Literacy (DDL)</strong></h1>
            <h5>Category: Nutrition, Digital health</h5>
            <h3>Population: Adults:  Children: Adults: 18 to 64 years</h3>
            <Form onSubmit={handleSubmit}>
                <div className="table-container">
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th rowSpan={2}>Id</th>
                                <th rowSpan={2}>Id</th>
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
                                dighealths.map((dighealth) => {
                                    return (
                                        <tr key={dighealth.questionid}>
                                            <td>{dighealth.questionid}</td>
                                            <td>{dighealth.description}</td>
                                            {
                                                dighealth.options.map((option) => {
                                                    return (
                                                        <td key={option}><Form.Check required type="radio"
                                                         name={`option_${dighealth.questionid}`} 
                                                         aria-label="radio 1"
                                                         value={option}
                                                         onChange={(event)=>{handleOptionChange(dighealth.questionid,event.target.value)}}
                                                         /></td>
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
