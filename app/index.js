import 'bootswatch/slate/bootstrap.css';
import "./css/index.css";
import './event-helper';
import './components/startup.tag';
import './components/my-next-startup.tag';

import route from 'riot-route';

riot.route = route;
riot.routeState = {};
riot.state = {
	error:{code:'unknown'},
	route:{
		defaultRoute:'/main/home/'
	},
	sidebar:{
		touch:0,
		items:[
			{ title : 'Home', route : '/main/home'},
			{ title : 'Projects', route : '/main/projects'}
		]
	}
};
// Put RiotControl first in the startup flow
import RiotControl from 'riotcontrol';
riot.control = RiotControl;
window.riot = riot;

import RiotRouteExtension            	from './extensions/riot-route-extension.js';
new RiotRouteExtension();

// Add the mixings
////////////////////////////////////////////////////////
import OptsMixin                            from './mixins/opts-mixin.js'
riot.mixin("opts-mixin",OptsMixin);


// Add the stores
////////////////////////////////////////////////////////
import ProgressStore            	from './stores/progress-store.js';
riot.control.addStore(new ProgressStore());

import LocalStorageStore         	from './stores/localstorage-store.js';
riot.control.addStore(new LocalStorageStore());

import RiotControlStore 			from './stores/RiotControlStore.js';
riot.control.addStore(new RiotControlStore());

import RouteStore 					from './stores/RouteStore.js';
riot.control.addStore(new RouteStore());

import ErrorStore            		from './stores/error-store.js';
riot.control.addStore(new ErrorStore());

import RouteContributionStore 		from './stores/route-contribution-store.js';
riot.control.addStore(new RouteContributionStore());

import DynamicJsCssLoaderStore 		from './stores/dynamic-jscss-loader-store.js';
riot.control.addStore(new DynamicJsCssLoaderStore());

import PluginRegistrationStore 		from './stores/plugin-registration-store.js';
riot.control.addStore(new PluginRegistrationStore());

import ComponentLoaderStore 		from './stores/component-loader-store.js';
riot.control.addStore(new ComponentLoaderStore());

import StartupStore 				from './stores/startup-store.js';
riot.control.addStore(new StartupStore());


import RiotControlDispatcherStore 	from './stores/RiotControlDispatcherStore.js';
riot.control.addStore(new RiotControlDispatcherStore());

import FetchStore 					from './stores/fetch-store.js';
riot.control.addStore(new FetchStore());




import ItemStore 					from './stores/itemstore.js';
riot.control.addStore(new ItemStore());

import SidebarStore 				from './stores/sidebar-store.js';
riot.control.addStore(new SidebarStore());

import NextConfigStore         from './stores/next-config-store.js';
riot.control.addStore(new NextConfigStore());


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




