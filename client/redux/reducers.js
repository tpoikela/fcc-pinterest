'use strict';

let receiveUser = (nextState, action) => {
    nextState.userData = action.json;
    return nextState;
};

let receiveImage = (nextState, action) => {
    nextState.resp = action.json;
    return nextState;
};

let handleAjaxStart = (nextState, action) => {
    nextState.isFetching = true;
    nextState.fetchingWhat = action.what;
    return nextState;
};

let handleAjaxDone = (nextState, action) => {
    nextState.isFetching = false;
    nextState.fetchingWhat = '';
    switch (action.what) {
        case 'allImages': return {nextState, images: action.json};
        case 'getUserList': return {nextState, userList: action.json};
        case 'getUserWall': {
            nextState.showWall = true;
            nextState.userWall = action.json;
            return nextState;
        }
        default: return nextState;
    }

};

let handleCloseUser = (nextState, action) => {
    let username = action.username;
    console.log('Closing wall for user ' + username);
    nextState.userWall = null;
    nextState.showWall = false;
    return nextState;
};

let handleError = (nextState, action) => {
    nextState.err = action.err;
    nextState.isFetching = false;
    nextState.fetchingWhat = '';
    return nextState;
};

/* Reducer for ProfileTop component.*/
export function profileReducer(state, action) {
    if (typeof state === 'undefined') {
        return {
            clicked: false,
            err: null,
            fetchingWhat: '',
            images: [],
            isFetching: false,
            msg: '',
            userData: null,
            username: ''
        };
    }

    // State copy done here
    let nextState = Object.assign({}, state);

    switch (action.type) {
        case 'AJAX_START': return handleAjaxStart(nextState, action);
        case 'BUTTON_CLICKED': return Object.assign(
                nextState, {clicked: true});
        case 'ERROR': return handleError(nextState, action);
        case 'FETCH_USER':
        case 'RECEIVE_USER': return receiveUser(nextState, action);
        case 'RECEIVE_IMAGE': return receiveImage(nextState, action);
        case 'AJAX_DONE': return handleAjaxDone(nextState, action);
        default: return nextState;
    }
}

/* Reducer for the WallsTop component.*/
export function wallsReducer(state, action) {
    if (typeof state === 'undefined') {
        return {
            isFetching: false,
            showWall: false,
            userList: [],
            userWall: null
        };
    }

    // State copy done here
    let nextState = Object.assign({}, state);

    switch (action.type) {
        case 'AJAX_START': return handleAjaxStart(nextState, action);
        case 'AJAX_DONE': return handleAjaxDone(nextState, action);
        case 'CLOSE_USER': return handleCloseUser(nextState, action);
        case 'SHOW_USER_LIST': {
            return Object.assign(nextState, {showWall: false});
        }
        default: return nextState;
    }
}


