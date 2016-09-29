var React = require('react')


var Tab = React.createClass({

	componentDidMount: function(){
		$('#tab').hide()
	},

	render: function() {
		return (
				<div id="tab" className="HUD">
					<ul className="customer-menu">
						<ul className="clearfix">
							<li id="tab_title"  className="active"></li>
						</ul>
					</ul>
				</div>
		);
  }
});

module.exports = Tab;