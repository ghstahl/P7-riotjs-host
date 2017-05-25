class NextConfigStore{

  constructor(){
    var self = this;
    self.name = 'NextConfigStore';
    self.namespace = self.name +':';
    riot.EVT.nextConfigStore ={
        in:{
          fetchConfig:self.namespace + 'fetch-config',
          fetchConfigResult:self.namespace + 'fetch-config-result',
        },
        out:{
        }
    }
    riot.observable(self);
    self._bindEvents();
  }

  _bindEvents(){
    var self = this;
     
    //------------------------------------------------------------
    self.on(riot.EVT.nextConfigStore.in.fetchConfig, (path,ack) => {
      console.log(self.name,riot.EVT.nextConfigStore.in.fetchConfig,path);
      var url = path;
      var trigger = {
        name:riot.EVT.nextConfigStore.in.fetchConfigResult,
        ack:ack
      };
      riot.control.trigger(riot.EVT.fetchStore.in.fetch,url,null,trigger);
    });

    //------------------------------------------------------------
    self.on(riot.EVT.nextConfigStore.in.fetchConfigResult, (result,myTrigger) => {
      console.log(self.name,riot.EVT.nextConfigStore.in.fetchConfigResult,result,myTrigger);
      if(result.error || !result.response.ok){
        riot.control.trigger('ErrorStore:error-catch-all',{code:'startup-config1234'});
      }else{
        riot.control.trigger(myTrigger.ack.evt,myTrigger.ack);
      }
    });


  }
}
export default NextConfigStore;