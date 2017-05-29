import DeepFreeze from '../utils/deep-freeze.js';

class Constants {}
Constants.NAME = 'riotcontrol-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    riotContolAddStore: Constants.NAMESPACE + 'add-store',
    riotContolRemoveStore: Constants.NAMESPACE + 'remove-store'
  },
  out: {}
};
DeepFreeze.freeze(Constants);

export default class RiotControlStore {
  static getConstants() {
    return Constants;
  }
  constructor() {
    riot.observable(this);
    this._bound = false;
    this._stores = {};
    this.bindEvents();
  }

  bindEvents() {
    if (this._bound === false) {
      this.on(riot.EVT.riotControlStore.in.riotContolAddStore, this._onAdd);
      this.on(riot.EVT.riotControlStore.in.riotContolRemoveStore, this._onRemove);
      this._bound = !this._bound;
    }

  }
  unbindEvents() {
    if (this._bound === true) {
      this.off(riot.EVT.riotControlStore.in.riotContolAddStore, this._onAdd);
      this.off(riot.EVT.riotControlStore.in.riotContolRemoveStore, this._onRemove);
      this._bound = !this._bound;
    }

  }
  _onAdd(name, store) {
    this._stores[name] = store;
    console.log(riot.EVT.riotControlStore.in.riotContolAddStore, store);
    riot.control.addStore(store);
  }
  _onRemove(name) {
    console.log(riot.EVT.riotControlStore.in.riotContolRemoveStore, name);
    let store = this._stores[name];

    while (riot.control._stores.indexOf(store) !== -1) {
      riot.control._stores.splice(riot.control._stores.indexOf(store), 1);
    }
  }
}
