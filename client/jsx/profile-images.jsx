'use strict';

const React = require('react');
const ImageComp = require('./image');

class ProfileImages extends React.Component {

    render() {

        var images = this.props.images;

        var imageElems = images.map( (image, index) => {
            return (
                <li key={index}>
                    <ImageComp image={image}/>
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
    images: React.PropTypes.array
};

module.exports = ProfileImages;
