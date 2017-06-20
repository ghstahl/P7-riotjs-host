import DeepFreeze from '../utils/deep-freeze.js';
import StoreBase from './store-base.js';

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

export default class RiotControlDispatchStore extends StoreBase {
  static get constants() {
    return Constants;
  }
  constructor() {
    super();
    riot.observable(this);
    this.riotHandlers = [
      {event: Constants.WELLKNOWN_EVENTS.in.dispatch, handler: this._onDispatch}
    ];
    this.bindEvents();
  }
  _onDispatch(event, data) {
    console.log(Constants.WELLKNOWN_EVENTS.in.dispatch, event, data);
    this.trigger(event, data);
  }
}
