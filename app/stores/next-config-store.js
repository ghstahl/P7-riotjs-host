import DeepFreeze from '../p7-host-core/utils/deep-freeze.js';

class Constants {}
Constants.NAME = 'next-config-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    fetchConfig: Constants.NAMESPACE + 'fetch-config',
    fetchConfigResult: Constants.NAMESPACE + 'fetch-config-result',
    fetchConfigHeadResult: Constants.NAMESPACE + 'fetch-config-head-result'
  },
  out: {
    configComplete: Constants.NAMESPACE + 'config-complete'
  }
};
DeepFreeze.freeze(Constants);

export default class NextConfigStore {
  static get constants() {
    return Constants;
  }
  constructor() {
    var self = this;
    riot.observable(this);
    self._bound = false;
    self.bindEvents();
  }

  bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.fetchConfig, this._onFetchConfig);
      this.on(riot.EVT.nextConfigStore.in.fetchConfigResult, this._onFetchConfigResult);
      this._bound = !this._bound;
    }
  }
  unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.fetchConfig, this._onFetchConfig);
      this.off(riot.EVT.nextConfigStore.in.fetchConfigResult, this._onFetchConfigResult);
      this._bound = !this._bound;
    }
  }
 
  _onFetchConfig(path) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfig, path);
    this.off(Constants.WELLKNOWN_EVENTS.in.fetchConfig, this._onFetchConfig); // done with this one.

    let url = path;
    let myAck = {
      evt: riot.EVT.nextConfigStore.in.fetchConfigResult
    };

    riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, null, myAck);
  }
  _onFetchConfigResult(result, ack) {
    console.log(Constants.NAME, riot.EVT.nextConfigStore.in.fetchConfigResult, result, ack);
    this.off(riot.EVT.nextConfigStore.in.fetchConfigResult, this._onFetchConfigResult); // done with this one

    if (result.error || !result.response.ok) {
      riot.control.trigger(riot.EVT.errorStore.in.errorCatchAll, {code: 'startup-config1234'});
    } else {
      this.trigger(Constants.WELLKNOWN_EVENTS.out.configComplete);
    }
  }
}

