import React, { useState } from 'react';
import briefs from '../data_in_database/brief.json';
import { Button, Form } from 'react-bootstrap';

export default function BriefForm() {
    const [userAnswers, setUserAnswers] = useState({}); // Store user answers

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission (e.g., send answers to the server)
        console.log('User answers:', userAnswers);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h1><strong>Brief Health Literacy Screening Tool – BRIEF </strong></h1>
            <h5>Category: General</h5>
            <h3>Population: Adults: 18 To 64 Years</h3>
            {
                briefs.map((question) => {
                    return (
                        <Form.Group className='brief_style' key={question.id}>
                            <Form.Label>{question.id + ". " + question.text}</Form.Label>
                            {question.options.map((option) => (
                                <Form.Check required
                                    key={option}
                                    type="radio"
                                    label={option}
                                    name={question.id} // Group radio buttons by question ID
                                    value={option}
                                    checked={userAnswers[question.id] === option}
                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                />
                            ))}
                        </Form.Group>
                    );
                })
            }
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}
