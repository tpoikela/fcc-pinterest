
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

export {addImage, getUserInfo, actionClicked, fetchUser, receiveUser};
