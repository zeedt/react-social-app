import React from 'react'
import './navbar.css';
import { Navbar, InputGroup, Nav, FormControl, Form, NavDropdown } from 'react-bootstrap'
import { NavLink, withRouter } from 'react-router-dom'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserService from '../user/user-service';

class AppNavbar extends React.Component {

    constructor(props) {
        super(props);
        console.log('pro ' + this.props.loadLogin);
    }

    componentWillMount() {
        console.log("Component will mount");
        if (this.props.loadLogin) {
            this.props.history.push('/login')
        }
    }

    logout = () => {
        UserService.logout();
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('first_name');
        window.localStorage.removeItem('last_name');
        window.localStorage.removeItem('access_token');
        window.location.href = '/';
    }

    loadInfoPage = () => {
        this.props.history.push('/info');
    }
    render() {
        return this.props.loadLogin ? null : (
            <div className='col-md-12 header-super-container'>
                <div className='container col-md-6 header-container' >
                    <Navbar expand='lg' bg='light'>
                        <Navbar.Brand>
                            <img src='logo192.png' height={30} width={30} alt='not available' />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-bar' />
                        <Navbar.Collapse>
                            <Nav className="mr-auto">
                                <NavLink to="/page">Home</NavLink>
                            </Nav>
                            <Form inline>
                                <InputGroup>
                                    <FormControl
                                        placeholder="Username"
                                        aria-label="Username"
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                            {/* <Nav>
                                    <NavLink to="#"><img src='image/logo.png' height={30} width={30} /></NavLink>
                                </Nav> */}
                            <NavDropdown title={window.localStorage.username} id="nav-dropdown">
                                <NavDropdown.Item eventKey="4.3" onClick={this.logout}>Log Out</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="4.4" onClick={this.loadInfoPage}>Edit profile</NavDropdown.Item>
                            </NavDropdown>
                        </Navbar.Collapse>
                    </Navbar>

                </div>
            </div>
        )
    }
}


export default withRouter(AppNavbar);