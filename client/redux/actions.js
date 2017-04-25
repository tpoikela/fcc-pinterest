
const ajax = require('../common/ajax-functions');

let appUrl = window.location.origin;

//---------------
// Actions
//---------------

let _actionDebug = (info, json) => {
    console.log('[ActionDebug]: ' + info);
    if (json) {
        console.log('[ActionDebug] ' + info + ' json: '
            + JSON.stringify(json));
    }
};

//----------------------------------------------
// THUNK ACTIONS
//----------------------------------------------

// Thunk action to retrieve a list of users
export let getUserList = () => {
    return function(dispatch) {

        dispatch(actionAjaxStart('getUserList'));
        let url = appUrl + '/users/list';

        ajax.get(url, (err, respText) => {
            if (err) {
                dispatch(actionError(err));
            }
            else {
                let json = JSON.parse(respText);
                dispatch(actionAjaxDone('getUserList', json));
            }
        });
    };
};

export let getUserWall = (username) => {
    return function(dispatch) {
        dispatch(actionAjaxStart('getUserWall'));
        let url = appUrl + '/users/wall/' + username;
        ajax.get(url, (err, respText) => {
            if (err) {
                dispatch(actionError(err));
            }
            else {
                let json = JSON.parse(respText);
                dispatch(actionAjaxDone('getUserWall', json));
            }
        });
    };
};

// Thunk action to retrieve user info
export let getUserInfo = () => {
    return function(dispatch) {
        dispatch(actionAjaxStart('getUserInfo'));
        let url = appUrl + '/users';
        ajax.get(url, (err, respText) => {
            if (err) {
                dispatch(actionError(err));
            }
            else {
                let json = JSON.parse(respText);
                dispatch(actionAjaxDone('getUserInfo', json));
            }
        });
    };
};

// Thunk action to send POST to server with image data
export let addImage = (obj) => {
    return function(dispatch) {
        dispatch(fetchImage());
        let url = appUrl + '/images';
        ajax.post(url, obj, (err, respText) => {
            if (err) {
                dispatch(actionError(err));
            }
            else {
                let json = JSON.parse(respText);
                dispatch(receiveImage(json));
            }
        });

    };
};

export let linkImage = (image) => {
    return function(dispatch) {
        dispatch(actionAjaxStart('linkImage'));
        let url = appUrl + '/images';
        let obj = {image: image, link: true};
        ajax.put(url, obj, (err, respText) => {
            if (err) {
                dispatch(actionError(err));
            }
            else {
                let json = JSON.parse(respText);
                dispatch(actionAjaxDone('linkImage', json));
            }
        });

    };
};

export let unlinkImage = (image) => {
    return function(dispatch) {
        dispatch(actionAjaxStart('unlinkImage'));
        let url = appUrl + '/images';
        let obj = {image: image, link: true};
        ajax.delete(url, obj, (err, respText) => {
            if (err) {
                dispatch(actionError(err));
            }
            else {
                let json = JSON.parse(respText);
                dispatch(actionAjaxDone('unlinkImage', json));
            }
        });

    };
};

export let likeImage = (image) => {
    return function(dispatch) {
        dispatch(actionAjaxStart('likeImage'));
        let url = appUrl + '/images';
        let obj = {image: image, like: true};
        ajax.put(url, obj, (err, respText) => {
            if (err) {
                dispatch(actionError(err));
            }
            else {
                let json = JSON.parse(respText);
                dispatch(actionAjaxDone('likeImage', json));
            }
        });

    };
};

export let unlikeImage = (image) => {
    return function(dispatch) {
        dispatch(actionAjaxStart('unlikeImage'));
        let url = appUrl + '/images';
        let obj = {image: image, like: true};
        ajax.delete(url, obj, (err, respText) => {
            if (err) {
                dispatch(actionError(err));
            }
            else {
                let json = JSON.parse(respText);
                dispatch(actionAjaxDone('unlikeImage', json));
            }
        });

    };
};

// Thunk action to GET all images from the server
export let getAllImages = () => {
    return function(dispatch) {
        dispatch(actionAjaxStart('allImages'));
        let url = appUrl + '/images';
        ajax.get(url, (err, respText) => {
            if (err) {
                dispatch(actionError(err));
            }
            else {
                let json = JSON.parse(respText);
                dispatch(actionAjaxDone('allImages', json));
            }
        });
    };
};

// Thunk action to remove an image from the user profile
export let removeImage = (img) => {
    return function(dispatch) {
        dispatch(actionAjaxStart('removeImage'));
        let url = appUrl + '/images';
        let obj = {image: img};
        ajax.delete(url, obj, (err, respText) => {
            if (err) {
                dispatch(actionError(err));
            }
            else {
                let json = JSON.parse(respText);
                dispatch(actionAjaxDone('removeImage', json));
            }
        });
    };
};

/* Used when a user sends an image search request.*/
export let searchImages = (query) => {
    return function(dispatch) {
        dispatch(actionAjaxStart('searchImages'));
        let url = appUrl + '/search';
        let obj = {query: query};
        ajax.post(url, obj, (err, respText) => {
            if (err) {
                dispatch(actionError(err));
            }
            else {
                let json = JSON.parse(respText);
                dispatch(actionAjaxDone('searchImages', json));
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

let actionAjaxStart = (fetchWhat) => {
    _actionDebug(fetchWhat);
    return {
        type: 'AJAX_START',
        what: fetchWhat
    };
};

let actionAjaxDone = (recWhat, json) => {
    _actionDebug(recWhat, json);
    return {
        type: 'AJAX_DONE',
        what: recWhat,
        json
    };
};

export let actionChangeTab = (newTab, oldTab) => ({
    type: 'CHANGE_TAB',
    newTab: newTab,
    oldTab: oldTab
});

let closeUserWall = (username) => ({
    type: 'CLOSE_USER',
    username: username
});

let showUserWall = (username) => ({
    type: 'SHOW_USER_WALL',
    username: username
});

let fetchImage = () => ({
    type: 'FETCH_IMAGE'
});

let receiveImage = (json) => {
    return {
        type: 'RECEIVE_IMAGE',
        json
    };
};

let showUserList = () => {
    return {
        type: 'SHOW_USER_LIST'
    };
};

export {closeUserWall, showUserList, showUserWall};
