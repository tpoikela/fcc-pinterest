
'use strict';

const React = require('react');
const ImageComp = require('./image');

// const Masonry = require('masonry-layout');
//const Masonry = require('react-masonry-component');
// const MasonryLayout = require('react-masonry-layout');
//
import MasonryInfiniteScroller from 'react-masonry-infinite';

const masonryOptions = {
    columnWidth: '.grid-item'
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

    /* Loads more images from the server.*/
    loadMore() {

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
                <ImageComp
                    className='grid-item'
                    image={img} key={index}
                    likeImage={likeCb}
                    linkImage={linkCb}
                />
            );
        });

        return (
            <div>
                <h2>ImagesTop</h2>

                <MasonryInfiniteScroller
                    hasMore={false}
                    loadMore={this.loadMore}
                    sizes={[{columns: 3}]}
                    >
                    {imgElems}
                </MasonryInfiniteScroller>

            </div>


            /*
                <Masonry
                    className='masonry-grid'
                    elementType={'div'}
                    options={masonryOptions}
                    >
                    {imgElems}
                </Masonry>
                */
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
