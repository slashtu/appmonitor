import React, { PropTypes, Component } from 'react';
import pure from 'recompose/pure';
import cn from './Loading.css';

export class Loading extends Component {
  render() {
    return (
      <div className={cn.Loading}>
        <svg>
          <circle cx="30" cy="30" r="25" />
        </svg>
      </div>
    );
  }
}

Loading.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

export default pure(Loading);
