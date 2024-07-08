import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function Surveys() {
    const [surveys, setSurveys] = useState([]);
    const [selectedSurvey, setSelectedSurvey] = useState('');

    useEffect(() => {
        // Fetch the list of surveys from the surveyController
        const fetchSurveys = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/survey/getSurvey');
                setSurveys(response.data);
            } catch (error) {
                console.error('Error fetching surveys:', error);
            }
        };

        fetchSurveys();
    }, []);

    const handleSelect = (event) => {
        setSelectedSurvey(event.target.value);
    };

    const handleGenerateReport = () => {
        if (selectedSurvey) {
            // Logic to generate report for the selected survey
            console.log(`Generating report for survey ID: ${selectedSurvey}`);
        } else {
            console.log('No survey selected');
        }
    };

    return (
        <div>
            <Form.Group controlId="surveySelect">
                <Form.Label>Select a Survey</Form.Label>
                <Form.Control as="select" value={selectedSurvey} onChange={handleSelect}>
                    <option value="">Select a Survey</option>
                    {surveys.map((survey) => (
                        <option key={survey.surveyId} value={survey.surveyId}>
                            {survey.surveyId} - {survey.title}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleGenerateReport} style={{ marginTop: '10px' }}>
                Generate Report
            </Button>
        </div>
    );
}
