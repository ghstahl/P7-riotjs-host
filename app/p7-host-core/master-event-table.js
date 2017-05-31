
import ProgressStore from './stores/progress-store.js';
import FetchStore from './stores/fetch-store.js';
import ComponentLoaderStore from './stores/component-loader-store.js';
import LocalStorageStore from './stores/localstorage-store.js';
import ErrorStore from './stores/error-store.js';
import RouteStore from './stores/route-store.js';
import RiotControlDispatchStore from './stores/riotcontrol-dispatch-store.js';
import PluginRegistrationStore from './stores/plugin-registration-store.js';
import StartupStore from './stores/startup-store.js';
import Router from './router.js';

export default class MasterEventTable {

  constructor() {
    riot.EVT = {};

    riot.EVT.progressStore = ProgressStore.constants.WELLKNOWN_EVENTS;
    riot.EVT.routeStore = RouteStore.constants.WELLKNOWN_EVENTS;
    riot.EVT.componentLoaderStore = ComponentLoaderStore.constants.WELLKNOWN_EVENTS;
    riot.EVT.errorStore = ErrorStore.constants.WELLKNOWN_EVENTS;
    riot.EVT.fetchStore = FetchStore.constants.WELLKNOWN_EVENTS;
    riot.EVT.localStorageStore = LocalStorageStore.constants.WELLKNOWN_EVENTS;
    riot.EVT.riotControlDispatchStore = RiotControlDispatchStore.constants.WELLKNOWN_EVENTS;
    riot.EVT.pluginRegistrationStore = PluginRegistrationStore.constants.WELLKNOWN_EVENTS;
    riot.EVT.startupStore = StartupStore.constants.WELLKNOWN_EVENTS;
    riot.EVT.router = Router.constants.WELLKNOWN_EVENTS;
  }
}

