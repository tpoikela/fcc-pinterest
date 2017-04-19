
'use strict';

const React = require('react');

class WallsTop extends React.Component {

    constructor(props) {
        super(props);
        this.showWall = this.showWall.bind(this);
        this.showUserList = this.showUserList.bind(this);
    }

    componentDidMount() {
        this.props.getUserList();
    }

    closeUserWall(username) {
        this.props.closeUserWall(username);
    }

    showWall(username) {
        this.props.getUserWall(username);
    }

    showUserList() {
        this.props.showUserList();
    }

    render() {
        let wallsBody = this.getRenderedBody();
        let userTabs = this.getUserTabs();

        return (
            <div>
                <h2>WallsTop</h2>
                <button onClick={this.showUserList}>Users</button>
                {userTabs}
                <ul>
                    {wallsBody}
                </ul>
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
        if (userWall) {
            wall = <p>Userwall rendered: {userWall.username}</p>;
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
                    <li key={index} onClick={onClickCb}>
                        User: {username}
                    </li>
                );
            });
        }
        return userList;
    }

    /* Returns the tabs to navigate between user walls. */
    getUserTabs() {
        let tabs = null;
        let userWall = this.props.userWall;
        if (userWall) {

            let username = userWall.username;
            let closeUserWall = this.closeUserWall.bind(this, username);

            tabs = (
                <span>
                    {userWall.username}
                    <button onClick={closeUserWall}>X</button>
                </span>
            );

        }
        return tabs;
    }

}

WallsTop.propTypes = {
    closeUserWall: React.PropTypes.func,
    getUserList: React.PropTypes.func,
    getUserWall: React.PropTypes.func,
    showWall: React.PropTypes.bool,
    showUserList: React.PropTypes.func,
    userList: React.PropTypes.array,
    userWall: React.PropTypes.object
};

module.exports = WallsTop;
