var React = require('react');

var style = { textDecoration: 'none' }

var footer = React.createClass({

    render: function() {
        return (
            <footer >Copyright © 2015 Nexusguard. All rights reserved. | 
                <span style={style}>
                    <a href="/privacy" target="_blank"> Privacy & Terms</a>
                </span>
            </footer>
        );
    }

});

module.exports = footer;
