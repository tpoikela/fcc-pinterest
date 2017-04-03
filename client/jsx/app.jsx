
'use strict';

import {profileReducer} from '../redux/reducers.js';
import {getUserInfo, getAllImages, actionClicked,
    likeImage, linkImage, addImage} from '../redux/actions';

import ThunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';

const React = require('react');
const ReactDOM = require('react-dom');

const ReactRedux = require('react-redux');

const ProfileTop = require('./profile-top');
const ImagesTop = require('./images-top');

const Provider = ReactRedux.Provider;

let imgTopElem = document.querySelector('#images-top');
let profTopElem = document.querySelector('#profile-app');

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
    getUserInfo: () => dispatch(getUserInfo()),
    addImage: (obj) => dispatch(addImage(obj)),
    getAllImages: () => dispatch(getAllImages()),
    linkImage: (img) => dispatch(linkImage(img)),
    likeImage: (img) => dispatch(likeImage(img))
});

let mapStateToProps = (state) => {
    console.log('mapStateToProps with ' + JSON.stringify(state));
    return {
        userData: state.profileReducer.userData,
        images: state.profileReducer.images
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
else if (imgTopElem) {

    let ImagesTopConnected = ReactRedux.connect(
        mapStateToProps, mapDispatchToProps
    )(ImagesTop);

        ReactDOM.render(
            <Provider store={store}>
                <ImagesTopConnected />
            </Provider>
            ,
            imgTopElem);
}

