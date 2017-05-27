import DeepFreeze from './deep-freeze.js';
class Constants {}
Constants.NAME = 'riotcontrol-store';
Constants.NAMESPACE = Constants.NAME+':';
Constants.WELLKNOWN_EVENTS = {
  in:{
    riotContolAddStore:Constants.NAMESPACE+'add-store',
    riotContolRemoveStore:Constants.NAMESPACE+'remove-store'
  },
  out:{}
};
DeepFreeze.freeze(Constants);

class RiotControlStore{
  static getConstants(){
      return Constants;
  }
  constructor(){
    riot.observable(this);
    this._bound = false;
    this._stores = {};
    this.bindEvents();
  }

  bindEvents(){
    if(this._bound == true){
      return;
    }
    this.on(riot.EVT.riotControlStore.in.riotContolAddStore, this._onAdd);
    this.on(riot.EVT.riotControlStore.in.riotContolRemoveStore, this._onRemove);
    this._bound = true;
  }
  unbindEvents(){
    if(this._bound == false){
      return;
    }
    this.off(riot.EVT.riotControlStore.in.riotContolAddStore, this._onAdd);
    this.off(riot.EVT.riotControlStore.in.riotContolRemoveStore, this._onRemove);
    this._bound = false;
  }
  _onAdd(name,store){
    var tempStore = riot.control._stores;
    this._stores[name] = store;
    console.log(riot.EVT.riotControlStore.in.riotContolAddStore,store)
    riot.control.addStore(store)
  }
  _onRemove(name){
    console.log(riot.EVT.riotControlStore.in.riotContolRemoveStore,name)
    var store = this._stores[name];
    while (riot.control._stores.indexOf(store) !== -1) {
      riot.control._stores.splice(riot.control._stores.indexOf(store), 1);
    }
  }
}
export default RiotControlStore;