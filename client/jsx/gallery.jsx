
const React = require('react');
const Masonry = require('react-masonry-component');
const ImageComp = require('./image.jsx');

let masonryOptions = {
    transitionDuration: 0
};

class Gallery extends React.Component {

    constructor(props) {
        super(props);
    }

    likeImage(img) {

    }

    linkImage(img) {

    }

    render() {
        let images = this.props.elements;

        /*
        let childElements = this.props.elements.map(function(element) {
           return (
                <li className='image-element-class'>
                    <img src={element.src} />
                </li>
            );
        });*/

        let childElements = images.map( (img, index) => {
            let likeCb = this.likeImage.bind(this, img);
            let linkCb = this.linkImage.bind(this, img);
            let style = {width: '175px', marginRight: '10px'};
            return (
                <ImageComp
                    className='grid-item'
                    image={img} key={index}
                    likeImage={likeCb}
                    linkImage={linkCb}
                    style={style}
                />
            );
        });

        /*
        let childElements = this.props.elements.map( (item, index) => {
            return (
                <div key={index} style={item.style}>
                    <p>Elem {index}</p>
                </div>
            );
        });
        */

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
	elements: React.PropTypes.array
};

module.exports = Gallery;
