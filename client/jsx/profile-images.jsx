'use strict';

const React = require('react');
const Gallery = require('./gallery');

/* Component which renders the images in profile view.*/
class ProfileImages extends React.Component {

    constructor(props) {
        super(props);
        this.onClickRemove = this.onClickRemove.bind(this);
    }

    onClickRemove(img) {
        this.props.onClickRemove(img);
    }

    render() {
        let images = this.props.images;
        let likedImages = this.props.likedImages;

        let msg = '';
        if (images.length === 0) {
            msg = <p>You haven't added any images.</p>;
        }

        return (
            <div>
                {msg}
                <Gallery
                    elements={images}
                    likeImage={this.props.likeImage}
                    linkImage={this.props.linkImage}
                    unlikeImage={this.props.unlikeImage}
                    unlinkImage={this.props.unlinkImage}
                    userLikedImages={likedImages}
                    userLinkedImages={images}
                />
            </div>
        );

    }

}

ProfileImages.propTypes = {
    images: React.PropTypes.array,
    likedImages: React.PropTypes.array,
    likeImage: React.PropTypes.func,
    linkImage: React.PropTypes.func,
    onClickRemove: React.PropTypes.func,
    unlikeImage: React.PropTypes.func,
    unlinkImage: React.PropTypes.func

};

module.exports = ProfileImages;
