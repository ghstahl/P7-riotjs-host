class Constants {}
Constants.NAME = 'riotcontrol-dispatch-store';
Constants.NAMESPACE = Constants.NAME+':';
Constants.WELLKNOWN_EVENTS = {
  in:{
    dispatch:Constants.NAMESPACE+'dispatch'
  },
  out:{
  }
};
Object.freeze(Constants);

class RiotControlDispatchStore{
  static getConstants(){
      return Constants;
  }
  constructor(){
     riot.observable(this);
     this._bound = false;
     this.bindEvents();
  }

  bindEvents(){
    if(this._bound == false){
      this.on(Constants.WELLKNOWN_EVENTS.in.dispatch, this._onDispatch);
      this._bound = true;
    }
  }
  bindEvents(){
    if(this._bound == true){
      this.off(Constants.WELLKNOWN_EVENTS.in.dispatch, this._onDispatch);
      this._bound = false;
    }
  }

  _onDispatch(event, data){
    console.log(Constants.WELLKNOWN_EVENTS.in.dispatch,event,data)
    this.trigger(event, data);
  }
}
export default RiotControlDispatchStore;