import React,{useState} from 'react';
import weights from '../data_in_database/wls.json';
import { Form, Table } from 'react-bootstrap';

export default function WLS() {
    const [see, setSee] = useState(true);
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
            <h1><strong>Weight Literacy Scale</strong></h1>
            <h5>Category: Nutrition</h5>
            <h3>Population: Adults: Older Adults: 65+ Years, Adults: 18 To 64 Years</h3>
            <Form onSubmit={handleSubmit}>
                <div className="table-container">
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Survey #</th>
                                <th><b>Statement</b><br />Please read each statement and circle whether it is: True, False or Don’t Know.</th>
                                <th>True</th>
                                <th>False</th>
                                <th>Don’t Know</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weights.map((weight) => (
                                <React.Fragment key={weight.id}>
                                    {weight.type === 'no_span' && (
                                        <tr>
                                            <td>{weight.id}</td>
                                            <td>{weight.description}</td>
                                            {weight.options.map((option) => (
                                                <td key={option}>
                                                    <Form.Check
                                                        required
                                                        type="radio"
                                                        aria-label="radio 1"
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    )}
                                    {weight.type === 'yes_span' && (
                                        <tr>
                                            <td>{weight.id}</td>
                                            <td colSpan={weight.options.length}>
                                                {weight.description}
                                                {weight.options.map((option) => (
                                                    <div key={option}>
                                                        <Form.Check
                                                            required
                                                            type="radio"
                                                            name={`option_${weight.id}`}
                                                            aria-label="radio 1"
                                                        />
                                                        {option}
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    )}
                                    {weight.type === 'image' && (
                                        <React.Fragment>
                                            <tr>
                                                <td colSpan="5">
                                                    <strong>
                                                        This nutrition label is from a {weight.item} box:
                                                    </strong>
                                                    <br />
                                                    Based on this pizza label, please circle whether the following three statements are: True, False, or Don’t Know.
                                                </td>
                                            </tr>
                                            {weight.question_set.map((question) => (
                                                <tr key={question.sub_id}>
                                                    <td>{question.sub_id}</td>
                                                    <td>{question.sub_description}</td>
                                                    {question.options.map((option) => (
                                                        <td key={option}>
                                                            <Form.Check
                                                                required
                                                                name={`option_${question.sub_id}`}
                                                                type="radio"
                                                                aria-label="radio 1"
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Form>
            <p>
                Interpretation: The scoring of the Weight Literacy Scale is as follows:
                0-5: Very low weight literacy
                6-11: Low weight literacy
                12-17: Moderate weight literacy
                18-23: High weight literacy
            </p>

            <p>
                The average score on the Weight Literacy Scale is 20.6 out of 31 items, which means that participants answered two thirds of the items correctly. This indicates that there is substantial room for improvement in weight literacy
            </p>

            <p>
                A score of 18 or higher indicates that a person has a good understanding of weight control and the factors that influence weight. A score of 17 or lower indicates that a person may benefit from additional information and resources about weight management.
            </p>
            <p>
                The Weight Literacy Scale is a valuable tool for assessing and improving weight literacy. It can be used to identify individuals who may benefit from weight literacy interventions. The Weight Literacy Scale can also be used to track changes in weight literacy over time
            </p>
        </div>
    );
}
