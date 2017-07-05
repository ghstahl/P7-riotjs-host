import './pages/typicode-user-detail.tag';
import './pages/home.tag';

export default class RouteContributer {

  constructor() {
    var self = this;

    riot.observable(self);
    self.name = 'RouteContributer';
    self._initializeViewSet();

    this.initialize();
  }

  _initializeViewSet() {
    var self = this;

    self._viewsSet = new Set();
    let s = self._viewsSet;

    s.add('home');
    s.add('typicode-user-detail');
    self.views = Array.from(s);
    self.defaultRoute = '/download-manager/home';
  }
  uninitialize() {

  }
  initialize() {

  }
  contributeRoutes(r) {
    var self = this;

    console.log(self.name, riot.EVT.router.out.contributeRoutes, r);
    r('/download-manager/download-detail?id=*', ()=>{
      console.log('route handler of /download-manager/download-detail');
      riot.control.trigger(riot.EVT.routeStore.in.riotRouteLoadView, 'mpc-typicode-user-detail');
    });

    r('/download-manager/*', (name)=>{
      console.log('route handler of /download-manager/' + name);
      let view = name;

      if (self.views.indexOf(view) === -1) {
        riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, self.defaultRoute);
      } else {
        riot.control.trigger(riot.EVT.routeStore.in.riotRouteLoadView, 'download-manager-' + view);
      }
    });
    r('/download-manager..', ()=>{
      console.log('route handler of /download-manager..');
      riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, self.defaultRoute);
    });
  }
}
