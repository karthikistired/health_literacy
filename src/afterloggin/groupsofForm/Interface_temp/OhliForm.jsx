import React from 'react'
import { Button, Form } from 'react-bootstrap'

export default function OhliForm() {
  return (
    <div>
      <Form className='login_page'>
        <h1><strong>Oral Health Literacy Instrument – OHLI- ENGLISH</strong></h1>
        <h5>Category: Dental</h5>
        <h3>Population: Adults: 18 To 64 Years</h3>
        <div className="input-group mb-3">
          <span className="input-group-text">
            <label className="form-label">Date (DD/MM/YYYY)</label>
          </span>
          <input type='date' className="form-control dd_mm_yyyy" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">
            <label className="form-label">Name</label>
          </span>
          <input type="text" name="fullname" className='form-control' />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">
            <label className="form-label">Date of Birth (DD/MM/YYYY)</label>
          </span>
          <input type='date' className="form-control dd_mm_yyyy" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">
            <label className="form-label">Age</label>
          </span>
          <input type="number" name="age" className='form-control' />
          <span className="input-group-text">
            <label className="form-label">(yrs)</label>
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
            <label className="form-label">Education Level</label>
          </div>
          <span className="input-group-text">
            <input className="form-check-input" type='checkbox' value="" />
            <label className="form-check-label">Less than high school</label>
          </span>
          <span className="input-group-text">
            <input className="form-check-input" type='checkbox' value="" />
            <label className="form-check-label">High School</label>
          </span>
          <span className="input-group-text">
            <input className="form-check-input" type='checkbox' value="" />
            <label className="form-check-label">Some college/university</label>
          </span>
          <span className="input-group-text">
            <input className="form-check-input" type='checkbox' value="" />
            <label className="form-check-label">College/university graduate</label>
          </span>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-text">
            <label className="form-label">How often do you visit the dentist?</label>
          </div>
          <span className="input-group-text">
            <input className="form-check-input" type='checkbox' value="" />
            <label className="form-check-label">Every 3-6 months</label>
          </span>
          <span className="input-group-text">
            <input className="form-check-input" type='checkbox' value="" />
            <label className="form-check-label">Every year</label>
          </span>
          <span className="input-group-text">
            <input className="form-check-input" type='checkbox' value="" />
            <label className="form-check-label">Every 2-3 years</label>
          </span>
          <span className="input-group-text">
            <input className="form-check-input" type='checkbox' value="" />
            <label className="form-check-label">When there is pain only</label>
          </span>
        </div>
        <Button type='submit' variant="outline-primary">Submit</Button>
      </Form>
    </div>
  )
}
