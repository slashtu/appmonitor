var React = require('react');

// store
var CustomerStore = require('../stores/CustomerStore.jsx')

// actions
var CustomerActions = require('../actions/CustomerActions.jsx')

var HeaderMenu = React.createClass({

    getInitialState: function(){
        return {
            user: {}
        }
    },

    componentWillMount: function(){

        // store
        CustomerStore.listen(this.onChange);
    },

    componentDidMount: function(){
    },

    onChange: function(state){
        // console.log(state)
        this.setState({ user: state.user })
    },

    render: function() {
        return (
            <div className="link-menu">
                <ul className="clearfix">
                    <li>
                        <a href="">Hi, {this.state.user.username}</a>
                            <div className="submenu user-menu">
                            <ul>
                                <li ng-show="isAdminUser">
                                    <a href="/admin">Administrator</a>
                                </li>
                                <li>
                                    <a href="/customer#!/member/edit">Change Password</a>
                                </li>
                                <li>
                                    <a href="/customer#!/member/ssl">SSL Key Manager</a>
                                </li>
                                <li ng-show="isMonitorUser">
                                    <a href="/monitor#!/monitor/sites">Monitor</a>
                                </li>
                                <li>
                                    <a href="/logout">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }

});

module.exports = HeaderMenu;
