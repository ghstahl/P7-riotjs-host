import DeepFreeze from '../utils/deep-freeze.js';
import StoreBase from './store-base.js';

class Constants {}
Constants.NAME = 'route-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    routeDispatch: 'riot-route-dispatch',
    riotRouteLoadView: 'riot-route-load-view'
  },
  out: {
    riotRouteDispatchAck: 'riot-route-dispatch-ack'
  }
};
DeepFreeze.freeze(Constants);

export default class RouteStore extends StoreBase {

  static get constants() {
    return Constants;
  }

  constructor() {
    super();
    riot.observable(this);

    this.postResetRoute = null;
    this.riotHandlers = [
      {event: Constants.WELLKNOWN_EVENTS.in.routeDispatch, handler: this._onRouteDispatch},
      {event: Constants.WELLKNOWN_EVENTS.in.riotRouteLoadView, handler: this._onRiotRouteLoadView}
    ];
    this.bindEvents();
  }
  _onRouteDispatch(route, force) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.routeDispatch, route);
    let current = riot.route.currentPath();

    let same = current === route;

    if (!same) {
      same = ('/' + current) === route;
    }
    if (!same) {
      riot.route(route);
    } else {
      if (force) {
        riot.route.exec();
      }
    }

    riot.routeState.route = route;
    this.trigger(Constants.WELLKNOWN_EVENTS.out.routeDispatchAck, route);
  }

  _onRiotRouteLoadView(view) {
    console.log(Constants.NAME, 'riot-route-load-view', view);
    riot.router.loadView(view);
  }
}
