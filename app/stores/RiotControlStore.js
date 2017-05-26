
class RiotControlStore{

  constructor(){
    var self = this;
    self.name = 'RiotControlStore';
    self.namespace = self.name + ':';
    riot.EVT.riotControlStore ={
        in:{
          riotContolAddStore:self.namespace+'riot-contol-add-store',
          riotContolRemoveStore:self.namespace+'riot-contol-remove-store'
        },
        out:{}
    }
    self._stores = {};
  }

  bindEvents(){
    var self = this;
    riot.observable(self);
    self.on(riot.EVT.riotControlStore.in.riotContolAddStore, (name,store) => {
      var tempStore = riot.control._stores;
      self._stores[name] = store;
      console.log(riot.EVT.riotControlStore.in.riotContolAddStore,store)
      riot.control.addStore(store)
    });

    self.on(riot.EVT.riotControlStore.in.riotContolRemoveStore, (name) => {
      console.log(riot.EVT.riotControlStore.in.riotContolRemoveStore,name)
      var store = self._stores[name];
      while (riot.control._stores.indexOf(store) !== -1) {
        riot.control._stores.splice(riot.control._stores.indexOf(store), 1);
      }
    });
  }
}
export default RiotControlStore;