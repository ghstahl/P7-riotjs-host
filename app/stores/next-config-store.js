import {DeepFreeze, StoreBase} from '../../lib/P7HostCore.js';

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

export default class NextConfigStore extends StoreBase {
  static get constants() {
    return Constants;
  }
  constructor() {
    super();
    let self = this;

    riot.observable(this);
    this.riotHandlers = [
      {event: Constants.WELLKNOWN_EVENTS.in.fetchConfig, handler: this._onFetchConfig},
      {event: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult, handler: this._onFetchConfigResult}
    ];
    self.bindEvents();
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

