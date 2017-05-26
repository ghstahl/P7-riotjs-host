class RiotControlDispatcherStore{

  constructor(){
  }

  bindEvents(){
    var self = this;
    riot.observable(self);
    self.on('riot-dispatch', (event, data) => {
      console.log('riot-dispatch',event,data)
      self.trigger(event, data);
    });
  }
}
export default RiotControlDispatcherStore;