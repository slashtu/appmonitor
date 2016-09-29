import React, { PropTypes, Component } from 'react';
import pure from 'recompose/pure';
import cn from './DetailItem.css';
import map from 'lodash/map';

export class DetailItem extends Component {
  render() {
    return (
      <div
        className={cn.DetailItem}
        onClick={e => e.stopPropagation()}
      >
        <div className={cn.item}>
          <label>User Agent:</label>
          <div>{this.props.userAgent}</div>
        </div>
        <div className={cn.item}>
          <label>Request:</label>
          <div>{this.props.request}</div>
        </div>
        <div className={cn.item}>
          <label>Scheme:</label>
          <div>{this.props.scheme}</div>
        </div>
        <div className={cn.item}>
          <label>Action:</label>
          <div>{this.props.action}</div>
        </div>
        <div className={cn.item}>
          <label>Log Type:</label>
          <div>{this.props.logtype}</div>
        </div>
        <div className={cn.item}>
          <label>Module:</label>
          <div>{this.props.module}</div>
        </div>
        {map(this.props.hits, (hit, i) => (
          <div className={cn.hitsContainer} key={i}>
            <label>{`Hit${i + 1}:`}</label>
            <div className={cn.hit}>
              <div className={cn.hitItem}>
                <label>Rule ID:</label>
                <div>{hit.id}</div>
              </div>
              <div className={cn.hitItem}>
                <label>Severity:</label>
                <div>{hit.severity}</div>
              </div>
              <div className={cn.hitItem}>
                <label>Category:</label>
                <div>{hit.category}</div>
              </div>
              <div className={cn.hitItem}>
                <label>Match Key:</label>
                <div>{hit.match_key}</div>
              </div>
              <div className={cn.hitItem}>
                <label>Match Value:</label>
                <div>{atob(hit.match_val)}</div>
              </div>
              <div className={cn.hitItem}>
                <label>Message:</label>
                <div>{hit.msg}</div>
              </div>
            </div>
          </div>))}
      </div>
    );
  }
}

DetailItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  userAgent: PropTypes.string.isRequired,
  request: PropTypes.string.isRequired,
  scheme: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  logtype: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
  hits: PropTypes.array.isRequired,
};

export default pure(DetailItem);
