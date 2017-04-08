'use strict';


// const UNSENT = 0;
// const OPENED = 1;
// const HEADERS_RECEIVED = 2;
// const LOADING = 3;
const DONE = 4;

let $DEBUG = 1;

let xhrReadyOk = (xhr) => {
    return xhr.readyState === DONE && xhr.status === 200;
};

let xhrReadyError = (xhr) => {
    return xhr.readyState === DONE && xhr.status === 500;
};

/* Sends the data. It can be either in string or object format.*/
let sendData = (type, xhr, data) => {
    if (typeof data === 'string') {
        xhr.send(data);
    }
    else if (typeof data === 'object') {
        xhr.send(JSON.stringify(data));
    }
    else {
        console.error('ajax-' + type + ' Wrong data type: ' + typeof data);
    }
};

/* Callback for ajax-functions which check when the ajax-call is complete.*/
let xhrReadyCallback = (xhr, cb) => {
    if (xhrReadyOk(xhr)) {
        if ($DEBUG) {console.log('Resp text:' + xhr.responseText);}
        cb(null, xhr.responseText);
    }
    else if (xhrReadyError(xhr)) {
        cb(500, xhr.responseText);
    }
};


/* Contains basic ajax-functions for communicating with the server. */
let AjaxFuncs = {

    /* Send ajax-GET. */
    get: (url, cb) => {
        if ($DEBUG) {console.log('ajax-get to URL: ' + url);}
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = xhrReadyCallback.bind(this, xhr, cb);

        xhr.open('get', url, true);
        xhr.send();

    },

    /* Send ajax-POST with JSON data.*/
    post: (url, data, cb) => {
        if ($DEBUG) {console.log('ajax-post to URL: ' + url);}
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = xhrReadyCallback.bind(this, xhr, cb);

        xhr.open('post', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        sendData('post', xhr, data);

    },

    /* Send ajax-PUT with JSON data.*/
    put: (url, data, cb) => {
        if ($DEBUG) {console.log('ajax-put to URL: ' + url);}
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = xhrReadyCallback.bind(this, xhr, cb);

        xhr.open('put', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        sendData('put', xhr, data);

    },

    /* Send ajax-DELETE with JSON data. */
    delete: (url, data, cb) => {
        if ($DEBUG) {console.log('ajax-delete to URL: ' + url);}
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = xhrReadyCallback.bind(this, xhr, cb);

        xhr.open('delete', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        sendData('delete', xhr, data);

    }

};

module.exports = AjaxFuncs;
