import React, { PropTypes, Component } from 'react';
import pure from 'recompose/pure';
import cn from './WAFItem.css';
import { VelocityTransitionGroup } from 'velocity-react';
import DetailItem from './DetailItem';

class WAFItem extends Component {
  state = {
    showDetail: false,
  };

  onClickHandler = () => this.setState({ showDetail: !this.state.showDetail});

  render() {
    const {
      no,
      time,
      attackerIP,
      targetIP,
      country,
      userAgent,
      dfAddress,
      eventID,
      request,
      scheme,
      totalHits,
      hits,
      action,
      logtype,
      module,
    } = this.props;
    return (
      <div className={cn.WAFItem} onClick={this.onClickHandler}>
        <div className={cn.container}>
          <div>{no}</div>
          <div>{time.replace(/(T|Z)/g, '  ')}</div>
          <div>{eventID}</div>
          <div>{attackerIP}</div>
          <div>{country || '??'}</div>
          <div>{action}</div>
        </div>
        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: 160 }}
          leave={{ animation: 'slideUp', duration: 160 }}
        >
          {(this.state.showDetail) ?
            <DetailItem
              userAgent={userAgent}
              request={request}
              scheme={scheme}
              action={action}
              logtype={logtype}
              module={module}
              hits={hits}
            />
            : undefined}
        </VelocityTransitionGroup>
      </div>
    );
  }
}

WAFItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  no: PropTypes.number,
  time: PropTypes.string,
  attackerIP: PropTypes.string,
  targetIP: PropTypes.string,
  country: PropTypes.string,
  userAgent: PropTypes.string,
  dfAddress: PropTypes.string,
  eventID: PropTypes.string,
  request: PropTypes.string,
  scheme: PropTypes.string,
  totalHits: PropTypes.number,
  hits: PropTypes.array,
  action: PropTypes.string,
  logtype: PropTypes.string,
  module: PropTypes.string,
};

export default pure(WAFItem);
