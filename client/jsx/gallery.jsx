
const React = require('react');
const Masonry = require('react-masonry-component');
const ImageComp = require('./image.jsx');

let masonryOptions = {
    transitionDuration: 0
};

/* Gallery component which handles image grid rendering.*/
class Gallery extends React.Component {

    constructor(props) {
        super(props);
    }

    likeImage(img) {
        this.props.likeImage(img);
    }

    linkImage(img) {
        this.props.linkImage(img);
    }

    unlinkImage(img) {
        this.props.unlinkImage(img);
    }

    unlikeImage(img) {
        this.props.unlinkImage(img);
    }

    render() {
        let images = this.props.elements;
        let userLinkedImages = this.props.userLinkedImages;
        let userLikedImages = this.props.userLikedImages;

        let childElements = images.map( (img, index) => {

            let likeCb = this.likeImage.bind(this, img);
            let linkCb = this.linkImage.bind(this, img);
            let unlikeCb = this.unlikeImage.bind(this, img);
            let unlinkCb = this.unlinkImage.bind(this, img);

            let imageLinkedIndex = userLinkedImages.findIndex(elem => {
                return elem._id === img._id;
            });
            let userHasLinked = imageLinkedIndex >= 0;

            let imageLikedIndex = userLikedImages.findIndex(elem => {
                return elem._id === img._id;
            });
            let userHasLiked = imageLikedIndex >= 0;

            return (
                <ImageComp
                    className='grid-item'
                    image={img} key={index}
                    likeImage={likeCb}
                    linkImage={linkCb}
                    unlikeImage={unlikeCb}
                    unlinkImage={unlinkCb}
                    userHasLiked={userHasLiked}
                    userHasLinked={userHasLinked}
                />
            );
        });

        return (
            <Masonry
                className={'my-gallery-class'}
                disableImagesLoaded={false}
                elementType={'ul'}
                options={masonryOptions}
                updateOnEachImageLoad={false}
                >
                {childElements}
            </Masonry>
        );
    }
}

Gallery.propTypes = {
	elements: React.PropTypes.array,
    likeImage: React.PropTypes.func,
    linkImage: React.PropTypes.func,
    unlikeImage: React.PropTypes.func,
    unlinkImage: React.PropTypes.func,
	userLikedImages: React.PropTypes.array,
	userLinkedImages: React.PropTypes.array
};

module.exports = Gallery;
