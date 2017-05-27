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
import DeepFreeze from './deep-freeze.js';

import DynamicJsCssLoaderStore  from './dynamic-jscss-loader-store.js'
const DJCWKE = DynamicJsCssLoaderStore.getConstants().WELLKNOWN_EVENTS;

class Constants {}
Constants.NAME = 'component-loader-store';
Constants.NAMESPACE = Constants.NAME+':';
Constants.WELLKNOWN_EVENTS = { 
  in : {
    addDynamicComponent: 'add-dynamic-component',
    addDynamicComponents: 'add-dynamic-components',
    loadDynamicComponent: 'load-dynamic-component',
    unloadDynamicComponent: 'unload-dynamic-component',
    componentLoadComplete: 'component-load-complete',
    componentUnloadComplete:'component-unload-complete',
    loadExternalJsCssAck: DJCWKE.out.loadExternalJsCssAck,
    unloadExternalJsCssAck: DJCWKE.out.unloadExternalJsCssAck
  },
  out: {
    allComponentsLoadComplete: 'all-components-load-complete',
    componentLoaderStoreStateUpdated: 'component-loader-store-state-updated',
    loadExternalJsCss: DJCWKE.in.loadExternalJsCss,
    unloadExternalJsCss: DJCWKE.in.unloadExternalJsCss
   
  }
};

DeepFreeze.freeze(Constants);

class ComponentLoaderStore {

    static getConstants(){
        return Constants;
    }

    constructor() {
        riot.observable(this);
        this._components = new Set();
        riot.state.componentLoaderState = {}
        this.state = riot.state.componentLoaderState;
        this._bound = false;
        this.bindEvents();
    }

    bindEvents() {
        if(this._bound == true){
            return;
        }

        this.on(Constants.WELLKNOWN_EVENTS.in.loadDynamicComponent, this._onLoadDynamicComponent);
        this.on(Constants.WELLKNOWN_EVENTS.in.unloadDynamicComponent, this._onUnloadDymanicComponent);

        this.on(Constants.WELLKNOWN_EVENTS.in.addDynamicComponent, this._onAddDynamicComponent);
        this.on(Constants.WELLKNOWN_EVENTS.in.addDynamicComponents, this._onAddDynamicComponents);


        this.on(Constants.WELLKNOWN_EVENTS.in.loadExternalJsCssAck, this._onLoadExternalJsCssAck);
        this.on(Constants.WELLKNOWN_EVENTS.in.unloadExternalJsCssAck, this._onUnloadExternalJsCssAck);

        this.on(Constants.WELLKNOWN_EVENTS.in.componentLoadComplete, this._onComponentLoadComplete)
        this.on(Constants.WELLKNOWN_EVENTS.in.componentUnloadComplete, this._onComponentUnloadComplete)
        this._bound = true;
    }
    unbindEvents() {
        if(this._bound == true){
            return;
        }

        this.off(Constants.WELLKNOWN_EVENTS.in.loadDynamicComponent, this._onLoadDynamicComponent);
        this.off(Constants.WELLKNOWN_EVENTS.in.unloadDynamicComponent, this._onUnloadDymanicComponent);

        this.off(Constants.WELLKNOWN_EVENTS.in.addDynamicComponent, this._onAddDynamicComponent);
        this.off(Constants.WELLKNOWN_EVENTS.in.addDynamicComponents, this._onAddDynamicComponents);


        this.off(Constants.WELLKNOWN_EVENTS.in.loadExternalJsCssAck, this._onLoadExternalJsCssAck);
        this.off(Constants.WELLKNOWN_EVENTS.in.unloadExternalJsCssAck, this._onUnloadExternalJsCssAck);

        this.off(Constants.WELLKNOWN_EVENTS.in.componentLoadComplete, this._onComponentLoadComplete)
        this.off(Constants.WELLKNOWN_EVENTS.in.componentUnloadComplete, this._onComponentUnloadComplete)
        this._bound = true;
    }

    _commitToState() {
        
        var componentsArray = Array.from(this._components);
        this.state.components = new Map(componentsArray.map((i) => [i.key, i]));
        this.trigger(Constants.WELLKNOWN_EVENTS.out.componentLoaderStoreStateUpdated);
    }
    _addComponent(component) {
        
        if (this._findComponent(component.key) == null) {
            this._components.add(component);
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
    _onLoadExternalJsCssAck(result) {
        
        console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.loadExternalJsCssAck, result)

        var component = this._findComponent(result.component.key);
        if (component != null) {
            // this is ours
            if (result.state === true) {
                for (let triggerItem of component.trigger.onLoad) {
                    riot.control.trigger(triggerItem.event, triggerItem.data);
                }
                component.state.loaded = true;
                 
            } else {
                console.error(result.error);
            }
        }
    }

    _onUnloadExternalJsCssAck(result) {
        
        console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.unloadExternalJsCssAck, result)
        var key = result.component.key;
        var component = this._findComponent(key);
        if (component != null) {
            // this is ours
            if (result.state === true) {
                for (let triggerItem of component.trigger.onUnload) {
                    riot.control.trigger(triggerItem.event, triggerItem.data);
                }
                component.state.loaded = false;
                riot.control.trigger(Constants.WELLKNOWN_EVENTS.in.componentUnloadComplete,key);
                 
            } else {
                console.error(result.error);
            }
        }
    }
    _onAddDynamicComponent(component) {
        
        console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.addDynamicComponent, component)
        var comp = this._findComponent(component.key);
        if (comp == null) {
            this._addComponent(component);
            
            if (this._allLoadedCompleteCheck() == true) {
                // need to trigger a load complete just on a simple add so that auto route loading can work
                riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.allComponentsLoadComplete);
            }
        }
    }
    
    _onAddDynamicComponents(components,ack) {
        
        if(components){
          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.addDynamicComponents, components)
          for(let component of components){
            var comp = this._findComponent(component.key);
            if (comp == null) {
                this._addComponent(component);
            }
          }
        }
        riot.control.trigger(ack.evt,ack);
    }

    _onLoadDynamicComponent(key) {
        
        console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.loadDynamicComponent, key)
        var component = this._findComponent(key);
        if (component != null && component.state.loaded != true) {
            riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.loadExternalJsCss, component);
        }
    }
    _onUnloadDymanicComponent(key) {
        
        console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.unloadDynamicComponent, key)
        var component = this._findComponent(key);
        if (component != null && component.state.loaded == true) {
            riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.unloadExternalJsCss, component);
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
    _onComponentLoadComplete(key) {
        
        console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.componentLoadComplete, key)
        var component = this._findComponent(key);
        if (component != null && component.state.loaded == true) {
            component.state.loadedComplete = true;
            if (this._allLoadedCompleteCheck() == true) {
                riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.allComponentsLoadComplete);
            }
        }
    }
    _onComponentUnloadComplete(key) {
        
        console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.componentUnloadComplete, key)
        var component = this._findComponent(key);
        if (component != null) {
            component.state.loadedComplete = false;
            riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.allComponentsLoadComplete);
        }
    }

    

    
}
export default ComponentLoaderStore;
