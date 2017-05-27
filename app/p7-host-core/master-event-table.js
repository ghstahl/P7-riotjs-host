
import ProgressStore            from './stores/progress-store.js';
import FetchStore               from './stores/fetch-store.js';
import DynamicJsCssLoaderStore  from './stores/dynamic-jscss-loader-store.js';
import ComponentLoaderStore     from './stores/component-loader-store.js';
import LocalStorageStore        from './stores/localstorage-store.js';
import ErrorStore               from './stores/error-store.js';
import RouteStore               from './stores/route-store.js';
import RiotControlStore         from './stores/riotcontrol-store.js';
import RiotControlDispatchStore from './stores/riotcontrol-dispatch-store.js';
import PluginRegistrationStore  from './stores/plugin-registration-store.js';
import StartupStore             from './stores/startup-store.js';
import Router                   from './router.js';

var namespace = 'P7HostCore';
riot.EVT = {};


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
riot.EVT.router                     = Router.getConstants().WELLKNOWN_EVENTS;


