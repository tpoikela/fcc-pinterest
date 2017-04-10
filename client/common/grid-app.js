

const React = require('react');
const ReactDOM = require('react-dom');

const Masonry = require('masonry-layout');

/*
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
    }

    onClickAdd() {
        let hPix = this.height + 'px';
        let style = 'height: ' + hPix;
        this.height += 10;

        let divElem = document.createElement('div');
        divElem.setAttribute('style', style);
        this.grid.appendChild(divElem);
    }

    componentDidMount() {

    }

    render() {

        let gridElem = <div className='image-grid' />;
        this.grid = new Masonry( gridElem, {
            itemSelector: '.grid-item',
            columnWidth: 250
        });

        return (
            <div>
                {gridElem}
                <button onClick={this.onClickAdd}>Add</button>
            </div>
        );
    }

}

let gridComp = document.querySelector('#grid');

ReactDOM.render(
    <ImageGrid />,
    gridComp
);


