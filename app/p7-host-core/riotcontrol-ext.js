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
  static getConstants() {
    return Constants;
  }
  constructor() {
    riot.observable(this);
    this._bound = false;
    this._stores = {};
  }
  add(name, store) {
    this._stores[name] = store;
    console.log(riot.EVT.riotControlStore.in.riotContolAddStore, store);
    riot.control.addStore(store);
  }
  remove(name) {
    console.log(riot.EVT.riotControlStore.in.riotContolRemoveStore, name);
    let store = this._stores[name];

    while (riot.control._stores.indexOf(store) !== -1) {
      riot.control._stores.splice(riot.control._stores.indexOf(store), 1);
    }
  }
}
