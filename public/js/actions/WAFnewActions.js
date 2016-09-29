import alt from '../alt';
import { wafapi } from '../setting.js';
import SettingStore from '../stores/SettingStore';
import keyBy from 'lodash/keyBy';

const Category = ['Generic Injection', 'SQL Injection', 'XSS'];
const Severity = ['1', '2', '3', '4', '5'];

let token = '';

document.cookie.split(';').forEach((cookie) => {
  const names = cookie.split('=');
  if (names[0] === 'token') token = names[1];
});

class WAFActions {
  fetchSiteThreats(offset, duration) {
    const site = SettingStore.getState().site;
    if (site && site.siteid) {
      this.actions.setSiteThreatsLoading(true);
      // site.siteid = 'S-3228aa06-f18a-4fb0-9bee-d5703f2bd456';
      fetch(`${wafapi}alerts/siteID/${site.siteid}?limit=500&offset=${offset}&duration=${duration}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => response.json())
      .then(json => {
        this.actions.setSiteThreats(json.data);
      })
      .catch(() => {
        this.actions.setSiteThreats({ total: 0, list: [] });
      });
    }
  }

  fetchSiteCategoryCounts(duration) {
    const site = SettingStore.getState().site;
    if (site && site.siteid) {
      this.actions.setCategoryLoading(true);
      // site.siteid = 'S-3228aa06-f18a-4fb0-9bee-d5703f2bd456';
      fetch(`${wafapi}alerts/siteID/${site.siteid}/category?duration=${duration}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => response.json())
      .then(json => {
        this.actions.setCategory(json.data);
      })
      .catch(() => {
        this.actions.setCategory({
          'Generic Injection': 0,
          'SQL Injection': 0,
          XSS: 0,
        });
      });
    }
  }

  fetchSiteSeverityCounts(duration) {
    const site = SettingStore.getState().site;
    if (site && site.siteid) {
      this.actions.setSeverityLoading(true);
      // site.siteid = 'S-3228aa06-f18a-4fb0-9bee-d5703f2bd456';
      fetch(`${wafapi}alerts/siteID/${site.siteid}/topSeverity?duration=${duration}&size=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(json => {
        const obj = keyBy(json.data, item => `severity${item.k}`);
        this.actions.setSeverity(obj);
      })
      .catch(() => {
        this.actions.setSeverity({
          severity1: 0,
          severity2: 0,
          severity3: 0,
          severity4: 0,
          severity5: 0,
        });
      });
    }
  }

  fetchSiteTopRulesCounts(index, offset, duration) {
    const site = SettingStore.getState().site;
    if (site && site.siteid) {
      this.actions.setTopRulesLoading(true);
      // site.siteid = 'S-3228aa06-f18a-4fb0-9bee-d5703f2bd456';
      fetch(`${wafapi}alerts/siteID/${site.siteid}/topRules?duration=${duration}&size=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(json => {
        const datalist = json.data;
        this.actions.setTopRules(datalist);
        this.actions.fetchSiteThreatsByRule(datalist[index].k, offset, duration);
      })
      .catch(() => {
        this.actions.setTopRules([]);
        this.actions.setSiteThreats({ total: 0, list: [] });
      });
    }
  }

  fetchSiteThreatsByCategory(index, offset, duration) {
    const site = SettingStore.getState().site;
    const category = Category[index];
    if (site && site.siteid) {
      this.actions.setSiteThreatsLoading(true);
      // site.siteid = 'S-3228aa06-f18a-4fb0-9bee-d5703f2bd456';
      fetch(`${wafapi}alerts/siteID/${site.siteid}/category/${category}?limit=500&offset=${offset}&duration=${duration}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(json => {
        this.actions.setSiteThreats(json.data);
      })
      .catch(() => {
        this.actions.setSiteThreats({ total: 0, list: [] });
      });
    }
  }

  fetchSiteThreatsBySeverity(index, offset, duration) {
    const site = SettingStore.getState().site;
    const severity = Severity[index];
    if (site && site.siteid) {
      this.actions.setSiteThreatsLoading(true);
      // site.siteid = 'S-3228aa06-f18a-4fb0-9bee-d5703f2bd456';
      fetch(`${wafapi}alerts/siteID/${site.siteid}/severity/${severity}?limit=500&offset=${offset}&duration=${duration}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(json => {
        this.actions.setSiteThreats(json.data);
      })
      .catch(() => {
        this.actions.setSiteThreats({ total: 0, list: [] });
      });
    }
  }

  fetchSiteThreatsByRule(ruleID, offset, duration) {
    const site = SettingStore.getState().site;
    if (site && site.siteid) {
      this.actions.setSiteThreatsLoading(true);
      // site.siteid = 'S-3228aa06-f18a-4fb0-9bee-d5703f2bd456';
      fetch(`${wafapi}alerts/siteID/${site.siteid}/rule/${ruleID}?limit=500&offset=${offset}&duration=${duration}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(json => {
        this.actions.setSiteThreats(json.data);
      })
      .catch(() => {
        this.actions.setSiteThreats({ total: 0, list: [] });
      });
    }
  }

  fetchSiteThreatsByQuery(query, offset, duration) {
    const site = SettingStore.getState().site;
    if (site && site.siteid) {
      this.actions.setSiteThreatsLoading(true);
      // site.siteid = 'S-3228aa06-f18a-4fb0-9bee-d5703f2bd456';
      fetch(`${wafapi}alerts/siteID/${site.siteid}/queryString?qs=${query}&limit=500&offset=${offset}&duration=${duration}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(json => {
        this.actions.setSiteThreats(json.data);
      })
      .catch(() => {
        this.actions.setSiteThreats({ total: 0, list: [] });
      });
    }
  }

  setSiteThreats(data) {
    return { loading: false, total: data.total, list: data.list };
  }

  setSiteThreatsLoading(loading) {
    return loading;
  }

  setCategoryLoading(loading) {
    return loading;
  }

  setCategory(data) {
    return data;
  }

  setSeverityLoading(loading) {
    return loading;
  }

  setSeverity(data) {
    return data;
  }

  setTopRulesLoading(loading) {
    return loading;
  }

  setTopRules(data) {
    return data;
  }
}

export default alt.createActions(WAFActions);
