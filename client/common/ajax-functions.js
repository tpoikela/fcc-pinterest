'use strict';

var $DEBUG = 1;

var ajaxFuncs = {

    get: (url, cb) => {
        if ($DEBUG) {console.log('ajax-get to URL: ' + url);}
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                cb(null, xhr.responseText);
            }
            else if (xhr.readyState === 4 && xhr.status === 500) {
                cb(500, null);
            }
        };

        xhr.open('get', url, true);
        xhr.send();

    },

    post: (url, data, cb) => {
        if ($DEBUG) {console.log('ajax-post to URL: ' + url);}
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if ($DEBUG) {console.log('Resp text:' + xhr.responseText);}
                cb(null, xhr.responseText);
            }
            else if (xhr.readyState === 4 && xhr.status === 500) {
                cb(500, xhr.responseText);
            }
        };
        xhr.open('post', url, true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        if (typeof data === 'string') {
            xhr.send(data);
        }
        else if (typeof data === 'object') {
            xhr.send(JSON.stringify(data));
        }
        else {
            console.error('ajax-post Wrong data type: ' + typeof data);
        }

    },

    delete: (url, data, cb) => {
        if ($DEBUG) {console.log('ajax-delete to URL: ' + url);}
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if ($DEBUG) {console.log('Resp text:' + xhr.responseText);}
                cb(null, xhr.responseText);
            }
            else if (xhr.readyState === 4 && xhr.status === 500) {
                cb(500, xhr.responseText);
            }
        };

        xhr.open('delete', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        if (typeof data === 'string') {
            xhr.send(data);
        }
        else if (typeof data === 'object') {
            xhr.send(JSON.stringify(data));
        }
        else {
            console.error('ajax-delete Wrong data type: ' + typeof data);
        }

    }

};

module.exports = ajaxFuncs;
