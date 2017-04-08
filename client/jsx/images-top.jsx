
'use strict';

const React = require('react');
const ImageComp = require('./image');

// const Masonry = require('masonry-layout');
const Masonry = require('react-masonry-component');

let masonryOptions = {
    columnWidth: 50
};

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

        // let gridElem = document.querySelector('#image-grid');
        /* if (gridElem) {
            console.log('Creating the Masonry fluid grid');
            this.masonryGrid = new Masonry(gridElem, {
                columnWidth: 50,
                itemSelector: '.grid-item'
            });
        }*/

        let imgElems = images.map( (img, index) => {
            let likeCb = this.likeImage.bind(this, img);
            let linkCb = this.linkImage.bind(this, img);
            return (
                <ImageComp image={img} key={index}
                    likeImage={likeCb}
                    linkImage={linkCb}
                />
            );
        });

        return (
            <div>
                <h2>ImagesTop</h2>
                <Masonry
                    elementType={'div'}
                    options={masonryOptions}
                    >
                    {imgElems}
                </Masonry>
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
