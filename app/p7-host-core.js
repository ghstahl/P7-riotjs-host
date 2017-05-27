import route 						from 'riot-route';
import RiotControl 					from 'riotcontrol';
import RandomString 				from './utils/random-string.js';
import RiotRouteExtension 			from './extensions/riot-route-extension.js';
import ProgressStore            	from './stores/progress-store.js';
import DynamicJsCssLoaderStore    	from './stores/dynamic-jscss-loader-store.js';
import ComponentLoaderStore     	from './stores/component-loader-store.js';
import ErrorStore               	from './stores/error-store.js';
import FetchStore           		from './stores/fetch-store.js';
import LocalStorageStore         	from './stores/localstorage-store.js';
import RiotControlStore 			from './stores/riotcontrol-store.js';
import RouteStore 					from './stores/route-store.js';
import RouteContributionStore 		from './stores/route-contribution-store.js';
import PluginRegistrationStore 		from './stores/plugin-registration-store.js';
import StartupStore 				from './stores/startup-store.js';
import RiotControlDispatchStore 	from './stores/riotcontrol-dispatch-store.js';
import './stores/master-event-table.js';
class P7HostCore{
  constructor(){
  	var self = this;
  	
  }
  Initialize() {
  	var self = this; 
	window.riot = riot; // need a way to not do this.  The plugins need to get access to the riot I own. 
	riot.route = route;
	riot.control = RiotControl;
	riot.routeState = {};

	var randomString = new RandomString();
	var hash = randomString.randomHash();

	riot.state = {
		_internal:{
			hash:hash,
		},
		error:{code:'unknown'},
		route:{
			defaultRoute:'main/home'
		}
	};
	self._riotRouteExtension 			= new RiotRouteExtension();

	self._progressStore 				= new ProgressStore();
	self._dynamicJsCssLoaderStore 		= new DynamicJsCssLoaderStore();
	self._componentLoaderStore 			= new ComponentLoaderStore();
	self._errorStore 					= new ErrorStore();
	self._fetchStore 					= new FetchStore();
	self._localStorageStore 			= new LocalStorageStore();
	self._riotControlStore 				= new RiotControlStore();
	self._routeStore 					= new RouteStore();
	self._pluginRegistrationStore 		= new PluginRegistrationStore();
	self._riotControlDispatchStore 		= new RiotControlDispatchStore();
	self._startupStore 					= new StartupStore();

	self._progressStore.bindEvents();
	self._dynamicJsCssLoaderStore.bindEvents();
	self._componentLoaderStore.bindEvents();
	self._errorStore.bindEvents();
	self._fetchStore.bindEvents();
	self._localStorageStore.bindEvents();
	self._riotControlStore.bindEvents();
	self._routeStore.bindEvents();
	self._pluginRegistrationStore.bindEvents();
	self._riotControlDispatchStore.bindEvents();
	self._startupStore.bindEvents();

	riot.control.addStore(self._progressStore);
	riot.control.addStore(self._dynamicJsCssLoaderStore);
	riot.control.addStore(self._componentLoaderStore);
	riot.control.addStore(self._errorStore);
	riot.control.addStore(self._fetchStore);
	riot.control.addStore(self._localStorageStore);
	riot.control.addStore(self._riotControlStore);
	riot.control.addStore(self._routeStore);
	riot.control.addStore(self._pluginRegistrationStore);
	riot.control.addStore(self._riotControlDispatchStore);
	riot.control.addStore(self._startupStore);

   }
}
export default P7HostCore;