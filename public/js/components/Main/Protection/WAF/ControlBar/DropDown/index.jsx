import React, { PropTypes, Component } from 'react';
import pure from 'recompose/pure';
import cn from './DropDown.css';
import map from 'lodash/map';
import DropItem from './DropItem';

class DropDown extends Component {
  state = {
    show: false,
  };

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.show && nextState.show) {
      document.addEventListener('click', this.dropHandler, false);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.show && prevState.show) {
      document.removeEventListener('click', this.dropHandler, false);
    }
  }

  dropHandler = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const items = map(this.props.dropItems, (item, i) => (
      <DropItem
        key={i}
        index={this.props.index}
        selectedIndex={i}
        text={item.text}
        selected={item.text === this.props.selectedText}
        onClickHandler={this.props.onClickHandler}
        dropHandler={this.dropHandler}
        value={item.value}
      />
    ));
    // console.log(this.props.selectedText);
    return (
      <div className={cn.DropDown}>
        <DropItem
          text={this.props.selectedText}
          dropHandler={this.dropHandler}
          selected={false}
        />
        <ul className={(this.state.show) ? cn.itemsShow : cn.itemsHide}>
          {items}
        </ul>
      </div>
    );
  }
}

DropDown.propTypes = {
  children: PropTypes.oneOfType([PropTypes.component, PropTypes.arrayOf(PropTypes.component)]),
  dropItems: PropTypes.arrayOf(PropTypes.object),
  selectedText: PropTypes.string,
  onClickHandler: PropTypes.func,
  index: PropTypes.number,
};

export default pure(DropDown);
