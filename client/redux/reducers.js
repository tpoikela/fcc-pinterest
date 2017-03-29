'use strict';

var receiveUser = function(currState, action) {
    console.log('receiveUser with curr ' + JSON.stringify(currState));
    var newState = Object.assign(currState, {userData: action.json});
    console.log('receiveUser with new ' + JSON.stringify(newState));
    return newState;
};

export function profileReducer(state, action) {
    console.log('reducer state ' + JSON.stringify(state));

    if (typeof state === 'undefined') {
        return {clicked: false, username: ''};
    }

    let currState = Object.assign({}, state);

    switch (action.type) {
        case 'BUTTON_CLICKED': return Object.assign(
                currState, {clicked: true});
        //case 'RECEIVE_USER': return receiveUser(currState, action);
        case 'RECEIVE_USER': return Object.assign(currState,
            {userData: action.json});
        default: return currState;
    }
}
