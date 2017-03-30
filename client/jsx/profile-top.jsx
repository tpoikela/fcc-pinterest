'use strict';

const React = require('react');

const ProfileAddImage = require('./profile-add-image');

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
        var addImage = this.props.addImage;
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
                <ProfileAddImage addImage={addImage} />
            </div>
        );
    }

}

ProfileTop.propTypes = {
    addImage: React.PropTypes.func,
    getUserInfo: React.PropTypes.func,
    onClickButton: React.PropTypes.func,
    userData: React.PropTypes.object

};

module.exports = ProfileTop;
