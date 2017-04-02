'use strict';

const React = require('react');

/* Component used to render images to the screen.*/
class ImageComp extends React.Component {

    render() {
        var image = this.props.image;

        var numLinks = image.linkedBy.length;
        var numLikes = image.likedBy.length;
        return (
            <div className='img-component'>
                <img
                    className='img-responsive'
                    src={image.url}
                />
                <p>Title: {image.title}</p>
                <p>Likes: {numLikes}</p>
                <p>Linked by: {numLinks}</p>
            </div>
        );

    }

}

ImageComp.propTypes = {
    image: React.PropTypes.object
};

module.exports = ImageComp;
