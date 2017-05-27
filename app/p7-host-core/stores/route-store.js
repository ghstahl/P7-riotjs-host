import DeepFreeze from '../utils/deep-freeze.js';
class Constants {}
Constants.NAME = 'route-store';
Constants.NAMESPACE = Constants.NAME+':';
Constants.WELLKNOWN_EVENTS = {
  in:{
    routeCatchallReset:'route-catchall-reset',
    routeDispatch:'riot-route-dispatch',
    contributeCatchAllRoute:'contribute-catchall-route',
    riotRouteAddView:'riot-route-add-view',
    riotRouteRemoveView:'riot-route-remove-view',
    riotRouteLoadView:'riot-route-load-view'
  },
  out:{
      riotRouteDispatchAck:'riot-route-dispatch-ack'
  }
};
DeepFreeze.freeze(Constants);

class RouteStore{
  
  static getConstants(){
    return Constants;
  }

  constructor(){
    riot.observable(this);
    this._bound = false;
    this.postResetRoute = null;
    this.bindEvents();
  }
 
  bindEvents(){
    if(this._bound == false){
      this.on(Constants.WELLKNOWN_EVENTS.in.contributeCatchAllRoute, this._onContributeCatchAllRoute);
      this.on(Constants.WELLKNOWN_EVENTS.in.routeDispatch, this._onRouteDispatch);
      this.on(Constants.WELLKNOWN_EVENTS.in.routeCatchallReset, this._onRouteCatchallReset);
      this.on(Constants.WELLKNOWN_EVENTS.in.riotRouteAddView, this._onRiotRouteAddView );
      this.on(Constants.WELLKNOWN_EVENTS.in.riotRouteRemoveView, this._onRiotRouteRemoveView);
      this.on(Constants.WELLKNOWN_EVENTS.in.riotRouteLoadView, this._onRiotRouteLoadView);
      this._bound == true;
    }
  }

  unbindEvents(){
    if(this._bound == true){
      this.off(Constants.WELLKNOWN_EVENTS.in.contributeCatchAllRoute, this._onContributeCatchAllRoute);
      this.off(Constants.WELLKNOWN_EVENTS.in.routeDispatch, this._onRouteDispatch);
      this.off(Constants.WELLKNOWN_EVENTS.in.routeCatchallReset, this._onRouteCatchallReset);
      this.off(Constants.WELLKNOWN_EVENTS.in.riotRouteAddView, this._onRiotRouteAddView );
      this.off(Constants.WELLKNOWN_EVENTS.in.riotRouteRemoveView, this._onRiotRouteRemoveView);
      this.off(Constants.WELLKNOWN_EVENTS.in.riotRouteLoadView, this._onRiotRouteLoadView);
      this._bound == false;
    }
  }

  _onContributeCatchAllRoute(r){
    console.log(Constants.NAME,Constants.WELLKNOWN_EVENTS.in.contributeCatchAllRoute,r)
    if(riot.state.componentLoaderState && riot.state.componentLoaderState.components){
      for(let item of riot.state.componentLoaderState.components){
        var component = item[1];
        if(component.state.loaded == false){
          r( component.routeLoad.route,()=>{
                  console.log('catchall route handler of:',component.routeLoad.route,path )
                  var q = riot.route.query();
                  var path = riot.route.currentPath();
                  this.postResetRoute = path;
                  riot.control.trigger('load-dynamic-component',component.key);  
                }) 
        }
      }
    }
 
    r('/..', ()=>{
      console.log('route handler of /  ' )
      riot.control.trigger(Constants.WELLKNOWN_EVENTS.in.routeDispatch,
        riot.state.route.defaultRoute);
    }) 
    if(this.postResetRoute != null){
      var postResetRoute = this.postResetRoute;
      this.postResetRoute = null;
      riot.control.trigger('riot-route-dispatch',postResetRoute,true);
    }
  }
  _onRouteDispatch(route, force){
    console.log(Constants.NAME,Constants.WELLKNOWN_EVENTS.in.routeDispatch,route)
    var current =  riot.route.currentPath();
    
    var same = current == route;
      if(!same){
        same = ('/' +current) == route;
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
  _onRouteCatchallReset(){
    console.log(Constants.NAME,Constants.WELLKNOWN_EVENTS.in.routeCatchallReset)
    riot.router.resetCatchAll();
  }
  _onRiotRouteAddView(view){
    console.log(Constants.NAME,'riot-route-add-view',view)
    var s = this._viewsSet;
    s.add(view);
    riot.routeState.views = Array.from(s);
  }
  _onRiotRouteRemoveView(view){
    console.log(Constants.NAME,'riot-route-remove-view',view)
    var s = this._viewsSet;
    s.delete(view);
    riot.routeState.views = Array.from(s);
  }
  _onRiotRouteLoadView(view){
    console.log(Constants.NAME,'riot-route-load-view',view)
    riot.router.loadView(view);
  }
}
export default RouteStore;