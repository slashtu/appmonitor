import React, { PropTypes, Component } from 'react';
import pure from 'recompose/pure';
import cn from './SwitchBox.css';

import Box from './Box';
import SearchBar from './SearchBar';
import WAFStore from 'store/WAFnewStore';

class SwitchBox extends Component {
  state = {
    categorySelectedIndex: 0,
    category: [
      { title: 'Generic Injection', value: WAFStore.getState().siteThreatsCategory.gnInjCount },
      { title: 'SQL Injection', value: WAFStore.getState().siteThreatsCategory.sqlInjCount },
      { title: 'XSS', value: WAFStore.getState().siteThreatsCategory.xssCount },
    ],
    severitySelectedIndex: 0,
    severity: [
      { title: 'Severity 1', value: WAFStore.getState().siteThreatsSeverity.serverity1 },
      { title: 'Severity 2', value: WAFStore.getState().siteThreatsSeverity.serverity2 },
      { title: 'Severity 3', value: WAFStore.getState().siteThreatsSeverity.serverity3 },
      { title: 'Severity 4', value: WAFStore.getState().siteThreatsSeverity.serverity4 },
      { title: 'Severity 5', value: WAFStore.getState().siteThreatsSeverity.serverity5 },
    ],
    topRules: [],
  };

  componentDidMount() {
    WAFStore.listen(this.categoryHandler);
    WAFStore.listen(this.severityHandler);
    WAFStore.listen(this.rulesHandler);
  }

  componentWillUnmount() {
    WAFStore.unlisten(this.categoryHandler);
    WAFStore.unlisten(this.severityHandler);
    WAFStore.unlisten(this.rulesHandler);
  }

  categoryHandler = (state) => {
    const { gnInjCount, sqlInjCount, xssCount } = state.siteThreatsCategory;
    const { category } = this.state;

    if (category[0].value === gnInjCount
      && category[1].value === sqlInjCount
      && category[2].value === xssCount
    ) return;

    this.setState({
      category: [
        { title: 'Generic Injection', value: gnInjCount },
        { title: 'SQL Injection', value: sqlInjCount },
        { title: 'XSS', value: state.siteThreatsCategory.xssCount },
      ],
    });
  };

  severityHandler = (state) => {
    const { severity1, severity2, severity3, severity4, severity5 } = state.siteThreatsSeverity;
    const { severity } = this.state;
    if (severity[0].value === severity1
      && severity[1].value === severity2
      && severity[2].value === severity3
      && severity[3].value === severity4
      && severity[4].value === severity5
    ) return;

    this.setState({
      severity: [
        { title: 'Severity 1', value: severity1 },
        { title: 'Severity 2', value: severity2 },
        { title: 'Severity 3', value: severity3 },
        { title: 'Severity 4', value: severity4 },
        { title: 'Severity 5', value: severity5 },
      ],
    });
  };

  rulesHandler = (state) => {
    const rules = state.siteThreatsRules;
    const nowRules = this.state.topRules;
    const ruleslen = rules.length;

    if (this.state.topRules.length === 0) {
      this.setState({ topRules: rules });
      return;
    }

    if (rules.length === 0 && nowRules !== 0) {
      this.setState({ topRules: rules });
      return;
    }

    for (let i = 0; i < ruleslen; ++i) {
      const rule = rules[i];
      const nowRule = nowRules[i];
      if (rule.title !== nowRule.title || rule.value !== nowRule.value) {
        this.setState({ topRules: rules });
        return;
      }
    }
  };

  render() {
    let boxItems = [];

    switch (this.props.category) {
      case 'Category':
        boxItems = this.state.category;
        break;
      case 'Severity':
        boxItems = this.state.severity;
        break;
      case 'Rules':
        boxItems = this.state.topRules;
        break;
      default:
        break;
    }

    return (
      <div className={cn.SwitchBox} >
        <div className={cn.Switch} onClick={this.props.changeCategoryHandler}>
          <div
            className={(this.props.category === 'All') ? cn.active : null}
            value={'All'}
          >All</div>
          <div
            className={(this.props.category === 'Category') ? cn.active : null}
            value={'Category'}
          >Category</div>
          <div
            className={(this.props.category === 'Severity') ? cn.active : null}
            value={'Severity'}
          >Severity</div>
          <div
            className={(this.props.category === 'Rules') ? cn.active : null}
            value={'Rules'}
          >Top 10 Rules</div>
        </div>
        <div className={cn.Box}>
          {(this.props.category === 'All') ?
            <SearchBar
              period={this.props.period}
              offset={this.props.offset}
            /> :
            <Box
              boxItems={boxItems}
              selectedIndex={this.props.selectedIndex}
              boxItemSelectedHandler={this.props.boxItemSelectedHandler}
              category={this.props.category}
            />
          }
        </div>
      </div>
    );
  }
}

SwitchBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  category: PropTypes.string,
  boxItems: PropTypes.array,
  changeCategoryHandler: PropTypes.func,
  selectedIndex: PropTypes.number,
  boxItemSelectedHandler: PropTypes.func,
  period: PropTypes.string,
  offset: PropTypes.string,
};

export default pure(SwitchBox);
