/*

var testComponent = {
  "components": [{
    "key": "typicode-component",
    "jsBundle": {
      "path": "/partial/typicode_component/bundle.js"
    },
    "cssBundle": {
      "path": "/partial/typicode_component/styles.css"
    },

    "trigger": {
      "onLoad": [{
        "event": "SidebarStore:sidebar-add-item",
        "data": {
          "title": "My Components Page",
          "route": "my-component-page/home"
        }
      }],
      "onUnload": [{
        "event": "SidebarStore:sidebar-remove-item",
        "data": {
          "title": "My Components Page"
        }
      }, {
        "event": "plugin-unregistration",
        "data": {
          "name": "typicode-component"
        }
      }]
    },
    "routeLoad": {
      "route": "/my-component-page.."
    },
    "state": {
      "loaded": false
    }
  }]
};

riot.control.trigger('init-component-loader-store');
riot.control.trigger('add-dynamic-component',testComponent);

*/
import DeepFreeze from '../utils/deep-freeze.js';
import Validator from '../utils/validators.js';
import DynamicJsCssLoader from '../dynamic-jscss-loader.js';

class Constants {}
Constants.NAME = 'component-loader-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    addDynamicComponent: 'add-dynamic-component',
    addDynamicComponents: 'add-dynamic-components',
    loadDynamicComponent: 'load-dynamic-component',
    unloadDynamicComponent: 'unload-dynamic-component',

    pluginRegistered: 'plugin-registered',
    pluginUnregistered: 'plugin-unregistered'

  },
  out: {
    allComponentsLoadComplete: 'all-components-load-complete',
    componentLoaderStoreStateUpdated: 'component-loader-store-state-updated'
  }
};

DeepFreeze.freeze(Constants);

export default class ComponentLoaderStore {

  static get constants() {
    return Constants;
  }

  constructor(dynamicJsCssLoader) {
    Validator.validateType(dynamicJsCssLoader, DynamicJsCssLoader, 'dynamicJsCssLoader');
    this.dynamicJsCssLoader = dynamicJsCssLoader;

    riot.observable(this);
    this._components = new Set();
    riot.state.componentLoaderState = {};
    this.state = riot.state.componentLoaderState;
    this._bound = false;
    this.bindEvents();
  }

  bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.loadDynamicComponent, this._onLoadDynamicComponent);
      this.on(Constants.WELLKNOWN_EVENTS.in.unloadDynamicComponent, this._onUnloadDymanicComponent);

      this.on(Constants.WELLKNOWN_EVENTS.in.addDynamicComponent, this._onAddDynamicComponent);
      this.on(Constants.WELLKNOWN_EVENTS.in.addDynamicComponents, this._onAddDynamicComponents);

      this.on(Constants.WELLKNOWN_EVENTS.in.pluginRegistered, this._onPluginRegistered);
      this.on(Constants.WELLKNOWN_EVENTS.in.pluginUnregistered, this._onPluginUnregistered);

      this._bound = !this._bound;
    }
  }
  unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.loadDynamicComponent, this._onLoadDynamicComponent);
      this.off(Constants.WELLKNOWN_EVENTS.in.unloadDynamicComponent, this._onUnloadDymanicComponent);

      this.off(Constants.WELLKNOWN_EVENTS.in.addDynamicComponent, this._onAddDynamicComponent);
      this.off(Constants.WELLKNOWN_EVENTS.in.addDynamicComponents, this._onAddDynamicComponents);

      this.off(Constants.WELLKNOWN_EVENTS.in.pluginRegistered, this._onPluginRegistered);
      this.off(Constants.WELLKNOWN_EVENTS.in.pluginUnregistered, this._onPluginUnregistered);

      this._bound = !this._bound;
    }
  }

  _commitToState() {

    var componentsArray = Array.from(this._components);

    this.state.components = new Map(componentsArray.map((i) => [i.key, i]));
    this.trigger(Constants.WELLKNOWN_EVENTS.out.componentLoaderStoreStateUpdated);
  }
  _addComponent(component) {

    if (this._findComponent(component.key) == null) {
      this._components.add(component);
      this.dynamicJsCssLoader._preFetchExternalJsCss(component);
      this._commitToState();
    }
  }
  _findComponent(key) {

    for (let item of this._components) {
      if (item.key === key) {
        return item;
      }
    }
    return null;
  }
  _onPluginRegistered(registration) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.pluginRegistered, registration);
    let component = this._findComponent(registration.name);

    if (component) {
      for (let triggerItem of component.trigger.onLoad) {
        riot.control.trigger(triggerItem.event, triggerItem.data);
      }
      component.state.loaded = true;
      this.trigger(Constants.WELLKNOWN_EVENTS.out.componentLoaderStoreStateUpdated);
    }
  }
  _onPluginUnregistered(registration) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.pluginUnregistered, registration);
    let component = this._findComponent(registration.name);

    if (component) {
      for (let triggerItem of component.trigger.onUnload) {
        riot.control.trigger(triggerItem.event, triggerItem.data);
      }
      component.state.loaded = false;
      this.trigger(Constants.WELLKNOWN_EVENTS.out.componentLoaderStoreStateUpdated);
    }
  }

  _onAddDynamicComponent(component) {

    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.addDynamicComponent, component);
    let comp = this._findComponent(component.key);

    if (comp == null) {
      this._addComponent(component);

      if (this._allLoadedCompleteCheck() === true) {
                // need to trigger a load complete just on a simple add so that auto route loading can work
        riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.allComponentsLoadComplete);
      }
    }
  }

  _onAddDynamicComponents(components, ack) {

    if (components) {
      console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.addDynamicComponents, components);
      for (let component of components) {
        let comp = this._findComponent(component.key);

        if (comp === null) {
          this._addComponent(component);
        }
      }
    }
    riot.control.trigger(ack.evt, ack);
  }

  _onLoadDynamicComponent(key) {

    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.loadDynamicComponent, key);
    let component = this._findComponent(key);

    if (component != null && component.state.loaded !== true) {
      this.dynamicJsCssLoader.loadExternalJsCss(component);

    }
  }
  _onUnloadDymanicComponent(key) {

    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.unloadDynamicComponent, key);
    let component = this._findComponent(key);

    if (component != null && component.state.loaded === true) {
      // need to cleanup the routes and stores before we can unload the JS.
      // 1. plugin-registration-store first.

      riot.control.trigger(riot.EVT.pluginRegistrationStore.in.pluginUnregistration, {
        'name': key
      });
    }
  }

  _allLoadedCompleteCheck() {

    var result = true;

    for (let item of this._components) {
      if (item.state.loaded === true && item.state.loadedComplete === false) {
        result = false;
        break;
      }
    }
    return result;
  }

}

