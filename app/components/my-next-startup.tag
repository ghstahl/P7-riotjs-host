<my-next-startup>
<script>
	var self = this;
  if(self.opts.config){
    self.config = self.opts.config;
  }
  self.nextTag = 'app';
  if(self.opts.nextTag){
    self.nextTag = self.opts.nextTag;
  }

  self.loaded = false;

  self._bind =()=>{
    riot.control.on('next-config-store:config-complete',
                    self.onConfigComplete);
  }
  self._unbind =()=>{
    riot.control.off('next-config-store:config-complete',
                    self.onConfigComplete);
  }
  
  self.on('mount', () => {
    self._bind();
    riot.control.trigger('next-config-store:fetch-config',self.config);
  });

  self.on('unmount', () => {
    self._unbind();
  });

  self.onConfigComplete = () =>{
    if(!self.loaded){
      self.loaded = true;
      self._unbind();
      riot.control.trigger(riot.EVT.startupStore.in.start,self.nextTag);
    }
  }
    
</script>
</my-next-startup>