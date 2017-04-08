'use strict';

var $DEBUG = 1;

var xhrReadyOk = (xhr) => {
    return xhr.readyState === 4 && xhr.status === 200;
};

var xhrReadyError = (xhr) => {
    return xhr.readyState === 4 && xhr.status === 500;
};

/* Sends the data. It can be either in string or object format.*/
var sendData = (type, xhr, data) => {
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

var xhrReadyCallback = (xhr, cb) => {
    if (xhrReadyOk(xhr)) {
        if ($DEBUG) {console.log('Resp text:' + xhr.responseText);}
        cb(null, xhr.responseText);
    }
    else if (xhrReadyError(xhr)) {
        cb(500, xhr.responseText);
    }
};


var AjaxFuncs = {

    get: (url, cb) => {
        if ($DEBUG) {console.log('ajax-get to URL: ' + url);}
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = xhrReadyCallback.bind(this, xhr, cb);

        xhr.open('get', url, true);
        xhr.send();

    },

    /* Send ajax-POST with JSON data.*/
    post: (url, data, cb) => {
        if ($DEBUG) {console.log('ajax-post to URL: ' + url);}
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = xhrReadyCallback.bind(this, xhr, cb);

        xhr.open('post', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        sendData('post', xhr, data);

    },

    /* Send ajax-PUT with JSON data.*/
    put: (url, data, cb) => {
        if ($DEBUG) {console.log('ajax-put to URL: ' + url);}
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = xhrReadyCallback.bind(this, xhr, cb);

        xhr.open('put', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        sendData('put', xhr, data);

    },

    /* Send ajax-DELETE with JSON data. */
    delete: (url, data, cb) => {
        if ($DEBUG) {console.log('ajax-delete to URL: ' + url);}
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = xhrReadyCallback.bind(this, xhr, cb);

        xhr.open('delete', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        sendData('delete', xhr, data);

    }

};

module.exports = AjaxFuncs;
