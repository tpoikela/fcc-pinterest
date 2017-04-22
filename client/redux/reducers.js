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
        case 'getUserList': {
            nextState.userList = action.json;
            return nextState;
        }
        case 'getUserWall': {
            let username = action.json.username;

            console.log('handleAjaxDone state ' + JSON.stringify(nextState));
            nextState.showWall = true;
            nextState.userWall = action.json;
            nextState.shownUserName = username;
            console.log('handleAjaxDone state P2 ' + JSON.stringify(nextState));

            console.log('userTabsOpen: '
                + JSON.stringify(nextState.userTabsOpen));

            nextState.userTabsOpen.push(username);
            nextState.userTabsData.push(action.json);

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
    nextState.shownUserName = '';
    let index = nextState.userTabsOpen.indexOf(username);
    if (index >= 0) {
        nextState.userTabsOpen.splice(index, 1);
        nextState.userTabsData.splice(index, 1);
    }
    return nextState;
};

/* Called when a user clicks one of the opened user tabs. */
let handleShowUser = (nextState, action) => {
    let username = action.username;
    let index = nextState.userTabsOpen.indexOf(username);
    if (index >= 0) {
        nextState.userWall = nextState.userTabsData[index];
        nextState.showWall = true;
        nextState.shownUserName = username;
    }
    else {
        console.error('User |' + username + '| not in open tabs.');
    }
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
            userTabsOpen: [],
            userTabsData: [],
            shownUserName: '',
            userWall: null
        };
    }

    // State copy done here
    let act = action.type;
    console.log(act + ' wallsReducer state: ' + JSON.stringify(state));
    let nextState = Object.assign({}, state);
    console.log(act + ' wallsReducer nextState: ' + JSON.stringify(nextState));

    switch (action.type) {
        case 'AJAX_START': return handleAjaxStart(nextState, action);
        case 'AJAX_DONE': return handleAjaxDone(nextState, action);
        case 'CLOSE_USER': return handleCloseUser(nextState, action);
        case 'SHOW_USER_WALL': return handleShowUser(nextState, action);
        case 'SHOW_USER_LIST': {
            nextState.showWall = false;
            return nextState;
        }
        default: return nextState;
    }
}


