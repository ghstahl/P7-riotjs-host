<sidebar>
 
		<a 	each={ state.items } 
			onclick={parent.route}
			class={ parent.routeState.route === this.route? 'active list-group-item':'list-group-item'  } 
			>{this.title}</a>
	 
</div>        
 

<script>
	var self = this;
	self.state = riot.state.sidebar;
  	self.routeState = riot.routeState;

	self.on('mount', () => {
	    console.log('sidebar mount');
	    riot.control.on(
	    	riot.EVT.routeStore.out.riotRouteDispatchAck,
	    	self.onRiotRouteDispatchAck);
	  });
	  self.on('unmount', () => {
	    console.log('sidebar unmount')
	    riot.control.off(
	    	riot.EVT.routeStore.out.riotRouteDispatchAck,
	    	self.onRiotRouteDispatchAck);
	  });

	  self.onRiotRouteDispatchAck = () =>{
	    console.log('sidebar',riot.EVT.routeStore.out.riotRouteDispatchAck);
	    self.update()
	  }

	  self.route = (evt) => {
		riot.control.trigger(riot.EVT.routeStore.in.routeDispatch,evt.item.route);
	  };
	  
	</script>
</sidebar>