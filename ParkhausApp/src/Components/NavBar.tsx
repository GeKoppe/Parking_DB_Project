import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import '../App.css'

function NavBar(tempProps?: {clickHandler?: (site: string) => void}) {
    const props = {
        clickHandler: (site: string) => console.log(site),
        ...tempProps
    }

    return (
        <div className="navBar">
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand>Parkhaus Verwaltung</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Button className='navButton' variant="custom" onClick={() => props.clickHandler('home')}>Startseite</Button>
                        <Button className='navButton' variant="custom" onClick={() => props.clickHandler('admin')}>Administration</Button>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;