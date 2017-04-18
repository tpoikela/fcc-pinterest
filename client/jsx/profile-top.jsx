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
        let images = [];
        let likedImages = [];

        if (userData) {
            username = userData.username;
            images = userData.linkedTo;
            likedImages = userData.liked;
        }

        return (
            <div>
                <p>Welcome {username}!</p>

                <p>
                    You can add images to your profile by using the
                    following fields:
                </p>

                <ProfileAddImage addImage={this.addImage} />

                <ProfileImages
                    images={images}
                    likedImages={likedImages}
                    likeImage={this.props.likeImage}
                    linkImage={this.props.linkImage}
                    onClickRemove={this.props.onClickRemoveImage}
                    unlikeImage={this.props.unlikeImage}
                    unlinkImage={this.props.unlinkImage}
                />

            </div>
        );
    }

}

ProfileTop.propTypes = {
    addImage: React.PropTypes.func,
    getUserInfo: React.PropTypes.func,
    likeImage: React.PropTypes.func,
    linkImage: React.PropTypes.func,
    onClickButton: React.PropTypes.func,
    onClickRemoveImage: React.PropTypes.func,
    unlikeImage: React.PropTypes.func,
    unlinkImage: React.PropTypes.func,
    userData: React.PropTypes.object
};

module.exports = ProfileTop;
