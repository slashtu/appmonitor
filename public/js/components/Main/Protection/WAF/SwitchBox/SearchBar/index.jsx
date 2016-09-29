import React, { PropTypes, Component } from 'react';
import pure from 'recompose/pure';
import cn from './SearchBar.css';

import WAFActions from 'action/WAFnewActions';
import SearchIcon from 'svg/protect_icon_glass.svg';

class SearchBar extends Component {
  state = {
    queryString: '',
  };

  onChangeHandler = (e) => {
    this.setState({ queryString: e.target.value });
  };

  keyDownHandler = (e) => {
    if (e.keyCode === 13) {
      WAFActions.fetchSiteThreatsByQuery(this.state.queryString, this.props.offset, this.props.period);
    }
  };

  render() {
    return (
      <div className={cn.SearchBar}>
        <SearchIcon />
        <input
          placeholder="Search..."
          onKeyDown={this.keyDownHandler}
          onChange={this.onChangeHandler}
          value={this.state.queryString}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  offset: PropTypes.string,
  period: PropTypes.string,
};

export default pure(SearchBar);
