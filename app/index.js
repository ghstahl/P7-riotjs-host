
import 'bootswatch/slate/bootstrap.css';
import 'bootstrap';
import './css/index.css';
import './components/my-next-startup.tag';


import P7HostCore from './p7-host-core/p7-host-core.js';
var p7HostCore = new P7HostCore();
p7HostCore.Initialize();


riot.state.sidebar = {
		touch:0,
		items:[
			{ title : 'Home', route : '/main/home'},
			{ title : 'Projects', route : '/main/projects'}
		]
  };



// Add the mixings
////////////////////////////////////////////////////////
import OptsMixin                            from './mixins/opts-mixin.js'
riot.mixin("opts-mixin",OptsMixin);

// Add the stores
////////////////////////////////////////////////////////

import RouteContributionStore 		from './stores/route-contribution-store.js';
var routeContributionStore = new RouteContributionStore();

import NextConfigStore         from './stores/next-config-store.js';
var nextConfigStore = new NextConfigStore();

import SidebarStore 				from './stores/sidebar-store.js';
var sidebarStore = new SidebarStore();

nextConfigStore.bindEvents();
routeContributionStore.bindEvents();
sidebarStore.bindEvents();

riot.control.addStore(nextConfigStore);
riot.control.addStore(routeContributionStore);
riot.control.addStore(sidebarStore);

var testComponent = {
        key:'typicode-component',
        path:'/partial/typicode_component/bundle.js',
        type:'js',
        trigger:{
          onLoad:[{
              event:'SidebarStore:sidebar-add-item',
              data:{
                title : 'My Components Page', 
                route : 'my-component-page/home' 
              }
            }
          ],
          onUnload:[{
              event:'SidebarStore:sidebar-remove-item',
              data:{title : 'My Components Page'}
            },{
              event:'plugin-unregistration',
              data:{name:'typicode-component'}
            }
          ]
        },
        routeLoad:{
        	route:'/my-component-page..'
        },
        state:{
        	loaded:false
        }
      };

riot.control.trigger('init-component-loader-store');
//riot.control.trigger('add-dynamic-component',testComponent);
	
//riot.mount('app');

//riot.control.trigger('dynamic-jscss-loader-init');
// put Router Last
////////////////////////////////////////////////////////


// Finally dispatch the first event.
////////////////////////////////////////////////////////
// NOTE: DON'T DO the following;
//		RiotControl.trigger(riot.EVT.finalMount,'data');
// REASON: 
//      RiotControl events need to go to stores, and if you directly send the event to a tag
//      you will get as many callbacks to the tag as there were stores.  If you have 3 random stores, which
//      have nothing to do with the riot.EVT.finalMount event, you will still get 3 calls to the handler.
// SOLUTION:
// 		Send the event to the store, and in my case I send it to what is basically a middleman dispatcher.  My 
//      dispatcher forwards on the riot.EVT.finalMount.  Only one handler and only one time.
////////////////////////////////////////////////////////
//riot.control.trigger('riot-dispatch',riot.EVT.finalMount,'some data');
//riot.control.trigger('riot-dispatch','riot-route-dispatch-ack');
//riot.control.trigger(riot.EVT.startupStore.in.start);

riot.mount('startup');




