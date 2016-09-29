import React, { PropTypes, Component } from 'react';
import pure from 'recompose/pure';
import cn from './TotalPages.css';
import DropDown from '../DropDown';

class TotalPages extends Component {
  render() {
    let dropdown = null;
    const interval = 500;
    if (this.props.total > interval) {
      const number = Math.ceil(this.props.total / interval);
      let dropItems = [];
      for (let i = 0; i < number; ++i) {
        const intervalBegin = interval * i;
        const intervalEnd = interval * (i + 1);
        const maxValue = (this.props.total < intervalEnd) ? this.props.total : intervalEnd;
        dropItems.push({ text: `${intervalBegin}~${maxValue}`, value: intervalBegin });
      }
      dropdown = (
        <DropDown
          dropItems={dropItems}
          selectedText={dropItems[this.props.selectedIndex].text}
          onClickHandler={this.props.pageHandler}
        />
      );
    }
    return (
      <div className={cn.TotalPages}>
        {dropdown}
        <label>{` / ${this.props.total}`}</label>
      </div>
    );
  }
}

TotalPages.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  dropItems: PropTypes.array,
  total: PropTypes.number,
  selectedPeriodIndex: PropTypes.number,
  pageHandler: PropTypes.func,
};

export default pure(TotalPages);
