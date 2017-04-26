
'use strict';

const React = require('react');
const Gallery = require('./gallery');

/* This component is rendered when Search view is shown on the profile page.*/
class ProfileSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            q: ''
        };

        this.search = this.search.bind(this);
        this.onChangeQuery = this.onChangeQuery.bind(this);
        this.linkNewImage = this.linkNewImage.bind(this);
    }

    search() {
        let query = {offset: 0, keyword: this.state.q};
        this.props.searchImages(query);
    }

    onChangeQuery(e) {
        let val = e.target.value;
        this.setState({q: val});
    }

    /* Links new image to the user wall when user clicks link icon.*/
    linkNewImage(img) {
        let imgObj = {
            title: img.title,
            url: img.url
        };
        this.props.addImage(imgObj);
    }

    render() {
        let images = this.props.images;
        let emptyArr = [];

        let buttonOrSpinner = this.getButtonOrSpinner();
        let errorMsg = this.getErrorMessage();

        return (
            <div className='profile-view-search'>
                <p>You can search for images here. After the search, click the
                    link icon to add the image into your profile.
                </p>
                <form>

                    <div className='form-group'>
                        <label
                            className='label label-default'
                            htmlFor='input-title'
                            >Search
                        </label>
                        <input
                            className='form-control'
                            id='input-title'
                            name='q'
                            onChange={this.onChangeQuery}
                            title='Enter a search expression'
                            type='text'
                        />
                    </div>
                </form>

                {errorMsg}

                {buttonOrSpinner}

                <Gallery
                    elements={images}
                    likeImage={null}
                    linkImage={this.linkNewImage}
                    unlikeImage={null}
                    unlinkImage={null}
                    userLikedImages={emptyArr}
                    userLinkedImages={emptyArr}
                />

            </div>
        );
    }

    getErrorMessage() {
        if (this.props.err) {
            return (
                <p>{this.props.err}</p>
            );
        }
        return null;
    }

    /* Returns either search button or spinner if search is in progress.*/
    getButtonOrSpinner() {
        if (this.props.isFetching) {
            return (
                <div>
                    <i className='fa fa-spin fa-spinner fa-2x '/>
                </div>
            );
        }
        else {
            return (
                <button
                    className='btn btn-primary'
                    onClick={this.search}
                    >
                    Search
                </button>
            );
        }
    }

}

ProfileSearch.propTypes = {
    addImage: React.PropTypes.func,
    err: React.PropTypes.objectOf(Error),
    images: React.PropTypes.array,
    isFetching: React.PropTypes.bool,
    searchImages: React.PropTypes.func
};

module.exports = ProfileSearch;
