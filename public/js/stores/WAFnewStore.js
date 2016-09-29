import alt from '../alt';
import WAFActions from 'action/WAFnewActions.js';
import map from 'lodash/map';


class WAFnewStore {
  constructor() {
    this.siteThreatsLoading = true;
    this.siteThreatsList = [];
    this.siteThreatsTotal = 0;
    this.siteThreatsCategoryLoading = true;
    this.categorySelectedIndex = 0;
    this.siteThreatsCategory = {
      gnInjCount: 0,
      sqlInjCount: 0,
      xssCount: 0,
    };
    this.siteThreatsSeverityLoading = true;
    this.siteThreatsSeverity = {
      severity1: 0,
      severity2: 0,
      severity3: 0,
      severity4: 0,
      severity5: 0,
    };
    this.siteThreatsRulesLoading = true;
    this.siteThreatsRules = [];

    this.bindAction(WAFActions.setSiteThreats, this.siteThreatsHandler);
    this.bindAction(WAFActions.setSiteThreatsLoading, this.loadingHandler);
    this.bindAction(WAFActions.setCategoryLoading, this.categoryLoadingHandler);
    this.bindAction(WAFActions.setCategory, this.categoryCountsHandler);
    this.bindAction(WAFActions.setSeverityLoading, this.severityLoadingHandler);
    this.bindAction(WAFActions.setSeverity, this.severityHandler);
    this.bindAction(WAFActions.setTopRulesLoading, this.topRulesLoadingHandler);
    this.bindAction(WAFActions.setTopRules, this.topRulesHandler);
  }

  siteThreatsHandler(data) {
    this.siteThreatsList = data.list;
    this.siteThreatsLoading = false;
    this.siteThreatsTotal = data.total;
  }

  loadingHandler(loading) {
    this.siteThreatsLoading = loading;
  }

  categoryLoadingHandler(loading) {
    this.siteThreatsCategoryLoading = loading;
  }

  categoryCountsHandler(data) {
    this.siteThreatsCategory = {
      gnInjCount: data['Generic Injection'] || 0,
      sqlInjCount: data['SQL Injection'] || 0,
      xssCount: data.XSS || 0,
    };
    this.siteThreatsCategoryLoading = false;
  }

  severityLoadingHandler(loading) {
    this.severityLoading = loading;
  }

  severityHandler(data) {
    this.siteThreatsSeverity = {
      severity1: (data.severity1 && data.severity1.c) ? data.severity1.c : 0,
      severity2: (data.severity2 && data.severity2.c) ? data.severity2.c : 0,
      severity3: (data.severity3 && data.severity3.c) ? data.severity3.c : 0,
      severity4: (data.severity4 && data.severity4.c) ? data.severity4.c : 0,
      severity5: (data.severity5 && data.severity5.c) ? data.severity5.c : 0,
    };
    this.siteThreatsSeverityLoading = false;
  }

  topRulesLoadingHandler(loading) {
    this.siteThreatsRulesLoading = loading;
  }

  topRulesHandler(data) {
    this.siteThreatsRules = map(data, (item) => ({ title: item.k, value: item.c }));
    console.log(this.siteThreatsRules);
  }
}

export default alt.createStore(WAFnewStore);
