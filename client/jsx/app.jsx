
'use strict';

import {profileReducer} from '../redux/reducers.js';
import {getUserInfo, actionClicked,
    fetchUser, receiveUser} from '../redux/actions';

import ThunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';

const React = require('react');
const ReactDOM = require('react-dom');

const ReactRedux = require('react-redux');

const ProfileTop = require('./profile-top');

const Provider = ReactRedux.Provider;

let profTopElem = document.querySelector('#profile-app');
var booksTop = null;

let store = createStore(
    combineReducers({
        profileReducer: profileReducer
    }),
    applyMiddleware(
        ThunkMiddleware // Lets us dispatch functions
    )
);

//---------------
// MAP FUNCTIONS
//---------------

let mapDispatchToProps = dispatch => ({
    onClickButton: () => dispatch(actionClicked()),
    getUserInfo: () => dispatch(getUserInfo())
});

let mapStateToProps = (state) => {
    console.log('mapStateToProps with ' + JSON.stringify(state));
    return {
        userData: state.profileReducer.userData
    };
};


if (profTopElem) {

    let ProfileTopConnected = ReactRedux.connect(
        mapStateToProps, mapDispatchToProps
    )(ProfileTop);

        ReactDOM.render(
            <Provider store={store}>
                <ProfileTopConnected />
            </Provider>
            ,
            profTopElem);
}
else if (booksTop) {
    // ReactDOM.render(<BooksTop />, booksTop);
    console.log('not supported yet.');
}

