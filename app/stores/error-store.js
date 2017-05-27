class ErrorStore{

  constructor(){
    var self = this;
    self.name = 'ErrorStore';
    self.namespace = self.name+':';
    self._error = {}
  }
  bindEvents(){
    var self = this;
    riot.observable(self);
    self.on(riot.EVT.errorStore.in.errorCatchAll, (error) => {
      console.log(self.name,riot.EVT.errorStore.in.errorCatchAll,error);
      self._error = error;
      riot.state.error = error;
      riot.control.trigger(riot.EVT.routeStore.in.routeDispatch,'/error');
    });
  }
}
export default ErrorStore;