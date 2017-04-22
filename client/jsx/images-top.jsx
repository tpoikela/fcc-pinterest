
'use strict';

const React = require('react');
const Gallery = require('./gallery');

/* Top-level component which shows all images. */
class ImagesTop extends React.Component {

    constructor(props) {
        super(props);

        this.likeImage = this.likeImage.bind(this);
        this.linkImage = this.linkImage.bind(this);
        this.unlikeImage = this.unlikeImage.bind(this);
        this.unlinkImage = this.unlinkImage.bind(this);

    }

    likeImage(image) {
        this.props.likeImage(image);
        this.props.getAllImages();
    }

    linkImage(image) {
        this.props.linkImage(image);
        this.props.getAllImages();
    }

    unlikeImage(image) {
        this.props.unlikeImage(image);
        this.props.getAllImages();
    }

    unlinkImage(image) {
        this.props.unlinkImage(image);
        this.props.getAllImages();
    }

    componentDidMount() {
        // TODO ensuer that getUserInfo executes first
        this.props.getUserInfo();
        this.props.getAllImages();
    }

    render() {
        let images = this.props.images;

        let likedImages = [];
        let linkedImages = [];

        if (this.props.userData) {
            linkedImages = this.props.userData.linkedTo;
            likedImages = this.props.userData.liked;
        }

        return (
            <div className='images-top'>
                <p className='text-primary'>
                    Here you can browse all images posted by
                    registered users. If you are logged in, you can
                    also like and link to the images.
                </p>
                <Gallery
                    elements={images}
                    likeImage={this.likeImage}
                    linkImage={this.linkImage}
                    unlikeImage={this.unlikeImage}
                    unlinkImage={this.unlinkImage}
                    userLikedImages={likedImages}
                    userLinkedImages={linkedImages}
                />

            </div>

        );

    }

}

ImagesTop.propTypes = {
    getAllImages: React.PropTypes.func,
    getUserInfo: React.PropTypes.func,
    images: React.PropTypes.array,
    likeImage: React.PropTypes.func,
    linkImage: React.PropTypes.func,
    unlikeImage: React.PropTypes.func,
    unlinkImage: React.PropTypes.func,
    userData: React.PropTypes.object
};

module.exports = ImagesTop;
