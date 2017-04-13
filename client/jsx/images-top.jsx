
'use strict';

const React = require('react');
const ImageComp = require('./image');
const Gallery = require('./gallery');

/* Top-level component which shows all images. */
class ImagesTop extends React.Component {

    constructor(props) {
        super(props);

        this.likeImage = this.likeImage.bind(this);
        this.linkImage = this.linkImage.bind(this);

    }

    likeImage(image) {
        this.props.likeImage(image);
    }

    linkImage(image) {
        this.props.linkImage(image);
    }

    componentDidMount() {
        this.props.getAllImages();
    }

    render() {
        let images = this.props.images;


        return (
            <div>
                <h2>ImagesTop</h2>

                <Gallery elements={images} />

            </div>

        );

    }

}

ImagesTop.propTypes = {
    getAllImages: React.PropTypes.func,
    images: React.PropTypes.array,
    likeImage: React.PropTypes.func,
    linkImage: React.PropTypes.func
};

module.exports = ImagesTop;
