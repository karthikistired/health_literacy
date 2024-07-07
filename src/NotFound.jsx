import React from 'react';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
export default function NotFound(){
    return (
        <div className="pagenotfound">
            Page not Found <br/>
            <Button variant='outline-danger'><Link to="/">Home</Link></Button>
        </div>
    )
}