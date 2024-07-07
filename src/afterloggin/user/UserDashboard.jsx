import React from 'react'
import { Nav, Tab } from 'react-bootstrap'

export default function UserDashboard() {
    return (
        <div className='holder'>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <div className="side_bar">
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">My Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Forms Created</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third"></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="fourth"></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="fifth"></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="display_info">
                    <Tab.Content>
                        <Tab.Pane eventKey="first">First tab content</Tab.Pane>
                        <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
                        <Tab.Pane eventKey="third">third tab content</Tab.Pane>
                        <Tab.Pane eventKey="fourth">fourth tab content</Tab.Pane>
                        <Tab.Pane eventKey="fifth">fifth tab content</Tab.Pane>
                    </Tab.Content>
                </div>
        </Tab.Container>
        </div>
    )
}