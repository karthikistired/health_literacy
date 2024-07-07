import { Container, Nav, Navbar } from 'react-bootstrap';
import { useEffect } from 'react';
import './Navigation.css'

export default function Navigation() {
    useEffect(() => {
        const darkButton = document.getElementById('dark');
        const lightButton = document.getElementById('light');
        const solarButton = document.getElementById('solar');

        const body = document.body;

        // Apply cached style on reload
        const theme = localStorage.getItem('theme');
        const isSolar = localStorage.getItem('isSolar') === 'true';

        if (theme) {
            body.classList.add(theme);
            if (isSolar) body.classList.add('solar');
        } else {
            body.classList.add('light');
        }

        // Button Event Handlers
        darkButton.onclick = () => {
            body.classList.remove('light');
            body.classList.add('dark');
            if (theme)
                localStorage.setItem('theme', 'dark');
        };

        lightButton.onclick = () => {
            body.classList.replace('dark', 'light');
            if (theme)
                localStorage.setItem('theme', 'light');
        };

        solarButton.onclick = () => {
            if (body.classList.contains('solar')) {
                body.classList.remove('solar');
                solarButton.style.cssText = `
                    --bg-solar:var(--yellow);
                `;
                solarButton.innerText = 'solarize';
                localStorage.removeItem('isSolar');
            } else {
                body.classList.add('solar');
                solarButton.style.cssText = `
                    --bg-solar:white;
                `;
                solarButton.innerText = 'normalize';
                localStorage.setItem('isSolar', true);
            }
        };
    }, []);

    return (
        <Navbar expand="lg" style={{ background: 'var(--nav)', color:"var(--bg)", transition:"background 500ms ease-in-out, color 1000ms ease-in-out"}} data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="/">
                <img className='logo' src={require('../images/manipal_logo.jpg')} alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link className="nav-item has-dropdown">
                            Theme
                            
                            <ul className="dropdown">
                                <li className="dropdown-item" id="light">
                                    light
                                </li>
                                <li className="dropdown-item" id="dark">
                                    dark
                                </li>
                                <li className="dropdown-item" id="solar">
                                    solarize
                                </li>
                            </ul>
                            </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
