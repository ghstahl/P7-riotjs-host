import DeepFreeze from '../utils/deep-freeze.js';

class Constants {}
Constants.NAME = 'riotcontrol-dispatch-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    dispatch: Constants.NAMESPACE + 'dispatch'
  },
  out: {
  }
};
DeepFreeze.freeze(Constants);

export default class RiotControlDispatchStore {
  static get constants() {
    return Constants;
  }
  constructor() {
    riot.observable(this);
    this._bound = false;
    this.bindEvents();
  }

  bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.dispatch, this._onDispatch);
      this._bound = !this._bound;
    }
  }
  bindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.dispatch, this._onDispatch);
      this._bound = !this._bound;
    }
  }

  _onDispatch(event, data) {
    console.log(Constants.WELLKNOWN_EVENTS.in.dispatch, event, data);
    this.trigger(event, data);
  }
}
