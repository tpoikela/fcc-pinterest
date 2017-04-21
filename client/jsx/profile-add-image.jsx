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
                <form>
                    <div className='form-group'>
                    <label
                        className='label label-default'
                        htmlFor='input-url'
                        >URL</label>
                        <input
                            className='form-control'
                            id='input-url'
                            name='url'
                            onChange={this.onChangeUrl}
                            type='url'
                        />

                    </div>
                    <div className='form-group'>
                    <label
                        className='label label-default'
                        htmlFor='input-title'
                        >Title</label>
                        <input
                            className='form-control'
                            id='input-title'
                            name='title'
                            onChange={this.onChangeTitle}
                            type='text'
                        />
                    </div>
                    <button className='btn btn-default' onClick={this.addImage}>
                        Add
                    </button>
                </form>
            </div>

        );
    }

}

ProfileAddImage.propTypes = {
    addImage: React.PropTypes.func
};

module.exports = ProfileAddImage;
