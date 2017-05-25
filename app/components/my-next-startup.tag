<my-next-startup>
<script>
	var self = this;
  if(self.opts.config){
    self.config = self.opts.config;
  }
  self.ack = {
    evt:'my-next-tag-fetch-config-ack'
  };

  self.loaded = false;
  self.on('mount', () => {
    riot.control.on(self.ack.evt,self.onAck);
    riot.control.trigger('NextConfigStore:fetch-config',self.config,
      {evt:self.ack.evt});
  });

  self.on('unmount', () => {
    riot.control.off(self.ack.evt,self.onAck);
  });
  self.onAck = () =>{
    if(!self.loaded){
      self.loaded = true;
      riot.control.off(self.ack.evt,self.onAck);
      riot.control.trigger(riot.EVT.startupStore.in.start,self.nextTag);
    }
  }
    
</script>
</my-next-startup>