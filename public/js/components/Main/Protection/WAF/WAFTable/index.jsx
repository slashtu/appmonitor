import React, { PropTypes, Component } from 'react';
import pure from 'recompose/pure';
import cn from './WAFTable.css';
import map from 'lodash/map';

import WAFItem from './WAFItem';
import Loading from '../Loading';
const interval = 500;
const NoContent = <div className={cn.noThreat}>There is no threat in this Search</div>;

class WAFTable extends Component {
  render() {
    let content = (this.props.siteThreats.length === 0) ? NoContent :
    map(this.props.siteThreats, (item, i) => (
      <WAFItem
        key={item.event_id}
        no={this.props.selectedPeriodIndex * interval + i + 1}
        time={item.time_local}
        attackerIP={item.remote_addr}
        targetIP={item.server_addr}
        dfAddress={item.host}
        country={item.country}
        eventID={item.event_id}
        request={item.request}
        scheme={item.scheme}
        totalHits={item.msg.hit.length}
        hits={item.msg.hit}
        action={item.msg.action}
        uri={item.uri}
        userAgent={item.http_user_agent}
        logtype={item.logtype}
        module={item.module}
      />
    ));
    if (this.props.loading) content = <Loading />;
    return (
      <div className={cn.WAFTable}>
        <div className={cn.title}>
          <div>No.</div>
          <div>Time</div>
          <div>Event ID</div>
          <div>IP</div>
          <div>Country</div>
          <div>Action</div>
        </div>
        <div className={cn.Content}>
          {content}
        </div>
      </div>
    );
  }
}

WAFTable.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  siteThreats: PropTypes.array,
  selectedPeriodIndex: PropTypes.number,
  loading: PropTypes.bool,
};

export default pure(WAFTable);
