import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function Registration() {

  const [registrationdetails, setRegistrationDetails] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    password: '',
    country: 0,
    state: 0,
    city: 0,
    passwordhint: '',
    phno: 0
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(registrationdetails);
    console.log(registrationdetails.country);
    console.log(registrationdetails.state);
    console.log(registrationdetails.city);
  }

  return (
    <Form className='registration_page' onSubmit={handleSubmit}>
      <h1 className='mb-3'>Registration Page</h1>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2"> Firstname </span>
        <input className="form-control" type="text" value={registrationdetails.firstname} onChange={(event) => { setRegistrationDetails({ ...registrationdetails, firstname: event.target.value }) }} required />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2"> Middlename </span>
        <input className="form-control" type="text" value={registrationdetails.middlename} onChange={(event) => { setRegistrationDetails({ ...registrationdetails, middlename: event.target.value }) }} required />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2"> Lastname </span>
        <input className="form-control" type="text" value={registrationdetails.lastname} onChange={(event) => { setRegistrationDetails({ ...registrationdetails, lastname: event.target.value }) }} required />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2"> Email </span>
        <input className="form-control" type="email" value={registrationdetails.email} onChange={(event) => { setRegistrationDetails({ ...registrationdetails, email: event.target.value }) }} required />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2"> Password </span>
        <input className="form-control" type="password" value={registrationdetails.password} onChange={(event) => { setRegistrationDetails({ ...registrationdetails, password: event.target.value }) }} required />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2"> Country </span>
        <CountrySelect placeholder="Select your Country" className="form-control" onChange={(event) => { setRegistrationDetails({ ...registrationdetails, country: event.id }) }} required />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2"> State </span>
        <StateSelect className="form-control" placeholder="Select your State" countryid={registrationdetails.country} onChange={(event) => { setRegistrationDetails({ ...registrationdetails, state: event.id }) }} required />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2"> City </span>
        <CitySelect className="form-control" countryid={registrationdetails.country} stateid={registrationdetails.state} onChange={(event) => { setRegistrationDetails({ ...registrationdetails, city: event }) }} required />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2"> Password  Hint </span>
        <input className="form-control" type="text" placeholder='Remember this is needed to change your password'
          value={registrationdetails.passwordhint} onChange={(event) => { setRegistrationDetails({ ...registrationdetails, passwordhint: event.target.value }) }} required />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2"> Phone number </span>
        <input className="form-control" type="tel" maxLength={10} minLength={10} value={registrationdetails.phno} onChange={(event) => { setRegistrationDetails({ ...registrationdetails, phno: event.target.value }) }} required />
      </div>
      <Button className='registration_button' type='submit' variant="outline-primary">Register</Button>
    </Form>
  )
}