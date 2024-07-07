import React from 'react'
import meters from '../data_in_database/meterers.json'
import { Form, Table } from 'react-bootstrap'


export default function Meter() {
    return (
        <div>
            <h1><strong>Medical Term Recognition Test – METER</strong></h1>
            <h5>Category: Health Promotion</h5>
            <h3>Population: Adults: 18 To 64 Years</h3>
            <Form>
                <div className="table-container">
                    <Table striped bordered>
                        <tbody>
                            {
                                meters.map((meter) => {
                                    return (
                                        <tr key={`${meter.id}-${meter.wordings.length}`}>
                                            <td>{meter.id}</td>
                                            {
                                                meter.wordings.map((wording) => {
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
                Interpretation/ Scoring the AAHLS:

                Total Score: Sum the scores for all 14 items.
                Subscale Scores: Calculate the average score for each of the three subscales (functional, communicative, and critical) by dividing the sum of the items in that subscale by the number of items in the subscale.
                Interpretation of Scores:

                There are no standardized cut-off points for interpreting AAHLS scores. However, the following general guidelines can be used:

                Total Score:
                46-56: Excellent health literacy
                36-45: Good health literacy
                26-35: Moderate health literacy
                14-25: Limited health literacy

                Subscale Scores:
                Scores of 3.5 or higher on each subscale indicate adequate skills in that domain.
                Scores below 3.5 may indicate areas where an individual needs improvement.
            </p>

        </div>
    )
}
