
'use strict';

const ProfileTop = require('./profile-top');

var profileTop = document.querySelector('#profile-app');
var booksTop = null;

const React = require('react');
const ReactDOM = require('react-dom');

if (profileTop) {
    ReactDOM.render(<ProfileTop />, profileTop);
}
else if (booksTop) {
    // ReactDOM.render(<BooksTop />, booksTop);
    console.log('not supported yet.');
}

