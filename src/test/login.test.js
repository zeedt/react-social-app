import { mount, configure } from 'enzyme';
import Login from '../login/login'
import renderer from 'react-test-renderer'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const LoginWrappedComponent = withRouter(Login)
describe('Login page Test', () => {
    it('should be able to render login page successfully', () => {
        const component = renderer.create(<Router><LoginWrappedComponent /></Router>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot()
    });

    it('should have login button', () => {
        const wrapper = mount(<Router><LoginWrappedComponent /></Router>);
        expect(wrapper.find(Button).length).toEqual(1);
    });

    it('should have text that ask user if they do not already have an account ', () => {
        const wrapper = mount(<Router><LoginWrappedComponent /></Router>);
        expect(wrapper.find('.userHelpDiv').text()).toEqual(expect.stringContaining('Don\'t have an account?'));
    });

});
