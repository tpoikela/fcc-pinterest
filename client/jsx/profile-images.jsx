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
                <Gallery elements={images} />
            </div>

        );

    }

}

ProfileImages.propTypes = {
    images: React.PropTypes.array,
    onClickRemove: React.PropTypes.func

};

module.exports = ProfileImages;
