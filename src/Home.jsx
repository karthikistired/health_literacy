import React from 'react'
import Offer from './beforeLoggin/Offer'
import { FaWpforms } from "react-icons/fa6";
import { Image } from 'react-bootstrap';
import uuid from 'react-uuid';

export default function Home() {
    const id = uuid();
    return (
        <address>
            <Image src={require('./images/manipal_intro.jpg')} style={{ height: '50%', width: '75%', margin: '1rem' }} fluid />
            <h1 className='text-center'>Welcome to the Health Literacy Portal</h1>
            <p className='home_info'>
                Our mission is to empower researchers and healthcare professionals by providing a comprehensive platform for accessing, sharing, and contributing to knowledge in the field of health literacy.
                Through our portal, researchers can easily access resources, tools, and information necessary for conducting studies and advancing their understanding of health literacy-related topics. Whether you're investigating patient-provider communication, health education strategies, or the impact of literacy on health outcomes, our platform is designed to support your research endeavors.
            </p>
            <h4>We offer top-notch survey forms, wishing you a prosperous venture ahead!</h4>
            <div className="App-header">

                <div className="card-container">
                    <Offer
                        title="Pre-built Survey Form"
                        description="Use the built-in Form for your Organization"
                        logo={<FaWpforms />}
                        word="Open"
                        show={false}
                        to="/sampleformgroup"
                    />
                    <Offer
                        title="Create from Scratch"
                        description="Built Your Own Form for your Organization"
                        logo={<FaWpforms />}
                        show={false}
                        word="Open"
                        to={"/form/" + id}
                    />
                </div>
            </div>
            <ol type='number' className='details'>
                <li> <b> Research Form Activation: </b></li>
                <section>
                    Our unique system allows researchers to request activation links for specific research forms. Once approved by the admin, researchers can access and utilize these forms to gather data on their chosen topics.
                </section>

                <li> <b> Resource Library: </b></li>
                <section>
                    Explore our extensive collection of articles, studies, and reports covering various aspects of health literacy. Stay updated on the latest findings and trends in the field.
                </section>

                <li> <b> Community Collaboration: </b></li>
                <section>
                    Connect with fellow researchers, practitioners, and educators passionate about health literacy. Share insights, collaborate on projects, and exchange best practices to drive innovation in healthcare communication and education.
                </section>

                <li> <b> Training and Education: </b></li>
                <section>
                    Enhance your knowledge and skills through our training modules and educational resources. From online courses to webinars, we offer opportunities for professional development tailored to the needs of health literacy practitioners.
                </section>
                <li> <b> News and Updates:

                </b></li>
                <section>
                    Stay informed about upcoming events, conferences, and initiatives in the realm of health literacy. Receive regular updates on new research findings, policy developments, and opportunities for engagement.
                </section>
                <p className='mb-3'>
                    Join us in our mission to promote health literacy and improve health outcomes for all. Together, we can bridge the gap between healthcare information and understanding, ensuring that everyone has the knowledge and skills to make informed decisions about their health.
                </p>
            </ol>
        </address>
    )
}
