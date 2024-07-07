import React from 'react'
import rapids from '../data_in_database/rapidss.json'
import { Form, Table } from 'react-bootstrap'

export default function Rapid() {

    const handleSubmit = async () => {
        console.log('');
    }

    return (
        <div>
            <h1><strong>Rapid Estimate Of Adult Literacy In Dentistry - REALD-99</strong></h1>
            <h5>Category: Dental</h5>
            <h3>Population: Adults: 18 To 64 Years</h3>
            <Form onSubmit={handleSubmit}>
                <div className="table-container">
                    <Table striped bordered>
                        <tbody>
                            {
                                rapids.map((rapid) => {
                                    return (
                                        <tr key={rapid.id}>
                                            <td>{rapid.id}</td>
                                            {
                                                rapid.wordings.map((wording) => {
                                                    return (
                                                        <td key={wording}>{wording}</td>
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
            <p>
                Instructions:
                The following words are common dental terms. Please read each word aloud as clearly as you can.
                If you do not know how to pronounce a word, please guess.
                You will receive one point for each word that you read correctly

                Scoring:
                One point is awarded for each word that is read correctly.
                The total score can range from 0 to 99, with higher scores indicating higher levels of health literacy


                Interpretation:
                The REALD-99 is interpreted by comparing the individual's score to the norms for the test. The norms are based on the performance of a large sample of adults in the United States. The norms are divided into five levels of health literacy:
                Level 1: Very low literacy
                Level 2: Low literacy
                Level 3: Marginal literacy
                Level 4: Adequate literacy
                Level 5: High literacy
                An individual's score on the REALD-99 can be used to identify their level of health literacy and to target educational interventions. For example, an individual who scores at Level 1 on the REALD-99 may need more support in understanding dental terminology and instructions.
            </p>

        </div>
    )
}
