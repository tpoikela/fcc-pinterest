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
            <span
                className='link-btn glyphicon glyphicon-link'
                onClick={this.props.linkImage}
            />
        );
        if (this.props.userHasLinked) {
            linkButton = (
                <span
                    className='link-btn text-danger glyphicon glyphicon-remove'
                    onClick={this.props.unlinkImage}
                />
            );
        }

        let likeButton = (
            <span
                className='like-btn glyphicon glyphicon-star-empty'
                onClick={this.props.likeImage}
            />
        );
        if (this.props.userHasLiked) {
            likeButton = (
                <span
                    className='like-btn glyphicon glyphicon-star'
                    onClick={this.props.unlikeImage}
                />
            );
        }

        let isBroken = image.broken;
        let imageSrc = image.url;
        if (isBroken) {
            imageSrc = '/public/broken.png';
        }

        return (
            <div className={className} style={style}>
                <img className='grid-image text-center'
                    src={imageSrc}
                />
                <p className='text-center'>{image.title}</p>

                {linkButton}
                <span className='badge'>{numLinks}</span>

                <span className='pull-right'>
                    {likeButton}
                    <span className='badge'>{numLikes}</span>
                </span>

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
