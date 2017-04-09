'use strict';

const React = require('react');

const ProfileAddImage = require('./profile-add-image');
const ProfileImages = require('./profile-images');

class ProfileTop extends React.Component {

    constructor(props) {
        super(props);
        this.addImage = this.addImage.bind(this);
    }

    componentDidMount() {
        this.props.getUserInfo();
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiverProps');
    }

    addImage(obj) {
        obj.userId = this.props.userData._id;
        Promise.all([this.props.addImage(obj)]).then( () => {
            this.props.getUserInfo();
        });
    }

    render() {
        console.log('ProfileTop render()');
        let userData = this.props.userData;
        let username = '';
        let userID = '';
        let images = [];

        if (userData) {
            username = userData.username;
            userID = userData.userID;
            images = userData.linkedTo;
        }

        return (
            <div>
                <p>ProfileTop was rendered: |{username}|</p>
                <p>userID: |{userID}|</p>
                <button onClick={this.props.onClickButton}>Push</button>
                <ProfileAddImage addImage={this.addImage} />

                <ProfileImages
                    images={images}
                    onClickRemove={this.props.onClickRemoveImage}
                />

            </div>
        );
    }

}

ProfileTop.propTypes = {
    addImage: React.PropTypes.func,
    getUserInfo: React.PropTypes.func,
    onClickButton: React.PropTypes.func,
    onClickRemoveImage: React.PropTypes.func,
    userData: React.PropTypes.object
};

module.exports = ProfileTop;
