
const ajax = require('../common/ajax-functions');

var appUrl = window.location.origin;

//---------------
// Actions
//---------------

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

export {getUserInfo, actionClicked, fetchUser, receiveUser};
