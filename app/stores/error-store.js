
import RouteStore           from './route-store.js';
const RSWKE = RouteStore.getConstants().WELLKNOWN_EVENTS;

class Constants {}
Constants.NAME = 'error-store';
Constants.NAMESPACE = Constants.NAME+':';
Constants.WELLKNOWN_EVENTS = {
    in:{
      errorCatchAll:Constants.NAMESPACE +'catch-all:'
    },
    out:{
      routeDispatch:RSWKE.in.routeDispatch
    }
};
Object.freeze(Constants);

class ErrorStore{
  static getConstants(){
    return Constants;
  }

  constructor(){
    riot.observable(this);
    this._bound = false;
    this._error = {}
  }

  bindEvents(){
    if(this._bound == true){
      return;
    }
    this.on(Constants.WELLKNOWN_EVENTS.in.errorCatchAll, this._onError);
    this._bound = true;
  }
  unbindEvents(){
    if(this._bound == false){
      return;
    }
    this.off(Constants.WELLKNOWN_EVENTS.in.errorCatchAll, this._onError);
    this._bound = false;
  }
  _onError(error){
    console.log(this.name,Constants.WELLKNOWN_EVENTS.in.errorCatchAll,error);
    this._error = error;
    riot.state.error = error;
    riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.routeDispatch,'/error');
  }
}
export default ErrorStore;