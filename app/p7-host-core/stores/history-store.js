import DeepFreeze from '../utils/deep-freeze.js';
import StoreBase from './store-base.js';
import RouteStore from './route-store.js';

const RSWKE = RouteStore.constants.WELLKNOWN_EVENTS;

class Constants {}
Constants.NAME = 'history-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    errorCatchAll: Constants.NAMESPACE + 'catch-all:'
  },
  out: {
    routeDispatch: RSWKE.in.routeDispatch
  }
};
DeepFreeze.freeze(Constants);

export default class HistoryStore extends StoreBase {
  static get constants() {
    return Constants;
  }

  constructor() {
    super();

    let self = this;

    riot.observable(this);
    this._bound = false;
    this._error = {};
    this.riotHandlers = [
      {event: Constants.WELLKNOWN_EVENTS.in.errorCatchAll, handler: this._onError}
    ];
    this.bindEvents();
    window.onpopstate = (event) =>{
      self._onPopState(event);
    };
  }

  _onError(error) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.errorCatchAll, error);
    this._error = error;
    riot.state.error = error;
    riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.routeDispatch, '/error');
  }
  _onPopState(event) {
    console.log(Constants.NAME, 'location: ' + document.location + ', state: ', event.state);
  }
}
