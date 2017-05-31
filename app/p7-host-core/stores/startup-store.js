import DeepFreeze from '../utils/deep-freeze.js';
import Router from '../router.js';

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

export default class StartupStore {
  static getConstants() {
    return Constants;
  }
  constructor() {
    riot.observable(this);
    this._bound = false;
    this._startupComplete = false;
    this._done = false;
    this.bindEvents();
  }
  bindEvents() {

    if (this._bound === false) {
      // ------------------------------------------------------------
      this.on(Constants.WELLKNOWN_EVENTS.in.start, this._onStart);

      // ------------------------------------------------------------
      this.on(Constants.WELLKNOWN_EVENTS.in.fetchConfig, this._onFetchConfig);

      // ------------------------------------------------------------
      this.on(Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2, this._onFetchConfigResult2);

      // ------------------------------------------------------------
      this.on(Constants.WELLKNOWN_EVENTS.in.fetchConfigResult, this._onFetchConfigResult);

      // ------------------------------------------------------------
      this.on(Constants.WELLKNOWN_EVENTS.in.componentsAdded, this._onComponentsAdded);

      this._bound = !this._bound;

    }
  }
  unbindEvents() {

    if (this._bound === true) {
      // ------------------------------------------------------------
      this.off(Constants.WELLKNOWN_EVENTS.in.start, this._onStart);

      // ------------------------------------------------------------
      this.off(Constants.WELLKNOWN_EVENTS.in.fetchConfig, this._onFetchConfig);

      // ------------------------------------------------------------
      this.off(Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2, this._onFetchConfigResult2);

      // ------------------------------------------------------------
      this.off(Constants.WELLKNOWN_EVENTS.in.fetchConfigResult, this._onFetchConfigResult);

      // ------------------------------------------------------------
      this.off(Constants.WELLKNOWN_EVENTS.in.componentsAdded, this._onComponentsAdded);

      this._bound = !this._bound;

    }
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
