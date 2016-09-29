import React, { PropTypes, Component } from 'react';
import pure from 'recompose/pure';
import cn from './ControlBar.css';

import Period from './Period';
import TotalPages from './TotalPages';


class ControlBar extends Component {
  render() {
    return (
      <div className={cn.ControlBar}>
        <Period
          dropItems={this.props.periodItems}
          selectedIndex={this.props.selectedPeriodIndex}
          periodHandler={this.props.periodHandler}
        />
        <TotalPages
          selectedIndex={this.props.selectedPageIndex}
          total={this.props.total}
          pageHandler={this.props.pageHandler}
        />
      </div>
    );
  }
}

ControlBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  periodItems: PropTypes.array,
  selectedPeriodIndex: PropTypes.number,
  selectedPageIndex: PropTypes.number,
  total: PropTypes.number,
  category: PropTypes.string,
  periodHandler: PropTypes.func,
  pageHandler: PropTypes.func,
};

export default pure(ControlBar);
