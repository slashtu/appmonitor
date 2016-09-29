import React, { PropTypes, Component } from 'react';
import pure from 'recompose/pure';
import cn from './DropItem.css';

export class DropItem extends Component {
  onClickHandler = () => {
    this.props.dropHandler();
    this.props.onClickHandler(this.props.selectedIndex);
  };

  render() {
    return (
      <li
        className={(this.props.selected) ? cn.DropItemSelected : cn.DropItem}
        onClick={this.onClickHandler}
      >
        {this.props.text}
      </li>
    );
  }
}

DropItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.component, PropTypes.arrayOf(PropTypes.component)]),
  dropHandler: PropTypes.func,
  onClickHandler: PropTypes.func,
  selected: PropTypes.bool,
  text: PropTypes.string,
  index: PropTypes.number,
  value: PropTypes.any,
  selectedIndex: PropTypes.number,
};

DropItem.defaultProps = {
  onClickHandler: () => {},
};

export default pure(DropItem);
