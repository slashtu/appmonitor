import React, { PropTypes, Component } from 'react';
import pure from 'recompose/pure';
import cn from './WAF.css';

import ControlBar from './ControlBar';
import SwitchBox from './SwitchBox';
import WAFTable from './WAFTable';

import WAFActions from 'action/WAFnewActions';
import WAFStore from 'store/WAFnewStore';
import SettingStore from 'store/SettingStore';

const periodItems = [
  { text: '1 hour', value: '1h' },
  { text: '1 day', value: '1d' },
  { text: '1 week', value: '1w' },
  { text: '1 momth', value: '1M' },
  { text: '1 year', value: '1y' },
];

class WAF extends Component {
  state = {
    ...WAFStore.getState(),
    category: 'All',
    categorySelectedIndex: 0,
    severitySelectedIndex: 0,
    rulesSelectedIndex: 0,
    selectedPeriodIndex: 0,
    selectedPageIndex: 0,
  };

  componentDidMount() {
    SettingStore.listen(this.refetchHandler);
    WAFStore.listen(this.siteThreatsHandler);
    const period = periodItems[this.state.selectedPeriodIndex].value;
    const offset = this.state.selectedPageIndex * 500;
    WAFActions.fetchSiteThreats(offset, period);
  }

  componentWillUnmount() {
    SettingStore.unlisten(this.refetchHandler);
    WAFStore.unlisten(this.siteThreatsHandler);
  }

  siteThreatsHandler = (state) => {
    if (state.siteThreatsList) {
      this.setState({
        siteThreatsList: state.siteThreatsList || [],
        siteThreatsTotal: state.siteThreatsTotal,
        siteThreatsLoading: state.siteThreatsLoading,
      });
    }
  };

  boxItemSelectedHandler = (category, index) => {
    const period = periodItems[this.state.selectedPeriodIndex].value;
    const offset = this.state.selectedPageIndex * 500;
    switch (category) {
      case 'Category':
        this.setState({ categorySelectedIndex: index });
        WAFActions.fetchSiteThreatsByCategory(index, offset, period);
        return;
      case 'Severity':
        this.setState({ severitySelectedIndex: index });
        WAFActions.fetchSiteThreatsBySeverity(index, offset, period);
        return;
      case 'Rules':
        this.setState({ rulesSelectedIndex: index });
        WAFActions.fetchSiteThreatsByRule(WAFStore.getState().siteThreatsRules[index].title, offset, period);
        return;
      default:
        return;
    }
  };

  
  refetchHandler = () => {
    const period = periodItems[this.state.selectedPeriodIndex].value;
    const offset = this.state.selectedPageIndex * 500;
    switch (this.state.category) {
      case 'All':
        WAFActions.fetchSiteThreats(offset, period);
        break;
      case 'Category':
        WAFActions.fetchSiteCategoryCounts(period);
        WAFActions.fetchSiteThreatsByCategory(this.state.categorySelectedIndex, offset, period);
        break;
      case 'Severity':
        WAFActions.fetchSiteSeverityCounts(period);
        WAFActions.fetchSiteThreatsBySeverity(this.state.severitySelectedIndex, offset, period);
        break;
      case 'Rules':
        WAFActions.fetchSiteTopRulesCounts(this.state.rulesSelectedIndex, offset, period);
        break;
      default:
        return;
    }
  };

  changeCategoryHandler = (e) => {
    if (e.target.value) {
      const value = e.target.value;
      this.setState({ category: value });
      const period = periodItems[this.state.selectedPeriodIndex].value;
      const offset = this.state.selectedPageIndex * 500;
      switch (value) {
        case 'All':
          WAFActions.fetchSiteThreats(offset, period);
          break;
        case 'Category':
          WAFActions.fetchSiteCategoryCounts(period);
          WAFActions.fetchSiteThreatsByCategory(this.state.categorySelectedIndex, offset, period);
          break;
        case 'Severity':
          WAFActions.fetchSiteSeverityCounts(period);
          WAFActions.fetchSiteThreatsBySeverity(this.state.severitySelectedIndex, offset, period);
          break;
        case 'Rules':
          WAFActions.fetchSiteTopRulesCounts(this.state.rulesSelectedIndex, offset, period);
          break;
        default:
          return;
      }
    }
  };

