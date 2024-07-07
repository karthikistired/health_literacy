import React from 'react'
import { Button, Form } from 'react-bootstrap'

export default function DAHL() {
    const handleSubmit = ()=>{
        console.log('');
    }
    return (
        <div>

            <h1><strong>Demographic Assessment for Health Literacy (DAHL)</strong></h1>
            <h5> Category: General</h5>
            <h3>Population: Adults:  Children: Older Adults: 65+ years</h3>
            <Form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text">
                        <label className="form-label">Age</label>
                    </span>
                    <input type="number" max={100} min={0} name="age" className='form-control' />
                    <span className="input-group-text">
                        <select class="form-select">
                            <option selected value="days">Days</option>
                            <option value="months">Month</option>
                            <option value="years">Years</option>
                        </select>
                    </span>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-text">
                        <label className="form-label">Gender</label>
                    </div>
                    <span className="input-group-text">
                        <input className="form-check-input" type="radio" name='gender' value="" />
                        <label className="form-check-label" htmlFor="male">Male</label>
                    </span>
                    <span className="input-group-text">
                        <input className="form-check-input" type="radio" name='gender' value="" />
                        <label className="form-check-label" htmlFor="female">Female</label>
                    </span>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-text">
                        <label className="form-label">Race/Ethnicity</label>
                    </div>
                    <span className="input-group-text">
                        <input className="form-check-input" type="radio" name='race' value="" />
                        <label className="form-check-label" htmlFor="white">White</label>
                    </span>
                    <span className="input-group-text">
                        <input className="form-check-input" type="radio" name='race' value="" />
                        <label className="form-check-label" htmlFor="black">Black</label>
                    </span>
                    <span className="input-group-text">
                        <input className="form-check-input" type="radio" name='race' value="" />
                        <label className="form-check-label" htmlFor="hispanic">HisPanic</label>
                    </span>
                    <span className="input-group-text">
                        <input className="form-check-input" type="radio" name='race' value="" />
                        <label className="form-check-label" htmlFor="other">Other</label>
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">
                        <label className="form-label">DAHL value is: </label>
                    </span>
                    <input type="text" className='form-control' />
                    <span className='input-group-text'>
                        <Button>Get Value</Button>
                    </span>
                </div>
            </Form>
            <p>
                Calculation <br />
                The DAHL score is calculated as follows: <br />
                DAHL = (Age - 18) * 0.05 + (Years of schooling - 12) * 0.1 + (1 if Race/ethnicity = Black or Hispanic else 0) * 0.15
            </p>
            <p>
                Interpretation <br />
                A DAHL score of 0 or 1 indicates limited health literacy. <br />
                A DAHL score of 2 or more indicates adequate health literacy.
            </p>

        </div>
    )
}

