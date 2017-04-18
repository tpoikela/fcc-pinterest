
'use strict';

const React = require('react');

class WallsTop extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUserList();
    }

    render() {
        let users = this.props.userList;

        let userList = null;
        if (users) {
            userList = users.map( (item, index) => {
                return (
                    <li key={index}>
                        User: {item.username}
                    </li>
                );
            });
        }

        return (
            <div>
                <h2>WallsTop</h2>
                <ul>
                    {userList}
                </ul>
            </div>
        );
    }

}

WallsTop.propTypes = {
    getUserList: React.PropTypes.func,
    userList: React.PropTypes.array
};

module.exports = WallsTop;
