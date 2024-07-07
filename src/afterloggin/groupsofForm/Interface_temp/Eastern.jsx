import React, { useState } from 'react';
import emahls from '../data_in_database/eastern.json'
import { Form, Table } from 'react-bootstrap'


export default function Eastern() {
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
      <h1><strong>Eastern-Middle Eastern- Adult- Health Literacy 13 Point Questionnaire - EMAHL13</strong></h1>
      <h5>Category: General</h5>
      <h3>Population: Adults: 18 To 64 Years</h3>
      <Form onSubmit={handleSubmit}>
        <div className="table-container">
          <Table striped bordered>
            <thead>
              <tr>
                <th rowSpan={2}>Domain</th>
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
              {emahls ?
                emahls.map((emhal) => (
                  emhal.description_domain.map((consume, index) => (
                    <tr key={`${emhal.id}-${index}`}>
                      {index === 0 && (
                        <>
                          <td rowSpan={emhal.description_domain.length}>{emhal.id}</td>
                          <td rowSpan={emhal.description_domain.length}>{emhal.domain}</td>
                        </>
                      )}
                      <td>{consume.sub_id}. {consume.description}</td>
                      {consume.options.map((option, optionIndex) => (
                        <td key={optionIndex}>
                          <Form.Check required
                            name={`${emhal.id}-${index}`}
                            type="radio"
                            aria-label={`radio-${optionIndex}`}
                            value={option}
                            onChange={(event) => { handleOptionChange(emhal.id, emhal.domain, consume.sub_id, event.target.value) }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                )) : <tr colSpan={emahls.length}>No data found</tr>
              }
            </tbody>
          </Table>
        </div>
      </Form>
      <p>
        Design, development and validation of the Eastern-Middle Eastern-Adult-Health Literacy 13 questionnaire (EMAHL13):
        The tool is comprised of 13 items categorized into 4 domains, representing different activities in which patients engage with their healthcare system, namely 1) completing medical forms, 2) reading patient information materials, 3) navigating the health care system, and 4) differentiating medications [20].
      </p>

      <p>
        Caveat:
        The tool needs to be translated into the most prevalent languages and validated using forward backward translation.
      </p>

      <p>
        Response
        A five-point Liker scale is used to assess participant responses “1=never, 2=rarely, 3=sometimes, 4=most of the time, and 5=always”.
      </p>

      <p>
        Scoring
        The mean score for all item responses ranged from a minimum of 13 to a maximum of 65 for each participant, 1-26 (never/rarely) signifying inadequate health literacy, 27-39 (sometimes) indicating marginal health literacy, and 40-65 (most of the time/always) representing adequate health literacy.
      </p>

      <p>
        Score Interpretation
        Overall literacy rates were calculated per the responses categorized as inadequate (response score 1-26), marginal (response score 27-39) and adequate (response score 40-65). Adequate health literacy is defined as the ability to obtain, process, and understand basic health information to make appropriate health decision
      </p>
    </div>
  )
}
