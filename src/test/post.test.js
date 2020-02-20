import React from 'react';
import { configure, mount } from 'enzyme';
import PostPage from '../post-page/post-page';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import * as ReactRedux from 'react-redux';
import PostItem from '../post-page/post-item'

configure({ adapter: new Adapter() });

const middlewares = [];
const mockStore = configureStore(middlewares)

const initialState = {
    posts: []
}
const store = mockStore(initialState)

describe('Post component test', () => {

    it('should be able to load post component successfully', () => {
        const component = renderer.create(<ReactRedux.Provider store={store}><PostPage /></ReactRedux.Provider>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should have just one submit button for adding post', () => {
        const component = mount(<ReactRedux.Provider store={store}><PostPage /></ReactRedux.Provider>);
        expect(component.find('button').length).toEqual(1);
    });

    it('should not have any post since post in store is empty', () => {
        const component = mount(<ReactRedux.Provider store={store}><PostPage /></ReactRedux.Provider>);
        expect(component.find(PostItem).length).toEqual(0);
    });

    describe('Should test components with store that has posts', () => {
        const localInitialState = {
            posts: [
                {
                    "id" : 1,
                    "content": "This is my first post",
                    "userId": 1,
                    "user": {
                        "username": "zeed",
                        "first_name": "Saheed",
                        "last_name": "Yusuf"
                    }
                },
                {
                    "id" : 2,
                    "content": "This is my first post",
                    "userId": 1,
                    "user": {
                        "username": "zeed",
                        "first_name": "Saheed",
                        "last_name": "Yusuf"
                    }
                }
            ]
        }
        const localStore = mockStore(localInitialState)

        it('should have PostItem component rendered twice', () => {
            const component = mount(<ReactRedux.Provider store={localStore}><PostPage /></ReactRedux.Provider>);
            expect(component.find(PostItem).length).toEqual(2);
        });

    });





});
