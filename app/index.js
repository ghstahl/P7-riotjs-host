
// import 'bootswatch/slate/bootstrap.css';
// import 'bootstrap';
import './css/index.css';
import './components/my-next-startup.tag';
import './app.tag';
//import FetchWrapper from './fetch-wrapper.js';
//let fetchWrapper = new FetchWrapper();
/*
import P7HostCore from './p7-host-core/index.js';
*/
import P7HostCore from '../lib/P7HostCore.js';


let p7HostCore = new P7HostCore(riot);

p7HostCore.Initialize();
riot.state.route.defaultRoute = '/main/home';
riot.state.sidebar = {
  touch: 0,
  items: [
			{ title: 'Home', route: '/main/home'},
			{ title: 'Projects', route: '/main/projects'}
  ]
};

// Add the mixings
// //////////////////////////////////////////////////////
import OptsMixin from './mixins/opts-mixin.js';
riot.mixin('opts-mixin', OptsMixin);

// Add the stores
// //////////////////////////////////////////////////////

import NextConfigStore from './stores/next-config-store.js';
riot.EVT.nextConfigStore = NextConfigStore.constants.WELLKNOWN_EVENTS;
let nextConfigStore = new NextConfigStore();

import SidebarStore 				from './stores/sidebar-store.js';
let sidebarStore = new SidebarStore();

riot.control.addStore(nextConfigStore);
riot.control.addStore(sidebarStore);

let testComponent = {
  key: 'typicode-component',
  path: '/partial/typicode_component/bundle.js',
  type: 'js',
  trigger: {
    onLoad: [{
      event: 'SidebarStore:sidebar-add-item',
      data: {
        title: 'My Components Page',
        route: 'my-component-page/home'
      }
    }
    ],
    onUnload: [{
      event: 'SidebarStore:sidebar-remove-item',
      data: {title: 'My Components Page'}
    }, {
      event: 'plugin-unregistration',
      data: {name: 'typicode-component'}
    }
    ]
  },
  routeLoad: {
    route: '/my-component-page..'
  },
  state: {
    loaded: false
  }
};

riot.control.trigger('init-component-loader-store');
// riot.control.trigger('add-dynamic-component',testComponent);

// riot.mount('app');

// riot.control.trigger('dynamic-jscss-loader-init');
// put Router Last
// //////////////////////////////////////////////////////

// Finally dispatch the first event.
// //////////////////////////////////////////////////////
// NOTE: DON'T DO the following;
//		RiotControl.trigger(riot.EVT.finalMount,'data');
// REASON:
//      RiotControl events need to go to stores, and if you directly send the event to a tag
//      you will get as many callbacks to the tag as there were stores.  If you have 3 random stores, which
//      have nothing to do with the riot.EVT.finalMount event, you will still get 3 calls to the handler.
// SOLUTION:
// 		Send the event to the store, and in my case I send it to what is basically a middleman dispatcher.  My
//      dispatcher forwards on the riot.EVT.finalMount.  Only one handler and only one time.
// //////////////////////////////////////////////////////
// riot.control.trigger('riot-dispatch',riot.EVT.finalMount,'some data');
// riot.control.trigger(riot.EVT.startupStore.in.start);

riot.mount('startup');

