import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FaRegEyeSlash, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Login() {
  const [hide, setHide] = useState(true);
  const [logindetails, setLoginDetails] = useState({ email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(logindetails);
  }

  return (
    <Form className='login_page' onSubmit={handleSubmit}>
      <h1 className='mb-3'>Login Page</h1>
      <div className="mb-3">
        <input className="form-control" type="email" value={logindetails.email}
          placeholder="Email" onChange={(event) => { setLoginDetails({ ...logindetails, email: event.target.value }) }} required />
      </div>
      <div className="input-group mb-3">
        <input className="form-control" id="pass" type={hide ? "password" : "text"} value={logindetails.password}
          placeholder="Password" onChange={(event) => { setLoginDetails({ ...logindetails, password: event.target.value }) }} required />
        <span className="input-group-text show_password" >
          <Button id='show_password' onClick={() => { setHide((prev) => !prev) }}>{hide ? <FaRegEyeSlash /> : <FaEye />} </Button>
        </span>
      </div>
      <Button className='login_button' type='submit' variant="outline-primary">Login</Button> <br /><br />
      <span>Dont Have an Account?<Link to='/register'> Lets create one</Link></span>
    </Form>
  )
}