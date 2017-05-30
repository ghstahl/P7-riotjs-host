
/*
var registerRecord = {
  name:'riotjs-partial-spa',
  views:[
    {view:'my-component-page'},
    {view:'typicode-user-detail'}
  ],
  stores:[
    {store: new TypicodeUserStore()}
  ],
  postLoadEvents:[
    {event:'typicode-init',data:{}}
  ],
  preUnloadEvents:[
    {event:'typicode-uninit',data:{}}
  ]
};
riot.control.trigger('plugin-registration',registerRecord);

*/
import DeepFreeze from '../utils/deep-freeze.js';
import RiotControlStore from './riotcontrol-store.js';

const RCSWKE = RiotControlStore.getConstants().WELLKNOWN_EVENTS;

class Constants {}
Constants.NAME = 'plugin-registration-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    pluginRegistration: 'plugin-registration',
    pluginUnregistration: 'plugin-unregistration'
  },
  out: {
    pluginRegistrationChanged: 'plugin-registration-changed'
  }
};
DeepFreeze.freeze(Constants);

export default class PluginRegistrationStore {
  static getConstants() {
    return Constants;
  }
  constructor(riotControlStore) {
    riot.observable(this);
    this.riotControlStore = riotControlStore;
    this._bound = false;
    this.bindEvents();
    riot.state.registeredPlugins = new Set();

  }
  bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.pluginRegistration, this._registerPlugin);
      this.on(Constants.WELLKNOWN_EVENTS.in.pluginUnregistration, this._unregisterPlugin);
      this._bound = !this._bound;
    }
  }
  unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.pluginRegistration, this._registerPlugin);
      this.off(Constants.WELLKNOWN_EVENTS.in.pluginUnregistration, this._unregisterPlugin);
      this._bound = !this._bound;
    }
  }

  _findRegistration(registrationName) {

    var mySet = riot.state.registeredPlugins;

    for (let item of mySet) {
      if (item.name === registrationName) {return item;}
    }
    return null;
  }
  _removeRegistration(registrationName) {

    var mySet = riot.state.registeredPlugins;

    for (let item of mySet) {
      if (item.name === registrationName) {
        mySet.delete(item);
        break;
      }
    }
    return null;
  }

  _registerPlugin(registration) {

    var foundRegistration = this._findRegistration(registration.name);

    if (foundRegistration === null) {
      // 1. Add the registration record
      riot.state.registeredPlugins.add(registration);

      // 2. Ready up the stores
      for (let i = 0; i < registration.stores.length; i++) {

        // 2.1 Tell the stores to START listening.  Doing a bind, which may not be neccessary
        //    but it has to match the unbind that I am doing later in the unregister.
        //    It is required to be implemented, even if it is a noop.
        registration.stores[i].store.bind();

        // 2.2 Add the stores
        registration.stores[i].name = registration.name + '-store-' + i; // need this for my own tracking
        this.riotControlStore._onAdd(registration.stores[i].name, registration.stores[i].store);
      }

      // 3. fire post load events
      //    NOTE: we do NOT fire unload events as they are async and these stores have to go
      for (let i = 0; i < registration.postLoadEvents.length; i++) {
        riot.control.trigger(registration.postLoadEvents[i].event, registration.postLoadEvents[i].data);
      }

      // 4. Tell the world that things have changed.
      riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.pluginRegistrationChanged);
    } else {
      console.error(Constants.NAME, registration, 'plugin already registered!');
    }
  }

  _unregisterPlugin(registration) {

    var foundRegistration = this._findRegistration(registration.name);

    if (foundRegistration === null) {
      console.error(Constants.NAME, registration, 'plugin already unregistered!');
    } else {
      // 0. We do NOT fire unregister events as the stores will be gone before any event can reach them

      // 1. Shutdown the stores
      for (let i = 0; i < foundRegistration.stores.length; i++) {

        // 1.1. Tell the store to STOP listening.
        foundRegistration.stores[i].store.unbind(); // stop listening

        // 1.2. Remove the store.
        this.riotControlStore._onRemove(foundRegistration.stores[i].name);
      }

      // 2. Remove the registration record
      this._removeRegistration(foundRegistration.name);

      // 3. Tell the world that things have changed.
      riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.pluginRegistrationChanged);
    }
  }
}
