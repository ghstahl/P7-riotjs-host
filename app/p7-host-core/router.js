import DeepFreeze from './utils/deep-freeze.js';

class Constants {}
Constants.NAME = 'router';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {},
  out: {
    contributeRoutes: 'contribute-routes',
    contributeCatchAllRoute: 'contribute-catchall-route'
  }
};

DeepFreeze.freeze(Constants);

export default class Router {
  static getConstants() {
    return Constants;
  }
  constructor() {
    // we need this to easily check the current route from every component
    riot.routeState.view = '';
    this.r = riot.route.create();
    this.resetCatchAll();
  }

  resetCatchAll() {
    this.r.stop();
    riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.contributeRoutes, this.r);
    riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.contributeCatchAllRoute, this.r);
  }

  loadView(view) {
    if (this._currentView) {
      this._currentView.unmount(true);
    }
    riot.routeState.view = view;
    this._currentView = riot.mount('#riot-app', view)[0];
  }
}

