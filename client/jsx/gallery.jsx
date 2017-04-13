

let React = require('react');
let Masonry = require('react-masonry-component');

let masonryOptions = {
    transitionDuration: 0
};

class Gallery extends React.Component {

    render() {

        /*
        let childElements = this.props.elements.map(function(element) {
           return (
                <li className='image-element-class'>
                    <img src={element.src} />
                </li>
            );
        });*/

        let childElements = this.props.elements.map( (item, index) => {
            return (
                <div key={index} style={item.style}>
                    <p>Elem {index}</p>
                </div>
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
	elements: React.PropTypes.array
};

module.exports = Gallery;
