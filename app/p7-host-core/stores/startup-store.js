import DeepFreeze from '../utils/deep-freeze.js';
import Router from '../router.js';
import StoreBase from './store-base.js';

class Constants {}
Constants.NAME = 'startup-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    start: Constants.NAMESPACE + 'start',
    fetchConfig: Constants.NAMESPACE + 'fetch-config',
    fetchConfigResult: Constants.NAMESPACE + 'fetch-config-result',
    fetchConfigResult2: Constants.NAMESPACE + 'fetch-config-result2',
    componentsAdded: Constants.NAMESPACE + 'components-added'

  },
  out: {
    configComplete: Constants.NAMESPACE + 'config-complete'
  }
};

DeepFreeze.freeze(Constants);

export default class StartupStore extends StoreBase {
  static get constants() {
    return Constants;
  }
  constructor() {
    super();
    riot.observable(this);

    this._startupComplete = false;
    this._done = false;
    this.riotHandlers = [
      {event: Constants.WELLKNOWN_EVENTS.in.start, handler: this._onStart},
      {event: Constants.WELLKNOWN_EVENTS.in.fetchConfig, handler: this._onFetchConfig},
      {event: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2, handler: this._onFetchConfigResult2},
      {event: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult, handler: this._onFetchConfigResult},
      {event: Constants.WELLKNOWN_EVENTS.in.componentsAdded, handler: this._onComponentsAdded}
    ];
    this.bindEvents();
  }

  _onComponentsAdded(ack) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.componentsAdded, ack);
    this.trigger(Constants.WELLKNOWN_EVENTS.out.configComplete);
//    riot.control.trigger(ack.ack.evt, ack.ack);
  }
  _onFetchConfigResult(result, ack) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfigResult, result, ack);
    if (result.error || !result.response.ok) {
      riot.control.trigger(riot.EVT.errorStore.in.errorCatchAll, {code: 'startup-config1234'});
    } else {
      riot.control.trigger(riot.EVT.componentLoaderStore.in.addDynamicComponents
        , result.json.components, {evt: Constants.WELLKNOWN_EVENTS.in.componentsAdded});
    }
  }
  _onFetchConfigResult2(result, ack) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2,
      result, ack);
  }
  _onFetchConfig(path) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfig, path);
    let url = path;
    let myAck = {
      evt: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult
    };
    let myAck2 = {
      evt: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2
    };

    riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, {method: 'HEAD'}, myAck2);
    riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, null, myAck);
  }
  _onStart(nextTag) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.start, this._done, nextTag);
    if (this._done) {
      return;
    }

    if (!nextTag) {
      nextTag = 'app';
    }
    if (nextTag === 'app') {
      this._done = true;
      // only when the nextTag is 'app' do we engage the router.
      // 'app' is last
      riot.router = new Router();
      riot.mount(nextTag);
      riot.route.start(true);
    } else {
      riot.mount(nextTag);
    }

  }
}
