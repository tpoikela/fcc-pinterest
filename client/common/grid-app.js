
const React = require('react');
const ReactDOM = require('react-dom');

const Gallery = require('../jsx/gallery.jsx');

/*
const Masonry = require('masonry-layout');

document.onready = () => {

    let gridElem = document.querySelector('.image-grid');

    for (let i = 0; i < 20; i++) {
        let divHeight = 50 + i * 10;
        let divElem = document.createElement('div');

        let elemStyle = 'height: ' + divHeight + 'px;';
        elemStyle += 'background-color: red;';
        elemStyle += 'width: 175px;';
        elemStyle += 'margin-top: 10px;';

        if (i % 2 === 0) {elemStyle += 'background-color: red;';}
        else if (i % 2 === 1) {elemStyle += 'background-color: blue;';}

        divElem.setAttribute('style', elemStyle);

        divElem.setAttribute('class', 'grid-item');

        gridElem.appendChild(divElem);
    }

    const msnry = new Masonry( gridElem, {
        itemSelector: '.grid-item',
        columnWidth: 250
    });

};
*/

class ImageGrid extends React.Component {

    constructor(props) {
        super(props);

        this.height = 50;

        this.onClickAdd = this.onClickAdd.bind(this);

        this.state = {
            hasMore: true,
            nElems: 0,
            elems: []
        };
    }

    onClickAdd() {
        let hPix = this.height + 'px';
        let style = {height: hPix};
        style.width = '175px';
        style.backgroundColor = 'red';
        style.marginTop = '10px';
        style.marginRight = '10px';
        this.height += 10;

        let divElem = document.createElement('div');
        divElem.setAttribute('style', style);

        let elemsArray = this.state.elems.slice();
        elemsArray.push({style: style, height: hPix});

        let nElems = this.state.nElems;
        let hasMore = true;
        ++nElems;
        if (nElems >= 100) {
            hasMore = false;
        }
        this.setState({elems: elemsArray, hasMore: hasMore, nElems: nElems});
    }

    loadMore() {
        console.log('image-grid loadMore');
        this.onClickAdd();
    }

    componentDidMount() {

    }

    render() {

        return (
            <div>
                <div>
                    <button onClick={this.onClickAdd}>Add</button>
                </div>

                <Gallery elements={this.state.elems} />

            </div>
        );
    }

}

let gridComp = document.querySelector('#grid');

ReactDOM.render(
    <ImageGrid />,
    gridComp
);

