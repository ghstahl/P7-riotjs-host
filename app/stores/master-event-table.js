
import ProgressStore            from './progress-store.js';
import FetchStore               from './fetch-store.js';
import DynamicJsCssLoaderStore  from './dynamic-jscss-loader-store.js';
import ComponentLoaderStore     from './component-loader-store.js';
import LocalStorageStore        from './localstorage-store.js';
import ErrorStore               from './error-store.js';
import RouteStore               from './route-store.js';
import RiotControlStore         from './riotcontrol-store.js';
import RiotControlDispatchStore from './riotcontrol-dispatch-store.js';
import PluginRegistrationStore  from './plugin-registration-store.js';
import StartupStore             from './startup-store.js';
 
var namespace = 'P7HostCore';
riot.EVT = {
 
	router:{
		out:{
			contributeRoutes: 'contribute-routes',
	        contributeCatchAllRoute: 'contribute-catchall-route'
	    }
	},
	loadItems : 'load_items',
	loadItemsSuccess : 'load_items_success',

	contributeRoutes: 'contribute-routes',
	contributeCatchAllRoute: 'contribute-catchall-route',
	loadView:'riot-route-load-view'

};


riot.EVT.progressStore              = ProgressStore.getConstants().WELLKNOWN_EVENTS;
riot.EVT.routeStore                 = RouteStore.getConstants().WELLKNOWN_EVENTS;
riot.EVT.dynamicJsCssLoaderStore    = DynamicJsCssLoaderStore.getConstants().WELLKNOWN_EVENTS;
riot.EVT.componentLoaderStore       = ComponentLoaderStore.getConstants().WELLKNOWN_EVENTS;
riot.EVT.errorStore                 = ErrorStore.getConstants().WELLKNOWN_EVENTS;
riot.EVT.fetchStore                 = FetchStore.getConstants().WELLKNOWN_EVENTS;
riot.EVT.localStorageStore          = LocalStorageStore.getConstants().WELLKNOWN_EVENTS;
riot.EVT.riotControlStore           = RiotControlStore.getConstants().WELLKNOWN_EVENTS;
riot.EVT.riotControlDispatchStore   = RiotControlDispatchStore.getConstants().WELLKNOWN_EVENTS;
riot.EVT.pluginRegistrationStore    = PluginRegistrationStore.getConstants().WELLKNOWN_EVENTS;
riot.EVT.startupStore               = StartupStore.getConstants().WELLKNOWN_EVENTS;
