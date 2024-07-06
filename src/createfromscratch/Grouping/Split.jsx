import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Split() {
    const ToolTypes = [{ text: "SpecificTools" }, { text: "GeneralTools" }];
    const navigate = useNavigate();

    function nav(i) {
        if (i === 0) {
            navigate('/specificform');
        } else {
            navigate('/generalform');
        }
    }

    return (
        <div className="split-container">
            <Container>
                <h1 className="mt-4 mb-4">Choose Tool Type</h1>
                <Row>
                    {
                        ToolTypes.map((type, index) => (
                            <div key={index}>
                                <Col md={4}>
                                    <Button onClick={() => nav(index)}>
                                        <Card className="catalog_card mb-4">
                                            <Card.Body>
                                                <Card.Title>{type.text}</Card.Title>
                                                <Card.Text>
                                                    {index === 0 ? (
                                                        <>
                                                            <h4>Choose Specific Tools</h4>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <h4>Choose General Tools</h4>
                                                        </>
                                                    )}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Button>
                                </Col>
                            </div>
                        ))
                    }
                </Row>
            </Container>
        </div>
    );
};