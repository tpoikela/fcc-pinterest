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

        return (
            <div>
                <Gallery
                    elements={images}
                    likeImage={this.props.likeImage}
                    linkImage={this.props.linkImage}
                />
            </div>

        );

    }

}

ProfileImages.propTypes = {
    images: React.PropTypes.array,
    likeImage: React.PropTypes.func,
    linkImage: React.PropTypes.func,
    onClickRemove: React.PropTypes.func

};

module.exports = ProfileImages;
