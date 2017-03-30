'use strict';

const React = require('react');


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
        var val = e.target.value;
        this.setState({title: val});

    }

    onChangeUrl(e) {
        var val = e.target.value;
        this.setState({url: val});
    }

    render() {
        return (
            <div>
                <label>Title:
                    <input name='title' onChange={this.onChangeTitle} />
                </label>
                <label>URL:
                    <input name='url' onChange={this.onChangeUrl} />
                </label>
                <button onClick={this.addImage} />
            </div>

        );
    }

}

ProfileAddImage.propTypes = {
    addImage: React.PropTypes.func
};

module.exports = ProfileAddImage;
