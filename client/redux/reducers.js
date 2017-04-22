'use strict';

let receiveImage = (nextState, action) => {
    nextState.resp = action.json;
    return nextState;
};

/* This function handles ajax-started actions. */
let handleAjaxStart = (nextState, action) => {
    nextState.isFetching = true;
    nextState.fetchingWhat = action.what;
    return nextState;
};

/* This function handles all finished ajax calls.*/
let handleAjaxDone = (nextState, action) => {
    nextState.isFetching = false;
    nextState.fetchingWhat = '';
    switch (action.what) {
        case 'allImages': return {nextState, images: action.json};
        case 'getUserInfo': return {nextState, userData: action.json};
        case 'getUserList': return {nextState, userList: action.json};
        case 'getUserWall': {
            nextState.showWall = true;
            nextState.userWall = action.json;
            console.log('userwall is ' + JSON.stringify(nextState.userWall));
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

let getCommonState = () => {
    return {
        err: null,
        fetchingWhat: '',
        isFetching: false,
        userData: null,
        username: ''
    };
};

/* Reducer for ProfileTop component.*/
export function profileReducer(state, action) {
    if (typeof state === 'undefined') {
        let commonState = getCommonState();
        return {
            commonState,
            images: [],
            msg: ''
        };
    }

    // State copy done here
    let nextState = Object.assign({}, state);

    switch (action.type) {
        case 'AJAX_START': return handleAjaxStart(nextState, action);
        case 'ERROR': return handleError(nextState, action);
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


