
'use strict';

import {profileReducer, wallsReducer} from '../redux/reducers.js';

import {getUserInfo, getAllImages,
    likeImage, linkImage, addImage, removeImage,
    unlikeImage, unlinkImage, getUserList, getUserWall,
    showUserList, closeUserWall, showUserWall
} from '../redux/actions';

import ThunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';

const React = require('react');
const ReactDOM = require('react-dom');

const ReactRedux = require('react-redux');

const ProfileTop = require('./profile-top');
const ImagesTop = require('./images-top');
const WallsTop = require('./walls-top');

const Provider = ReactRedux.Provider;

let imgTopElem = document.querySelector('#images-top');
let profTopElem = document.querySelector('#profile-app');
let wallsTopElem = document.querySelector('#walls-top');

// This monster is used only for debugging using Redux-dev-tools
const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		// Specify extension’s options like name, actionsBlacklist,
		// actionsCreators, serialize...
	}) : compose;

let mainStore = createStore(
    combineReducers({
        profileReducer: profileReducer
    }),
    applyMiddleware(
        ThunkMiddleware // Lets us dispatch functions
    )
);

let reducersCombined = combineReducers({
    wallsReducer: wallsReducer
});

let wallsEnhancer = composeEnhancers(
    applyMiddleware(
        ThunkMiddleware // Lets us dispatch functions
    )
);

let wallsStore = createStore(
    reducersCombined, wallsEnhancer
);

//---------------------------
// MAP FUNCTIONS
//---------------------------

//---------------
// ProfileReducer
//---------------

let mapDispatchToProps = dispatch => ({
    onClickRemoveImage: (img) => dispatch(removeImage(img)),
    getUserInfo: () => dispatch(getUserInfo()),
    addImage: (obj) => dispatch(addImage(obj)),
    getAllImages: () => dispatch(getAllImages()),
    linkImage: (img) => dispatch(linkImage(img)),
    likeImage: (img) => dispatch(likeImage(img)),
    unlinkImage: (img) => dispatch(unlinkImage(img)),
    unlikeImage: (img) => dispatch(unlikeImage(img))
});

let mapStateToProps = (state) => {
    return {
        userData: state.profileReducer.userData,
        images: state.profileReducer.images
    };
};

//-------------
// WallsReducer
//-------------

let wallsMapDispatchToProps = dispatch => ({
    closeUserWall: (username) => dispatch(closeUserWall(username)),
    getUserList: () => dispatch(getUserList()),
    getUserWall: (username) => dispatch(getUserWall(username)),
    showUserList: () => dispatch(showUserList()),
    showUserWall: (username) => dispatch(showUserWall(username))
});

let wallsMapStateToProps = (state) => {
    return {
        isFetching: state.wallsReducer.isFetching,
        showWall: state.wallsReducer.showWall,
        userList: state.wallsReducer.userList,
        userTabsOpen: state.wallsReducer.userTabsOpen,
        userTabsData: state.wallsReducer.userTabsData,
        userWall: state.wallsReducer.userWall,
        shownUserName: state.wallsReducer.shownUserName
    };
};

// Select which React component is rendered  based on which element was found
// with querySelector()

if (profTopElem) {

    let ProfileTopConnected = ReactRedux.connect(
        mapStateToProps, mapDispatchToProps
    )(ProfileTop);

    ReactDOM.render(
        <Provider store={mainStore}>
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
        <Provider store={mainStore}>
            <ImagesTopConnected />
        </Provider>
        ,
        imgTopElem);
}
else if (wallsTopElem) {

    let WallsTopConnected = ReactRedux.connect(
        wallsMapStateToProps, wallsMapDispatchToProps
    )(WallsTop);

    ReactDOM.render(
        <Provider store={wallsStore}>
            <WallsTopConnected />
        </Provider>
        ,
        wallsTopElem);
}

