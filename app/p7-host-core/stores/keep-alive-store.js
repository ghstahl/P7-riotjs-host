import DeepFreeze from '../utils/deep-freeze.js';

class Constants {}
Constants.NAME = 'keep-alive-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    fetchHeadResult: Constants.NAMESPACE + 'fetch-head-result',
    enable: Constants.NAMESPACE + 'enable',
    disable: Constants.NAMESPACE + 'disable'
  },
  out: {
  }
};
DeepFreeze.freeze(Constants);

export default class KeepAliveStore {
  static get constants() {
    return Constants;
  }
  constructor() {
    let self = this;

    riot.observable(this);
    self._bound = false;
    self.bindEvents();
    self._keepAlive = false;

  }

  bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.fetchHeadResult, this._onFetchHeadResult);
      this.on(Constants.WELLKNOWN_EVENTS.in.enable, this._onEnable);
      this.on(Constants.WELLKNOWN_EVENTS.in.disable, this._onDisable);
      this.on('http-monitor', this._onHttpMonitor);

      this._bound = !this._bound;
    }
  }
  unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.fetchConfigHeadResult, this._onFetchHeadResult);
      this.off(Constants.WELLKNOWN_EVENTS.in.enable, this._onEnable);
      this.off(Constants.WELLKNOWN_EVENTS.in.disable, this._onDisable);
      this.off('http-monitor', this._onHttpMonitor);

      this._bound = !this._bound;
    }
  }

  _onEnable() {
    let w = riot.global.window;
    let self = this;

    if (!w.fetch.polyfill) {
      w._oldFetch = w.fetch;

      w.fetch = (input, init) =>{
        return w._oldFetch(input, init).then(response =>{
          self._onHttpMonitor(response.url, response.status);
//          riot.control.trigger('http-monitor', response.url, response.status);
          return response;
        });
      };
    }

    self.timer = setInterval(()=>{
      self._onTimer();
    }, 5000);

  }

  _onDisable() {
    let w = riot.global.window;

    clearInterval(this.timer);
    if (w._oldFetch) {
      w.fetch = w._oldFetch;
      w._oldFetch = null;
    }
  }

  _onHttpMonitor(url, status) {
    var n = url.startsWith(window.location.origin);

    if (n === false) {
      this._keepAlive = true;
    }
  }
  _onTimer() {
    if (this._keepAlive) {
      let myAck = {
        evt: Constants.WELLKNOWN_EVENTS.in.fetchConfigHeadResult
      };

      riot.control.trigger(riot.EVT.fetchStore.in.fetch, riot.state.keepAlive.url, {method: 'HEAD'}, myAck);
      this._keepAlive = false;
    }
  }
  _onFetchHeadResult(result, ack) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2,
      result, ack);
  }

}

