import DeepFreeze from '../utils/deep-freeze.js';

class Constants {}
Constants.NAME = 'route-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    routeDispatch: 'riot-route-dispatch',
    riotRouteAddView: 'riot-route-add-view',
    riotRouteRemoveView: 'riot-route-remove-view',
    riotRouteLoadView: 'riot-route-load-view'
  },
  out: {
    riotRouteDispatchAck: 'riot-route-dispatch-ack'
  }
};
DeepFreeze.freeze(Constants);

export default class RouteStore {

  static get constants() {
    return Constants;
  }

  constructor() {
    riot.observable(this);
    this._bound = false;
    this.postResetRoute = null;
    this.bindEvents();
  }

  bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.routeDispatch, this._onRouteDispatch);
      this.on(Constants.WELLKNOWN_EVENTS.in.riotRouteAddView, this._onRiotRouteAddView);
      this.on(Constants.WELLKNOWN_EVENTS.in.riotRouteRemoveView, this._onRiotRouteRemoveView);
      this.on(Constants.WELLKNOWN_EVENTS.in.riotRouteLoadView, this._onRiotRouteLoadView);
      this._bound = !this._bound;
    }
  }

  unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.routeDispatch, this._onRouteDispatch);
      this.off(Constants.WELLKNOWN_EVENTS.in.riotRouteAddView, this._onRiotRouteAddView);
      this.off(Constants.WELLKNOWN_EVENTS.in.riotRouteRemoveView, this._onRiotRouteRemoveView);
      this.off(Constants.WELLKNOWN_EVENTS.in.riotRouteLoadView, this._onRiotRouteLoadView);
      this._bound = !this._bound;
    }
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

  _onRiotRouteAddView(view) {
    console.log(Constants.NAME, 'riot-route-add-view', view);
    let s = this._viewsSet;

    s.add(view);
    riot.routeState.views = Array.from(s);
  }
  _onRiotRouteRemoveView(view) {
    console.log(Constants.NAME, 'riot-route-remove-view', view);
    let s = this._viewsSet;

    s.delete(view);
    riot.routeState.views = Array.from(s);
  }
  _onRiotRouteLoadView(view) {
    console.log(Constants.NAME, 'riot-route-load-view', view);
    riot.router.loadView(view);
  }
}
