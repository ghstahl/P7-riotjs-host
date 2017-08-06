import DeepFreeze from './utils/deep-freeze.js';

class Constants { }
Constants.NAME = 'router';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {},
  out: {}
};

DeepFreeze.freeze(Constants);

export default class Router {
  static get constants() {
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
    let mySet = riot.state.registeredPlugins;

    for (let item of mySet) {
      if (item.registrants && item.registrants.routeContributer) {
        item.registrants.routeContributer.contributeRoutes(this.r);
      }
    }
    this._contributeCatchAllRoute(this.r);
  }

  _contributeCatchAllRoute(r) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.contributeCatchAllRoute, r);
    if (riot.state.componentLoaderState && riot.state.componentLoaderState.components) {
      for (let item of riot.state.componentLoaderState.components) {
        let component = item[1];

        if (component.state.loaded === false) {
          r(component.routeLoad.route, () => {
            console.log('catchall route handler of:', component.routeLoad.route);

            let path = riot.route.currentPath();

            this.postResetRoute = path;
            riot.control.trigger(riot.EVT.componentLoaderStore.in.loadDynamicComponent, component.key);
          });
        }
      }
    }

    r('/..', () => {
      console.log('route handler of /  ');
      riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, riot.state.route.defaultRoute);
    });
    if (this.postResetRoute != null) {
      let postResetRoute = this.postResetRoute;

      this.postResetRoute = null;
      riot.control.trigger('riot-route-dispatch', postResetRoute, true);
    }
  }

  loadView(view) {
    if (this._currentView) {
      this._currentView.unmount(true);
    }
    riot.routeState.view = view;
    this._currentView = riot.mount('#riot-app', view)[0];
  }
}

