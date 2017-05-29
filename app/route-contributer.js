
import './pages/home.tag';
import './pages/projects.tag';
import './pages/error.tag';

export default class RouteContributer {
  constructor() {
    riot.observable(this);
    this.name = 'RouteContributer';
    this._initializeViewSet();
  }

  _initializeViewSet() {
    this._viewsSet = new Set();
    let s = this._viewsSet;

    s.add('home');
    s.add('projects');
    this.views = Array.from(s);
    this.defaultRoute = '/main/home/';
  }

  contributeRoutes(r) {
    var self = this;

    console.log(self.name, riot.EVT.router.out.contributeRoutes, r);
    r('/main/*', (name)=>{
      console.log('route handler of /main/' + name);
      let view = name;

      if (self.views.indexOf(view) === -1) {
        riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, self.defaultRoute);
      } else {
        riot.control.trigger(riot.EVT.routeStore.in.riotRouteLoadView, view);
      }
    });

    r('/main..', ()=>{
      console.log('route handler of /main');
      riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, self.defaultRoute);
    });

    r('/error..', ()=>{
      console.log('route handler of /error..');
      riot.control.trigger(riot.EVT.routeStore.in.riotRouteLoadView, 'error');
    });
  }
}
