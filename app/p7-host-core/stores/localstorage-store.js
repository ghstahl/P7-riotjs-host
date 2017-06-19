/**
 * Created by Herb on 9/27/2016.
 */
import DeepFreeze from '../utils/deep-freeze.js';
import StoreBase from './store-base.js';

class Constants {}
Constants.NAME = 'localstorage-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    localstorageSet: Constants.NAMESPACE + 'set',
    localstorageGet: Constants.NAMESPACE + 'get',
    localstorageRemove: Constants.NAMESPACE + 'remove',
    localstorageClear: Constants.NAMESPACE + 'clear'
  },
  out: {}
};
DeepFreeze.freeze(Constants);

export default class LocalStorageStore extends StoreBase {
  static get constants() {
    return Constants;
  }
  constructor() {
    super();
    riot.observable(this);
    this.riotHandlers = [
      {event: Constants.WELLKNOWN_EVENTS.in.localstorageSet, handler: this._onSet},
      {event: Constants.WELLKNOWN_EVENTS.in.localstorageGet, handler: this._onGet},
      {event: Constants.WELLKNOWN_EVENTS.in.localstorageRemove, handler: this._onRemove},
      {event: Constants.WELLKNOWN_EVENTS.in.localstorageClear, handler: this._onClear}
    ];
    this.bindEvents();
  }

    /*
    {
        key:[string:required],
        data: [Object],
        trigger:[optional]{
            event:[string],
            riotControl:bool  // do a riotcontrol.trigger or just an observable trigger.
        }
    }
    */
  _onSet(query) {
    console.log(Constants.WELLKNOWN_EVENTS.in.localstorageSet, query);
    localStorage.setItem(query.key, JSON.stringify(query.data));
    if (query.trigger) {
      this.trigger(query.trigger); // in case you want an ack
    }
  }
     /*
        {
            key:'myKey',
            trigger:{
                    event:[string],
                    riotControl:bool  // do a riotcontrol.trigger or just an observable trigger.
             }
        }
    */
  _onGet(query) {
    console.log(Constants.WELLKNOWN_EVENTS.in.localstorageGet, query);
    let stored = localStorage.getItem(query.key);
    let data = null;

    if (stored && stored !== 'undefined') {
      data = JSON.parse(stored);
    }
    if (query.trigger.riotControl === true) {
      riot.control.trigger(query.trigger.event, data);
    } else {
      this.trigger(query.trigger.event, data);
    }
  }
    /*
     {
     key:'myKey'
     }
     */
  _onRemove(query) {
    console.log(Constants.WELLKNOWN_EVENTS.in.localstorageRemove, query);
    localStorage.removeItem(query.key);
  }

  _onClear() {
    console.log(Constants.WELLKNOWN_EVENTS.in.localstorageClear);
    localStorage.clear();
  }
}

