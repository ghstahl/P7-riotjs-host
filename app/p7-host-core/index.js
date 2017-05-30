import 'riot';
import route 						          from 'riot-route';
import RiotControl 					      from 'riotcontrol';
import RandomString 				      from './utils/random-string.js';
import RiotRouteExtension 			  from './extensions/riot-route-extension.js';
import ProgressStore from './stores/progress-store.js';
import DynamicJsCssLoaderStore from './stores/dynamic-jscss-loader-store.js';
import ComponentLoaderStore     	from './stores/component-loader-store.js';
import ErrorStore               	from './stores/error-store.js';
import FetchStore           		  from './stores/fetch-store.js';
import LocalStorageStore         	from './stores/localstorage-store.js';
import RiotControlStore from './stores/riotcontrol-store.js';
import RouteStore 				        from './stores/route-store.js';
import PluginRegistrationStore 		from './stores/plugin-registration-store.js';
import StartupStore 				      from './stores/startup-store.js';
import RiotControlDispatchStore 	from './stores/riotcontrol-dispatch-store.js';
import MasterEventTable from './master-event-table.js';

import './components/startup.tag';

export default class P7HostCore {

  constructor() {
    this._masterEventTable = new MasterEventTable();
    this._name = 'P7HostCore';
    window.riot = riot;  // TODO: ask Zeke about this
    riot.route = route;
    riot.control = RiotControl;
    riot.state = {};
  }

  get name() {
    return this._name;
  }

  Initialize() {

    riot.routeState = {};

    let randomString = new RandomString();
    let hash = randomString.randomHash();

    riot.state = {
      _internal: {
        hash: hash
      },
      error: {code: 'unknown'},
      route: {
        defaultRoute: 'main/home'
      }
    };
    this._riotRouteExtension 			= new RiotRouteExtension();

    this._progressStore 				= new ProgressStore();
    this._dynamicJsCssLoaderStore 		= new DynamicJsCssLoaderStore();
    this._componentLoaderStore 			= new ComponentLoaderStore();
    this._errorStore 					= new ErrorStore();
    this._fetchStore 					= new FetchStore();
    this._localStorageStore 			= new LocalStorageStore();
    this._riotControlStore 				= new RiotControlStore();
    this._routeStore 					= new RouteStore();
    this._pluginRegistrationStore 		= new PluginRegistrationStore(this._riotControlStore,
                                                                    this._dynamicJsCssLoaderStore,
                                                                    this._componentLoaderStore);
    this._riotControlDispatchStore 		= new RiotControlDispatchStore();
    this._startupStore 					= new StartupStore();

    riot.control.addStore(this._progressStore);
    riot.control.addStore(this._dynamicJsCssLoaderStore);
    riot.control.addStore(this._componentLoaderStore);
    riot.control.addStore(this._errorStore);
    riot.control.addStore(this._fetchStore);
    riot.control.addStore(this._localStorageStore);
    riot.control.addStore(this._riotControlStore);
    riot.control.addStore(this._routeStore);
    riot.control.addStore(this._pluginRegistrationStore);
    riot.control.addStore(this._riotControlDispatchStore);
    riot.control.addStore(this._startupStore);

    return riot;
  }
}

