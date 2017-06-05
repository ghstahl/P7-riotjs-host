
import './components/header.tag';
import './components/sidebar.tag';
import './components/loading-indicator.tag';


import RouteContributer     from './route-contributer.js';
<app>

<loading-indicator></loading-indicator>
<header></header>
<div class="container-fluid">
  <div class="row">
 
    <div class="col-sm-3 col-md-2 sidebar">
      <div class="list-group table-of-contents">
        <sidebar></sidebar>
      </div>
    </div>

    <div id="mainContent" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <div id="riot-app"></div>
      <div class="alert alert-dismissible alert-success" ref="success-alert" id="success-alert">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>Success! </strong>
        A successful keep-alive has been issued.
      </div>
    </div>



    

  </div>
</div>

<script>
 	var self = this;
  self.name = 'app';
  self.on('before-mount', () => {
      console.log('before-mount');
      let routeContributer = new RouteContributer();
      let registerRecord = {
        name: 'main-component',
        stores: [],
        registrants: {
          routeContributer: routeContributer
        },
        postLoadEvents: [],
        preUnloadEvents: []
      };

      riot.control.trigger('plugin-registration', registerRecord);
    });

  self._bind =()=>{
    riot.control.on(riot.EVT.keepAliveStore.out.keptAlive,
                    self.onKeptAlive);
  }

  self._unbind =()=>{
     riot.control.off(riot.EVT.keepAliveStore.out.keptAlive,
                    self.onKeptAlive);
  }
  self.onKeptAlive = () =>{
    console.log(self.name,'onKeptAlive');

    $("#success-alert").alert();
    $("#success-alert")
      .fadeTo(2000, 500)
      .slideUp(500, function(){
        $("#success-alert").slideUp(500);
      }); 

  }

 	self.on('mount', () => {
      console.log(self.name,'mount');
      self._bind();
       $("#success-alert").hide();
    });

  self.on('unmount', () => {
      console.log(self.name,'unmount');
      self._unbind();
    });

</script>
</app>

