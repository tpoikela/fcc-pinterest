
'use strict';

const React = require('react');


class ImagesTop extends React.Component {

    componentDidMount() {
        this.props.getAllImages();
    }

    render() {
        return (
            <div>ImagesTop

            </div>
        );

    }

}

ImagesTop.propTypes = {
    getAllImages: React.PropTypes.func
};

module.exports = ImagesTop;
