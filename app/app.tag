
import './components/header.tag';
import './components/sidebar.tag';
import './components/loading-indicator.tag';

<app>

<loading-indicator></loading-indicator>
<header></header>
<div class="container">
  <div class="row">
 
    <div class="col-sm-3 col-md-2 sidebar">
      <div class="list-group table-of-contents">
        <sidebar></sidebar>
      </div>
    </div>

    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <div id="riot-app"></div>
    </div>
  </div>
</div>

<script>
 	var self = this;
  self.name = 'app';
  self.on('before-mount', () => {
      console.log('before-mount');
    });
 	self.on('mount', () => {
      console.log(self.name,'mount');
    });

  self.on('unmount', () => {
      console.log(self.name,'unmount');
    });

</script>
</app>