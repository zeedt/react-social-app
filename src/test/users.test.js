import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'
import React from "react";
import Users from '../user/user';


configure({ adapter: new Adapter() });
const mockedState = {
  onlineUsers: [
    { username: 'zeed', name: 'Olamide olubayo' },
    { username: 'Bayo', name: 'Bayonle olubayo' }
  ],
  chats: { 'zeed': [] },
  currentUserChattingWith: '',
  open: false
}
describe('User component test', () => {

  it('should be able to load page successfully', () => {
    const wrapper = renderer.create(<Users />);
    const tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have available users in the card-header class', () => {
    const component = mount(<Users />);
    expect(component.find('.card-header').text()).toEqual('Available Users');
  });

  it('should ensure no user image is rendered when no user is currently online', () => {
    const component = mount(<Users />);
    expect(component.find('.user-chat-image').length).toEqual(0);
  });


  it('should list the users passed as state', () => {
    const component = mount(<Users />);
    component.setState({ ...mockedState });
    expect(component.find('.user-chat-image').length).toEqual(2);
  });

  it('ensure chatbox is not opened when user has not been clicked', () => {
    const component = mount(<Users />);
    component.setState({ ...mockedState });
    expect(component.state.open).not.toBeTruthy();
  });

  it('ensure chatbox is opened when a user has been clicked', () => {
    const component = mount(<Users />);
    component.setState({ ...mockedState });
    component.find('.user-chat-image').at(0).simulate('click')
    expect(component.state().open).toBeTruthy();
  });

  it('ensure the username on the chatbox title is same as the user clicked', () => {
    const component = mount(<Users />);
    component.setState({ ...mockedState });
    component.find('.user-chat-image').at(0).simulate('click')
    expect(component.find('.title').text()).toEqual(component.state().currentUserChattingWith);
  });

});
