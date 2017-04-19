'use strict';

const React = require('react');

/* Component used to render images to the screen.*/
class ImageComp extends React.Component {

    render() {
        let style = this.props.style;
        let image = this.props.image;
        let className = this.props.className;

        let numLinks = image.linkedBy.length;
        let numLikes = image.likedBy.length;

        let linkButton = (
            <button onClick={this.props.likeImage}>Link</button>
        );
        if (this.props.userHasLinked) {
            linkButton = (
                <button onClick={this.props.unlinkImage}>Unlink</button>
            );
        }

        let likeButton = (
            <button onClick={this.props.likeImage}>Like</button>
        );
        if (this.props.userHasLiked) {
            likeButton = (
                <button onClick={this.props.unlikeImage}>Unlike</button>
            );
        }

        let isBroken = image.broken;
        let imageSrc = image.url;
        if (isBroken) {
            imageSrc = '/public/broken.png';
        }

        return (
            <div className={className} style={style}>
                <img className='grid-image'
                    src={imageSrc}
                />
                <p className='text-center'>{image.title}</p>

                {linkButton}
                <span className='badge'>{numLinks}</span>

                {likeButton}
                <span className='badge'>{numLikes}</span>

            </div>
        );

    }

}

ImageComp.propTypes = {
    className: React.PropTypes.string,
    image: React.PropTypes.object,
    linkImage: React.PropTypes.func,
    likeImage: React.PropTypes.func,
    style: React.PropTypes.object,
    unlikeImage: React.PropTypes.func,
    unlinkImage: React.PropTypes.func,
    userHasLiked: React.PropTypes.bool,
    userHasLinked: React.PropTypes.bool
};

module.exports = ImageComp;
