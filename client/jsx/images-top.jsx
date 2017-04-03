
'use strict';

const React = require('react');
const ImageComp = require('./image');


class ImagesTop extends React.Component {

    componentDidMount() {
        this.props.getAllImages();
    }

    render() {
        var images = this.props.images;

        var imgElems = images.map( (img, index) => {
            return (
                <li key={index}>
                    <ImageComp image={img}/>
                </li>
            );
        });

        return (
            <div className='image-grid'>
                <h2>ImagesTop</h2>
                <ul>
                {imgElems}
                </ul>
            </div>
        );

    }

}

ImagesTop.propTypes = {
    getAllImages: React.PropTypes.func,
    images: React.PropTypes.array
};

module.exports = ImagesTop;
