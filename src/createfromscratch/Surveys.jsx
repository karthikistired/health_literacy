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
        const surveyId = event.target.value;
        setSelectedSurvey(surveyId);
        console.log('Selected Survey:', surveyId); // Log the selected survey ID
    };

    const handleGenerateReport = async () => {
        if (selectedSurvey) {
            try {
                const response = await axios.get(`http://localhost:5000/api/responses/${selectedSurvey}`);
                console.log(response.data);
                const report = generateCSV(response.data);
                downloadCSV(report, `report_${selectedSurvey}.csv`);
            } catch (error) {
                console.error('Error generating report:', error);
            }
        } else {
            console.log('No survey selected');
        }
    };

    const generateCSV = (responses) => {
        if (!responses.length) return '';

        const headers = ['user_id', ...responses[0].responses.map(resp => `"${resp.questionText.replace(/"/g, '""')}"`)];
        const rows = responses.map(response => [
            response.userId,
            ...response.responses.map(resp => {
                const answer = typeof resp.answer === 'string' ? resp.answer : JSON.stringify(resp.answer);
                return `"${answer.replace(/"/g, '""')}"`;
            })
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
        return csvContent;
    };

    const downloadCSV = (csvContent, fileName) => {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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