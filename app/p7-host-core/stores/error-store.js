
import DeepFreeze from '../utils/deep-freeze.js';
import RouteStore from './route-store.js';
import StoreBase from './store-base.js';

const RSWKE = RouteStore.constants.WELLKNOWN_EVENTS;

class Constants {}
Constants.NAME = 'error-store';
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

export default class ErrorStore extends StoreBase {
  static get constants() {
    return Constants;
  }

  constructor() {
    super();
    riot.observable(this);
    this._bound = false;
    this._error = {};
    this.riotHandlers = [
      {event: Constants.WELLKNOWN_EVENTS.in.errorCatchAll, handler: this._onError}
    ];
    this.bindEvents();
  }

  _onError(error) {
    console.log(this.name, Constants.WELLKNOWN_EVENTS.in.errorCatchAll, error);
    this._error = error;
    riot.state.error = error;
    riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.routeDispatch, '/error');
  }
}
