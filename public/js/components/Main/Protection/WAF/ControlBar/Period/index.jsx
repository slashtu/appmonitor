import React, { PropTypes, Component } from 'react';
import pure from 'recompose/pure';
import cn from './Period.css';

import PeriodIcon from 'svg/protect_icon_period.svg';
import DropDown from '../DropDown';

class Period extends Component {
  render() {
    return (
      <div className={cn.Period}>
        <PeriodIcon />
        <div>Period:</div>
        <DropDown
          dropItems={this.props.dropItems}
          selectedText={(this.props.dropItems[this.props.selectedIndex]).text}
          onClickHandler={this.props.periodHandler}
        />
      </div>
    );
  }
}

Period.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  dropItems: PropTypes.array,
  periodHandler: PropTypes.func,
  selectedIndex: PropTypes.number,
};

export default pure(Period);
