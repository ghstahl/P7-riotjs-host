<download-manager-home>

<div class="panel panel-default">
  <div class="panel-heading">Download Manager</div>
  <div class="panel-body">
    <div class="well">
      This pulls download from /download-manager.json     
</div>
    <table if={state.localData} class="table table-striped table-hover ">
	    <thead>
	      <tr>
	        <th>File</th>
          <th>Complete</th>
          <th>percentComplete</th>
	        <th>link</th>
	      </tr>
	    </thead>
	    <tbody>
	      <tr each={ state.localData }>
	        <td>{ this.fileName }</td>
          <td>{ this.downloadItem.isComplete }</td>
          <td>{ this.downloadItem.percentComplete }</td>
	        <td if={!this.downloadItem.isComplete && !this.downloadItem.isInProgress}>
	        	<a  href="{ this.url }" download="{ this.fileName }">Download</a></td>
          </td>
          <td if={!this.downloadItem.isComplete && this.downloadItem.isInProgress}>
            <a class="btn btn-default" onclick={this.onCancel} >Cancel</a>
          </td>
          <td if={this.downloadItem.isComplete}>
            <a class="btn btn-default" onclick={this.onInstall} >Install</a>
          </td>
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

  self.tick = () => {
    riot.control.trigger(riot.EVT.downloadManagerStore.in.downloadManagerLocalFetch);

  }

	self.on('mount', () => {
      console.log('typicode-users mount')
      riot.control.on(riot.EVT.downloadManagerStore.out.downloadManagerLocalChanged,self.onDownloadManagerLocalChanged);
      riot.control.trigger(riot.EVT.downloadManagerStore.in.downloadManagerFetch);
      self.tick();
      self.timer =  setInterval(this.tick,2000)
    });
  self.on('unmount', () => {
      console.log('typicode-users unmount')
      clearInterval(self.timer)
      riot.control.off(riot.EVT.downloadManagerStore.out.downloadManagerLocalChanged,self.onDownloadManagerLocalChanged);
    });
	
  self.onDownloadManagerLocalChanged = (result) =>{
       console.log(riot.EVT.downloadManagerStore.out.downloadManagerLocalChanged);
       self.update();
    }
  
  self.route = (evt) => {
		riot.control.trigger('riot-route-dispatch',
		'my-component-page/typicode-user-detail?id='+evt.item.id);
	  };

  self.onInstall = (evt) => {
      let url = 'local://download/launch-executable';
      riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Symc-Fetch-App-Version': '1.0'
      },
      body: {url:evt.item.url}
    }
    , null);
  };
  self.onCancel = (evt) => {
      let url = 'local://download/cancel';
      riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Symc-Fetch-App-Version': '1.0'
      },
      body: {url:evt.item.url}
    }, null);
  };
</script>


</download-manager-home>