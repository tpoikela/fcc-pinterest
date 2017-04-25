'use strict';

import {TAB_ADD, TAB_SEARCH} from '../redux/reducers';

const React = require('react');

const ProfileAddImage = require('./profile-add-image');
const ProfileImages = require('./profile-images');
const ProfileSearch = require('./profile-search');

/* Top-level component on the profile page. Has tabbed views and component  body
 * is rendered based on tab selection.*/
class ProfileTop extends React.Component {

    constructor(props) {
        super(props);
        this.addImage = this.addImage.bind(this);
        this.addImageFromSearch = this.addImageFromSearch.bind(this);
        this.unlinkImage = this.unlinkImage.bind(this);
        this.unlikeImage = this.unlikeImage.bind(this);
    }

    componentDidMount() {
        this.props.getUserInfo();
    }

    /* Adds image for the user, and then links to it. Updates user info. */
    addImage(obj) {
        obj.userId = this.props.userData._id;
        Promise.all([this.props.addImage(obj)]).then( () => {
            this.props.getUserInfo();
        });
    }

    addImageFromSearch(obj) {
        obj.userId = this.props.userData._id;
        this.props.addImage(obj);
    }

    /* Dispatch unlink and then updates user info.*/
    unlinkImage(img) {
        Promise.all([this.props.unlinkImage(img)]).then( () => {
            this.props.getUserInfo();
        });
    }

    unlikeImage(img) {
        Promise.all([this.props.unlikeImage(img)]).then( () => {
            this.props.getUserInfo();
        });
    }

    render() {
        console.log('ProfileTop render()');
        let userData = this.props.userData;
        let username = '';

        if (userData) {
            username = userData.username;
        }

        let profileTabs = this.getRenderedTabs();
        let profileBody = this.getRenderedBody(userData);

        return (
            <div>
                <p>Welcome {username}!</p>
                {profileTabs}
                {profileBody}
            </div>
        );
    }

    /* Returns the tabs that are shown.*/
    getRenderedTabs() {
        let changeTab = this.props.changeTab;
        let shownTab = this.props.shownTab;

        let addClass = shownTab === TAB_ADD ? 'active' : '';
        let searchClass = shownTab === TAB_SEARCH ? 'active' : '';

        return (
          <ul className='nav nav-tabs'>
              <li className={addClass}
                  onClick={changeTab.bind(this, TAB_ADD)}
                  >
                  <a href='#'>Wall</a>
              </li>
              <li className={searchClass}
                  onClick={changeTab.bind(this, TAB_SEARCH)}
                  >
                  <a href='#'>Search</a>
              </li>
          </ul>
        );
    }

    /* Returns the rendered body for profile view based on the status.*/
    getRenderedBody(userData) {
        if (this.props.shownTab === TAB_ADD) {
            return this.getProfileViewAdd(userData);
        }
        else if (this.props.shownTab === TAB_SEARCH) {
            return this.getProfileViewSearch();
        }
        else {
            return <p>An error occurred with tabs!</p>;
        }
    }

    /* Returns the view which can be used to search for images.*/
    getProfileViewSearch() {
        let images = [];

        if (this.props.searchResults) {
            images = this.toImages(this.props.searchResults);
        }

        return (
            <ProfileSearch
                addImage={this.addImageFromSearch}
                images={images}
                searchImages={this.props.searchImages}
            />
        );
    }

    getProfileViewAdd(userData) {
        let images = [];
        let likedImages = [];

        if (userData) {
            images = userData.linkedTo;
            likedImages = userData.liked;
        }

        return (
        <div className='profile-view-add'>
            <p>
                You can add images to your profile by using the
                following fields:
            </p>

            <ProfileAddImage addImage={this.addImage} />

            <ProfileImages
                images={images}
                likedImages={likedImages}
                likeImage={this.props.likeImage}
                linkImage={this.props.linkImage}
                onClickRemove={this.props.onClickRemoveImage}
                unlikeImage={this.unlikeImage}
                unlinkImage={this.unlinkImage}
            />
        </div>
        );

    }

    /* Converts image search results to an array of Gallery-compatible
     * objects. */
    toImages(results) {
        console.log('toImages results: ' + JSON.stringify(results));
        let images = results.map( item => {
            return {
                url: item.url,
                title: item.title,
                linkedBy: [],
                likedBy: []
            };
        });
        return images;
    }

}

ProfileTop.propTypes = {
    addImage: React.PropTypes.func,
    changeTab: React.PropTypes.func,
    getUserInfo: React.PropTypes.func,
    likeImage: React.PropTypes.func,
    linkImage: React.PropTypes.func,
    onClickButton: React.PropTypes.func,
    onClickRemoveImage: React.PropTypes.func,
    unlikeImage: React.PropTypes.func,
    unlinkImage: React.PropTypes.func,
    searchImages: React.PropTypes.func,
    searchResults: React.PropTypes.array,
    shownTab: React.PropTypes.string,
    userData: React.PropTypes.object
};

module.exports = ProfileTop;
