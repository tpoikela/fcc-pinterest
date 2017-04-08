'use strict';

const React = require('react');
const ImageComp = require('./image');

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

        var images = this.props.images;

        var imageElems = images.map( (image, index) => {
            var onClickRemove = this.onClickRemove.bind(this, image);
            return (
                <li key={index}>
                    <ImageComp image={image}/>
                    <button onClick={onClickRemove}>Remove</button>
                </li>
            );
        });

        return (
            <div>
                <ul>
                    {imageElems}
                </ul>
            </div>

        );

    }

}

ProfileImages.propTypes = {
    images: React.PropTypes.array,
    onClickRemove: React.PropTypes.func

};

module.exports = ProfileImages;