  periodHandler = (index) => {
    this.setState({ selectedPeriodIndex: index });
    const period = periodItems[index].value;
    const offset = this.state.selectedPageIndex * 500;
    switch (this.state.category) {
      case 'All':
        WAFActions.fetchSiteThreats(offset, period);
        break;
      case 'Category':
        WAFActions.fetchSiteCategoryCounts(period);
        WAFActions.fetchSiteThreatsByCategory(this.state.categorySelectedIndex, offset, period);
        break;
      case 'Severity':
        WAFActions.fetchSiteSeverityCounts(period);
        WAFActions.fetchSiteThreatsBySeverity(this.state.severitySelectedIndex, offset, period);
        break;
      case 'Rules':
        WAFActions.fetchSiteTopRulesCounts(this.state.rulesSelectedIndex, offset, period);
        break;
      default:
        return;
    }
  };

  pageHandler = (index) => {
    this.setState({ selectedPageIndex: index });
    const period = periodItems[this.state.selectedPeriodIndex].value;
    const offset = index * 500;
    switch (this.state.category) {
      case 'All':
        WAFActions.fetchSiteThreats(offset, period);
        break;
      case 'Category':
        WAFActions.fetchSiteCategoryCounts(period);
        WAFActions.fetchSiteThreatsByCategory(this.state.categorySelectedIndex, offset, period);
        break;
      case 'Severity':
        WAFActions.fetchSiteSeverityCounts('1y');
        WAFActions.fetchSiteThreatsBySeverity(this.state.severitySelectedIndex, offset, period);
        break;
      case 'Rules':
        WAFActions.fetchSiteTopRulesCounts(this.state.rulesSelectedIndex, offset, period);
        break;
      default:
        return;
    }
  };

  keyDownHandler = (e, query) => {
    const period = periodItems[this.state.selectedPeriodIndex].value;
    const offset = this.state.selectedPageIndex * 500;
    if (e.keyCode === 13) WAFActions.fetchSiteThreatsByQuery(query, offset, period);
  };

  render() {
    let selectedIndex = 0;
    const period = periodItems[this.state.selectedPeriodIndex].value;
    const offset = this.state.selectedPageIndex * 500;
    switch (this.state.category) {
      case 'Category':
        selectedIndex = this.state.categorySelectedIndex;
        break;
      case 'Severity':
        selectedIndex = this.state.severitySelectedIndex;
        break;
      case 'Rules':
        selectedIndex = this.state.rulesSelectedIndex;
        break;
      default:
        break;
    }
    return (
      <div className={`${cn.WAF} MainViews-Item`}>
        <ControlBar
          category={this.state.category}
          periodItems={periodItems}
          total={this.state.siteThreatsTotal}
          selectedPeriodIndex={this.state.selectedPeriodIndex}
          selectedPageIndex={this.state.selectedPageIndex}
          periodHandler={this.periodHandler}
          pageHandler={this.pageHandler}
        />
        <SwitchBox
          category={this.state.category}
          changeCategoryHandler={this.changeCategoryHandler}
          selectedIndex={selectedIndex}
          boxItemSelectedHandler={this.boxItemSelectedHandler}
          period={period}
          offset={offset}
        />
        <WAFTable
          loading={this.state.siteThreatsLoading}
          siteThreats={this.state.siteThreatsList}
          total={this.state.siteThreatsTotal}
          selectedPeriodIndex={0}
        />
      </div>
    );
  }
}

WAF.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

export default pure(WAF);
