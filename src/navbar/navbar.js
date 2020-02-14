import React, { useRef } from 'react'
import './navbar.css';
import { Navbar, InputGroup, Nav, FormControl, Form, NavDropdown, Overlay, ButtonToolbar, Popover } from 'react-bootstrap'
import { NavLink, withRouter } from 'react-router-dom'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserService from '../user/user-service';
import { debounce } from "lodash";
import axios from 'axios';
const BASE_URL = 'http://localhost:3001/'

class AppNavbar extends React.Component {

    constructor(props) {
        super(props);
        console.log('pro ' + this.props.loadLogin);
        this.ref = React.createRef();
        this.state = {
            showMore: false,
            target: undefined,
            searchFilter: '',
            users: []
        };

        this.loadUsersByFilter = this.loadUsersByFilter.bind(this);
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

    searchField = (e) => {
        console.log("Done")
        this.setState({
            target: e.target,
            showMore: true
        })
    }
    loadUsersByFilters = (e)=> {
        console.log(e.target.value);
        this.setState({
            searchFilter : e.target.value,
            target: e.target
        });
    }

    getImageFullPath = (dp) => {
        return "http://localhost:3001/"+dp
    }
    fetchUserInformation =  debounce(() => {
        
            console.log("yyyy")
            if (this.state.searchFilter === undefined || this.state.searchFilter.length < 3) { return; }
            axios
                .get(`${BASE_URL}filter-users/${this.state.searchFilter}`)
                .then(res => {
                    console.dir(this.state.target.name)
                    if (res.data.length < 1) { return; }
                    this.setState({
                        users: res.data,
                        showMore: true
                    });

                })
                .catch(err => console.error(err));
        }, 3000);
    
        setTarget = (e) => {
            
        }

    loadUsersByFilter = (e) => {
        this.setState({
            searchFilter : e.target.value,
            target : e.target
        });
        this.fetchUserInformation();
};


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
                                        name="searchFilter"
                                        onChange={this.loadUsersByFilter}
                                        value={this.state.searchFilter}
                                    />
                                    <ButtonToolbar ref={this.ref}>
                                        <Overlay
                                            show={this.state.showMore}
                                            target={this.state.target}
                                            placement="bottom"
                                            container={this.ref.current}
                                            containerPadding={30}
                                        >
                                            <Popover id="popover-contained">
                                                <Popover.Title as="h3">Users</Popover.Title>
                                                <Popover.Content className='user-list'>
        {this.state.users.map(user=><div><img src={this.getImageFullPath(user.display_picture)} height={20} width={20} alt="" />{user.first_name} {user.last_name}</div>)}
                                                    
                                            </Popover.Content>
                                            </Popover>
                                        </Overlay>
                                    </ButtonToolbar>

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