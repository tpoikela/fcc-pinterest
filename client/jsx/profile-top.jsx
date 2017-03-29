'use strict';

const React = require('react');

class ProfileTop extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUserInfo();
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiverProps');
    }

    render() {
        console.log('ProfileTop render()');
        var userData = this.props.userData;
        var username = '';
        var userID = '';

        if (userData) {
            username = userData.username;
            userID = userData.userID;
        }

        return (
            <div>
                <p>ProfileTop was rendered: |{username}|</p>
                <p>userID: |{userID}|</p>
                <button onClick={this.props.onClickButton}>Push</button>
            </div>
        );
    }

}

ProfileTop.propTypes = {
    getUserInfo: React.PropTypes.func,
    onClickButton: React.PropTypes.func,
    userData: React.PropTypes.object

};

module.exports = ProfileTop;
