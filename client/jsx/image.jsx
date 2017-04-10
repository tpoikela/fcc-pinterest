'use strict';

const React = require('react');

/* Component used to render images to the screen.*/
class ImageComp extends React.Component {

    render() {
        let image = this.props.image;
        let className = this.props.className;

        let numLinks = image.linkedBy.length;
        let numLikes = image.likedBy.length;
        return (
            <div className={className}>
                <img
                    className='img-responsive'
                    src={image.url}
                />
                <p>Title: {image.title}</p>
                <p>Likes: {numLikes}</p>
                <p>Linked by: {numLinks}</p>
                <button onClick={this.props.linkImage}>Link</button>
                <button onClick={this.props.likeImage}>Like</button>
            </div>
        );

    }

}

ImageComp.propTypes = {
    className: React.PropTypes.string,
    image: React.PropTypes.object,
    linkImage: React.PropTypes.func,
    likeImage: React.PropTypes.func
};

module.exports = ImageComp;
