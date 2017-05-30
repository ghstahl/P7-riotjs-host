import DeepFreeze from '../utils/deep-freeze.js';
import Router from '../router.js';
import ComponentLoaderStore from './component-loader-store.js';
import RouteStore from './route-store.js';

const CLSWKE = ComponentLoaderStore.getConstants().WELLKNOWN_EVENTS;
const RSWKE = RouteStore.getConstants().WELLKNOWN_EVENTS;

class Constants {}
Constants.NAME = 'startup-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    start: Constants.NAMESPACE + 'start',
    fetchConfig: Constants.NAMESPACE + 'fetch-config',
    fetchConfigResult: Constants.NAMESPACE + 'fetch-config-result',
    fetchConfigResult2: Constants.NAMESPACE + 'fetch-config-result2',
    componentsAdded: Constants.NAMESPACE + 'components-added',
    allComponentsLoadComplete: CLSWKE.out.allComponentsLoadComplete
  },
  out: {
    routeCatchallReset: RSWKE.in.routeCatchallReset
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

      // ------------------------------------------------------------
      this.on(Constants.WELLKNOWN_EVENTS.in.allComponentsLoadComplete,
        this._onAllComponentsLoadComplete);
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

      // ------------------------------------------------------------
      this.off(Constants.WELLKNOWN_EVENTS.in.allComponentsLoadComplete,
        this._onAllComponentsLoadComplete);
      this._bound = !this._bound;

    }
  }
  // this is the one and only handler when components are added and loaded.
  // it is meant to trigger a route rebuild.
  _onAllComponentsLoadComplete() {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.allComponentsLoadComplete);
    riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.routeCatchallReset);
  }
  _onComponentsAdded(ack) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.componentsAdded, ack);
    riot.control.trigger(ack.ack.evt, ack.ack);
  }
  _onFetchConfigResult(result, myTrigger) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfigResult, result, myTrigger);
    if (result.error || !result.response.ok) {
      riot.control.trigger(riot.EVT.errorStore.in.errorCatchAll, {code: 'startup-config1234'});
    } else {
      riot.control.trigger(riot.EVT.componentLoaderStore.in.addDynamicComponents
        , result.json.components, {evt: Constants.WELLKNOWN_EVENTS.in.componentsAdded,
          ack: myTrigger.ack});
    }
  }
  _onFetchConfigResult2(result, myTrigger) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2,
      result, myTrigger);
  }
  _onFetchConfig(path, ack) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfig, path);
    let url = path;
    let trigger = {
      name: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult,
      ack: ack
    };
    let trigger2 = {
      name: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2,
      ack: ack
    };

    riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, {method: 'HEAD'}, trigger2);
    riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, null, trigger);
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
