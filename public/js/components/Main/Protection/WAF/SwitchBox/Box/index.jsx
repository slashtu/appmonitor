import React, { PropTypes, Component } from 'react';
import pure from 'recompose/pure';
import cn from './Box.css';

import map from 'lodash/map';

const NoItem = <div className={cn.NoItem}>There is no Item in this Search</div>;

class Box extends Component {
  onClickHandler = (index) => () => {
    this.props.boxItemSelectedHandler(this.props.category, index);
  };

  render() {
    const content = (this.props.boxItems.length === 0) ? NoItem :
    map(this.props.boxItems, (item, i) => (
      <div
        key={i}
        className={(i === this.props.selectedIndex) ? cn.ItemActive : cn.Item}
        onClick={this.onClickHandler(i)}
      >
        <label>{item.title}</label>
        <div>{item.value}</div>
      </div>
    ));

    return (
      <div className={cn.Box}>
        {content}
      </div>
    );
  }
}

Box.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  boxItems: PropTypes.array,
  selectedIndex: PropTypes.number,
  boxItemSelectedHandler: PropTypes.func,
  category: PropTypes.string,
};

export default pure(Box);
