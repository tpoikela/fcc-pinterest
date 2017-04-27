
'use strict';

const React = require('react');
const Gallery = require('./gallery');

class WallsTop extends React.Component {

    constructor(props) {
        super(props);
        this.showWall = this.showWall.bind(this);
        this.showUserList = this.showUserList.bind(this);
        this.showUserWall = this.showUserWall.bind(this);
        this.closeUserWall = this.closeUserWall.bind(this);

        this.$DEBUG = 0;
    }

    componentDidMount() {
        this.props.getUserList();
    }

    closeUserWall(e) {
        e.stopPropagation();
        let t = e.target;
        let username = t.getAttribute('id');
        this.props.closeUserWall(username);
    }

    /* For printing debug messages.*/
    debug(msg) {
        if (this.$DEBUG) {
            console.log(msg);
        }
    }

    showWall(username) {
        this.props.getUserWall(username);
    }

    showUserList() {
        this.props.showUserList();
    }

    showUserWall(e) {
        let aElem = e.target;
        this.debug('aElem.text ' + aElem.text);
        this.props.showUserWall(aElem.text);
    }

    render() {
        let wallsBody = this.getRenderedBody();
        let userTabs = this.getUserTabs();

        return (
            <div className='walls-top'>
                <h2>WallsTop</h2>
                {userTabs}
                {wallsBody}
            </div>
        );
    }

    /* Returns the body which is rendered based on passes props.*/
    getRenderedBody() {
        if (this.props.showWall) {
            return this.getRenderedUserWall();
        }
        else {
            return this.getRenderedUserList();
        }
    }

    getRenderedUserWall() {
        let wall = null;
        let userWall = this.props.userWall;
        let images = userWall.linkedTo;
        this.debug('WallsTop userwall is ' + JSON.stringify(userWall));
        let emptyArr = [];

        if (userWall) {
            let username = userWall.username;

            if (images.length > 0) {
                wall = (
                    <div className='user-wall'>
                        <p>User {username} has the following images:</p>
                        <Gallery
                            elements={images}
                            likeImage={this.dummyFunc}
                            linkImage={this.dummyFunc}
                            unlikeImage={this.dummyFunc}
                            unlinkImage={this.dummyFunc}
                            userLikedImages={emptyArr}
                            userLinkedImages={emptyArr}
                        />
                    </div>
                );
            }
            else {
                wall = (
                    <div className='user-wall'>
                        User {username} has no linked images.
                    </div>
                );

            }
        }
        return wall;
    }

    getRenderedUserList() {
        let users = this.props.userList;

        let userList = null;
        if (users) {
            userList = users.map( (item, index) => {
                let username = item.username;
                let onClickCb = this.showWall.bind(this, username);
                return (
                    <a
                        className='list-group-item'
                        href='#'
                        key={index}
                        onClick={onClickCb}
                        >
                        User: {username}
                    </a>
                );
            });
        }
        return <div className='list-group'>{userList}</div>;
    }

    /* Returns the tabs to navigate between user walls. */
    getUserTabs() {
        this.debug('WallsTop render() => getUserTabs()');
        let userTabsOpen = this.props.userTabsOpen;
        let userWall = this.props.userWall;
        let userTabsElem = null;

        if (userTabsOpen && userTabsOpen.length > 0) {

            userTabsElem = userTabsOpen.map( (username, index) => {

                let shownUser = null;
                if (userWall) {shownUser = userWall.username;}
                let wallClass = shownUser === username ? 'active' : '';

                return (
                    <li className={wallClass} key={index}>
                        <a href='#'
                            onClick={this.showUserWall}
                            >
                        {username}
                            <span
                                className='glyphicon glyphicon-remove'
                                id={username}
                                onClick={this.closeUserWall}
                            />
                        </a>
                    </li>
                );
            });

        }
        else {
            this.debug('WallsTop no user tabs open');
        }

        let isWallShown = this.props.showWall;
        let usersClass = isWallShown ? '' : 'active';

        return (
          <ul className='nav nav-tabs'>
              <li className={usersClass}
                  onClick={this.showUserList}
                  >
                  <a href='#'>Users</a>
              </li>
              {userTabsElem}
          </ul>
        );
    }

    dummyFunc() {
        this.debug('Called dummyFunc');
    }
}

WallsTop.propTypes = {
    closeUserWall: React.PropTypes.func,
    getUserList: React.PropTypes.func,
    getUserWall: React.PropTypes.func,
    showWall: React.PropTypes.bool,
    showUserList: React.PropTypes.func,
    showUserWall: React.PropTypes.func,
    userList: React.PropTypes.array,
    userWall: React.PropTypes.object,
    userTabsOpen: React.PropTypes.array
};

module.exports = WallsTop;
