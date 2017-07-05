<download-manager-home>

<div class="panel panel-default">
  <div class="panel-heading">Download Manager</div>
  <div class="panel-body">
    <div class="well">
      This pulls download from /download-manager.json     
</div>
    <table if={state.data} class="table table-striped table-hover ">
	    <thead>
	      <tr>
	        <th>File</th>
	        <th>link</th>
	      </tr>
	    </thead>
	    <tbody>
	      <tr each={ state.data }>
	        <td>{ this.FileName }</td>
	        <td>
	        	<a href="{ this.Url }" download="{ this.FileName }">Download</a></td>
	      </tr>
	       
	    </tbody>
	</table> 
  </div>
</div>
 


<script>
	var self = this;
	self.error = false;
	self.state = riot.state.downloadManagerState;
  self.results = [];
  /**
   * Reset tag attributes to hide the errors and cleaning the results list
   */
  self.resetData = function() {
    self.results = [];
    self.error = false;
  }

	self.on('mount', () => {
      console.log('typicode-users mount')
      riot.control.on(riot.EVT.downloadManagerStore.out.downloadManagerChanged,self.onDownloadManagerChanged);
      riot.control.trigger(riot.EVT.downloadManagerStore.in.downloadManagerFetch);
    });
    self.on('unmount', () => {
      console.log('typicode-users unmount')
      riot.control.off(riot.EVT.downloadManagerStore.out.downloadManagerChanged,self.onDownloadManagerChanged);
    });
	self.onDownloadManagerChanged = (result) =>{
       console.log(riot.EVT.downloadManagerStore.out.downloadManagerChanged);
       self.update();
    }
  self.route = (evt) => {
		riot.control.trigger('riot-route-dispatch',
		'my-component-page/typicode-user-detail?id='+evt.item.id);
	  };
</script>


</download-manager-home>