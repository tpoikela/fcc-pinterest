
const ajax = require('../common/ajax-functions');

var appUrl = window.location.origin;

//---------------
// Actions
//---------------

//----------------------------------------------
// THUNK ACTIONS
//----------------------------------------------

// Thunk action to retrieve user info
var getUserInfo = () => {
    return function(dispatch) {

        dispatch(fetchUser());

        var url = appUrl + '/users/amiauth';
        ajax.get(url, (err, respText) => {
            if (err) {
                dispatch(actionError(err));
            }
            else {
                var json = JSON.parse(respText);
                dispatch(receiveUser(json));
            }
        });
    };
};

// Thunk action to send POST to server with image data
var addImage = (obj) => {
    return function(dispatch) {
        dispatch(fetchImage());
        var url = appUrl + '/images';
        ajax.post(url, obj, (err, respText) => {
            if (err) {
                dispatch(actionError(err));
            }
            else {
                var json = JSON.parse(respText);
                dispatch(receiveImage(json));
            }
        });

    };
};

// Thunk action to GET all images from the server
var getAllImages = () => {
    return function(dispatch) {
        dispatch(actionFetching('allImages'));
    };
};

//----------------------------------------------
// SIMPLE ACTIONS
//----------------------------------------------

let actionError = (err) => ({
    type: 'ERROR',
    err: err
});

let actionClicked = () => ({
    type: 'BUTTON_CLICKED'
});

let actionFetching = (fetchWhat) => {
    return {
        type: 'FETCHING',
        what: fetchWhat
    };
};

let fetchUser = () => ({
    type: 'FETCH_USER'
});

let receiveUser = (json) => {
    return {
        type: 'RECEIVE_USER',
        json
    };
};

let fetchImage = () => ({
    type: 'FETCH_IMAGE'
});

let receiveImage = (json) => {
    return {
        type: 'RECEIVE_IMAGE',
        json
    };
};

export {addImage, getAllImages, getUserInfo, actionClicked,
        fetchUser, receiveUser};
