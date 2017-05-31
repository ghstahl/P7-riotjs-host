import DeepFreeze from './utils/deep-freeze.js';

class Constants {}
Constants.NAME = 'riotcontrol-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {},
  out: {}
};
DeepFreeze.freeze(Constants);

export default class RiotControlExt {
  static get constants() {
    return Constants;
  }
  constructor() {
    riot.observable(this);
    this._bound = false;
    this._stores = {};
  }
  add(name, store) {
    this._stores[name] = store;
    riot.control.addStore(store);
  }
  remove(name) {
    let store = this._stores[name];

    while (riot.control._stores.indexOf(store) !== -1) {
      riot.control._stores.splice(riot.control._stores.indexOf(store), 1);
    }
  }
}
