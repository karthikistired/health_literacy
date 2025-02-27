import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Accordion, Form, FormLabel } from 'react-bootstrap';
import { Table, TableBody, TableRow, TableCell, withStyles, ButtonBase, Button } from '@material-ui/core';
import Latex from 'react-latex-next';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default function ResponseTemplate() {
    const surveyId = '9eba941a-434a-4e30-b081-abb96fb7e663'; // Note: UseParams should be used here
    const [userAnswers, setUserAnswers] = useState({});  // Initialize with an empty object
    const [questions, setQuestions] = useState([]);
    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyDesc, setSurveyDesc] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/survey/getSurvey`);
                const qs = response.data;

                if (Array.isArray(qs)) {
                    const survey = qs.find((survey) => survey.surveyId === surveyId);
                    if (survey) {
                        setQuestions(survey.questions || []);
                        setSurveyTitle(survey.title);
                        setSurveyDesc(survey.description);
                    } else {
                        console.error('Survey not found for the given ID:', surveyId);
                    }
                    console.log(survey);
                } else {
                    console.error('Fetched data is not an array:', qs);
                }
            } catch (error) {
                console.error('Error fetching survey data:', error);
            }
            
        };

        fetchData();
    }, [surveyId]);

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleAnswerAdd = (questionId, answer) => {
        setUserAnswers((prevAnswers) => {
            const currentAnswers = prevAnswers[questionId] || [];
            if (currentAnswers.includes(answer)) {
                return {
                    ...prevAnswers,
                    [questionId]: currentAnswers.filter((ans) => ans !== answer),
                };
            } else {
                return {
                    ...prevAnswers,
                    [questionId]: [...currentAnswers, answer],
                };
            }
        });
    };

    const handleTextChange = (event) => {
        const { id, value } = event.target;
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission (e.g., send answers to the server)
        console.log('User answers:', userAnswers);
    };

    const handleSave = () => {
        const csvContent = "data:text/csv;charset=utf-8," + 
            questions.map((question, index) => {
                const answer = userAnswers[index];
                return `${question.questionText},${answer}`;
            }).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "user_answers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="response-template" style={{ background: "var(--bglowalpha)" }}>
            <div className="response_top">
                {surveyTitle && (
                    <div className='title-box' style={{ color: "var(--text)", alignContent: "center" }}>
                        <h1>{surveyTitle}</h1>
                    </div>
                )}
                {surveyDesc && (
                    <div className='Desc-box' style={{ color: "var(--text2)" }}>
                        <h2>{surveyDesc}</h2>
                    </div>
                )}
            </div>
            <div className='response_bottom'>
                <Accordion defaultActiveKey="0">
                    {questions && questions.length > 0 && questions.map((question, index) => (
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>{question.questionText}</Accordion.Header>
                            <Accordion.Body>
                                <Form>
                                    <FormLabel>{question.questionText}</FormLabel>
                                    {question.image && question.image.length > 0 && (
                                        <img src={`data:image/jpeg;base64,${question.image}`} alt="" style={{ maxWidth: '200px', marginTop: '10px' }} />
                                    )}
                                    {question.table && question.table.length > 0 && (
                                        <div>
                                            <Table>
                                                {question.table.map((rows, rowIndex) => (
                                                    <TableBody key={rowIndex}>
                                                        <TableRow>
                                                            {rows.split(',').map((dat, cellIndex) => (
                                                                <StyledTableCell key={cellIndex}>{dat}</StyledTableCell>
                                                            ))}
                                                        </TableRow>
                                                    </TableBody>
                                                ))}
                                            </Table>
                                        </div>
                                    )}
                                    {question.latex && question.latex.length > 0 && question.latex.map((lat, index) => (
                                        <Latex key={index} strict>{lat}</Latex>
                                    ))}
                                    {(question.questionType === "MCQ" && question.options.map((option, optionIndex) => (
                                        <Form.Check
                                            key={optionIndex}
                                            type="radio"
                                            label={option.optionText}
                                            value={option.optionText}
                                            name={index}
                                            checked={userAnswers[index] === option.optionText}
                                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                                        />
                                    ))) || (question.questionType === "MSQ" && question.options.map((option, optionIndex) => (
                                        <Form.Check
                                            key={optionIndex}
                                            type="checkbox"
                                            label={option.optionText}
                                            value={option.optionText}
                                            checked={userAnswers[index] && userAnswers[index].includes(option.optionText)}
                                            onChange={(e) => handleAnswerAdd(index, e.target.value)}
                                        />
                                    ))) || (question.questionType === "INFO" && (
                                        <Form.Control
                                            type="text"
                                            id={index}
                                            pattern={question.regex ? question.regex : undefined}
                                            onChange={handleTextChange}
                                        />
                                    ))}
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
                <ButtonBase style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <Button onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                </ButtonBase>
            </div>
        </div>
    );
}
