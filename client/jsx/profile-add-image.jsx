'use strict';

const React = require('react');

/* Component for adding images to user's profile.*/
class ProfileAddImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: ''
        };

        this.addImage = this.addImage.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
    }

    addImage() {
        this.props.addImage({
            title: this.state.title,
            url: this.state.url
        });
    }

    onChangeTitle(e) {
        let val = e.target.value;
        this.setState({title: val});

    }

    onChangeUrl(e) {
        let val = e.target.value;
        this.setState({url: val});
    }

    render() {
        return (
            <div className='add-image-div'>
                <label htmlFor='input-url'>URL:
                    <input
                        id='input-url'
                        name='url'
                        onChange={this.onChangeUrl}
                    />
                </label>
                <label htmlFor='input-title' >Title:
                    <input
                        id='input-title'
                        name='title'
                        onChange={this.onChangeTitle}
                    />
                </label>
                <button onClick={this.addImage}>Add</button>
            </div>

        );
    }

}

ProfileAddImage.propTypes = {
    addImage: React.PropTypes.func
};

module.exports = ProfileAddImage;
