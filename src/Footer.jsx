import React from 'react'
import { FaAddressBook, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
    return (
        <div className='bottom_details'>
            CopyRight &nbsp;&copy;&nbsp; Owned By MAHE, PSPH <br />
            <FaPhoneAlt /> Phone Number : 9999999999<br />
            <FaAddressBook /> Address : MAHE, MIT, Manipal<br />
        </div>
    )
}