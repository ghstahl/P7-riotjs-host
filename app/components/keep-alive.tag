<keep-alive>
<script>
	var self = this;
  if(self.opts.url){
    self.url = self.opts.url;
  }

  self.on('mount', () => {
    riot.state.keepAlive = {
      url:self.url
    }
  });

  self.on('unmount', () => {
    riot.state.keepAlive = null;
  });
</script>
</keep-alive>