(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("riot"), require("riot-route"), require("riotcontrol"), require("whatwg-fetch"));
	else if(typeof define === 'function' && define.amd)
		define("P7HostCore", ["riot", "riot-route", "riotcontrol", "whatwg-fetch"], factory);
	else if(typeof exports === 'object')
		exports["P7HostCore"] = factory(require("riot"), require("riot-route"), require("riotcontrol"), require("whatwg-fetch"));
	else
		root["P7HostCore"] = factory(root["riot"], root["riot-route"], root["riotcontrol"], root["whatwg-fetch"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_22__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// https://github.com/substack/deep-freeze

var DeepFreeze = function () {
  function DeepFreeze() {
    _classCallCheck(this, DeepFreeze);
  }

  DeepFreeze.freeze = function freeze(o) {
    Object.freeze(o);
    Object.getOwnPropertyNames(o).forEach(function (prop) {
      if (o.hasOwnProperty(prop) && o[prop] !== null && (_typeof(o[prop]) === 'object' || typeof o[prop] === 'function') && !Object.isFrozen(o[prop])) {
        DeepFreeze.freeze(o[prop]);
      }
    });
    return o;
  };

  return DeepFreeze;
}();

exports.default = DeepFreeze;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepFreeze = __webpack_require__(0);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml

/*
component:{
		key:'typicode-component',
		path:'/partial/bundle.js',
		type:'js'
	}
	or when unloading
component:{
		key:'typicode-component'
	}

events:{
	out:[
		{
			event:'load-external-jscss-ack',
			type:'riotcontrol'
			data:[
				{
			    	state:true,
			    	component:component
				},
				{
			    	state:false,
			    	component:component,
			    	error:"component already added!"
				}
			]
		},
		{
			event:'unload-external-jscss-ack',
			type:'riotcontrol'
			data:[
				{
			    	state:true,
			    	component:component
				},
				{
			    	state:false,
			    	component:component,
			    	error:"no entry found to remove!"
				}
			]
		}

	]

}

	*/


var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'dynamic-jscss-loader';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {},
  out: {}
};
_deepFreeze2.default.freeze(Constants);

var DynamicJsCssLoader = function () {
  DynamicJsCssLoader.getConstants = function getConstants() {
    return Constants;
  };

  function DynamicJsCssLoader() {
    _classCallCheck(this, DynamicJsCssLoader);

    riot.observable(this);
    this._componentsAddedSet = new Set();
    this._bound = false;
    this.bindEvents();
  }

  DynamicJsCssLoader.prototype.bindEvents = function bindEvents() {
    if (this._bound === false) {

      this._bound = !this._bound;
    }
  };

  DynamicJsCssLoader.prototype.unbindEvents = function unbindEvents() {
    if (this._bound === true) {

      this._bound = !this._bound;
    }
  };

  DynamicJsCssLoader.prototype._addComponent = function _addComponent(component) {
    if (this._findComponent(component) == null) {
      var mySet = this._componentsAddedSet;

      mySet.add(component);
    }
  };

  DynamicJsCssLoader.prototype._findComponent = function _findComponent(component) {
    var mySet = this._componentsAddedSet;

    for (var _iterator = mySet, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var item = _ref;

      if (item.key === component.key) {
        return item;
      }
    }
    return null;
  };

  DynamicJsCssLoader.prototype._deleteComponent = function _deleteComponent(component) {
    var mySet = this._componentsAddedSet;

    for (var _iterator2 = mySet, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var item = _ref2;

      if (item.key === component.key) {
        mySet.delete(item);
        break;
      }
    }
  };

  DynamicJsCssLoader.prototype.loadExternalJsCss = function loadExternalJsCss(component) {
    var addedCompoment = this._findComponent(component);

    if (addedCompoment == null) {
      this._loadExternalJsCss(component);
      this._addComponent(component);
      console.log('load-external-jscss', component);
    } else {
      console.error('file already added!', component);
    }
  };

  DynamicJsCssLoader.prototype._removeExternalByFile = function _removeExternalByFile(filename, filetype) {
    // determine element type to create nodelist from
    var targetelement = filetype === 'js' ? 'script' : filetype === 'css' ? 'link' : 'none';
    // determine corresponding attribute to test for
    var targetattr = filetype === 'js' ? 'src' : filetype === 'css' ? 'href' : 'none';
    var allsuspects = document.getElementsByTagName(targetelement);

    for (var i = allsuspects.length; i >= 0; i--) {
      // search backwards within nodelist for matching elements to remove
      if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) !== -1) {
        allsuspects[i].parentNode.removeChild(allsuspects[i]); // remove element by calling parentNode.removeChild()
        break;
      }
    }
  };

  DynamicJsCssLoader.prototype.unloadExternalJsCss = function unloadExternalJsCss(component) {
    var addedCompoment = this._findComponent(component);

    if (addedCompoment != null) {
      var jsBundle = component.jsBundle;
      var cssBundle = component.cssBundle;

      if (jsBundle && jsBundle.path) {
        this._removeExternalByFile(jsBundle.path, 'js');
      }
      if (cssBundle && cssBundle.path) {
        this._removeExternalByFile(cssBundle.path, 'css');
      }
      this._deleteComponent(component);
    }
  };

  DynamicJsCssLoader.prototype._loadExternalJsCss = function _loadExternalJsCss(component) {
    var jsBundle = component.jsBundle;
    var cssBundle = component.cssBundle;

    if (jsBundle && jsBundle.path) {
      var fileref = document.createElement('script');

      fileref.setAttribute('type', 'text/javascript');
      fileref.setAttribute('src', jsBundle.path);
      if (typeof fileref !== 'undefined') {
        document.getElementsByTagName('head')[0].appendChild(fileref);
      }
    }
    if (cssBundle && cssBundle.path) {
      var _fileref = document.createElement('link');

      _fileref.setAttribute('rel', 'stylesheet');
      _fileref.setAttribute('type', 'text/css');
      _fileref.setAttribute('href', cssBundle.path);
      if (typeof _fileref !== 'undefined') {
        document.getElementsByTagName('head')[0].appendChild(_fileref);
      }
    }
  };

  return DynamicJsCssLoader;
}();

exports.default = DynamicJsCssLoader;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepFreeze = __webpack_require__(0);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _validators = __webpack_require__(14);

var _validators2 = _interopRequireDefault(_validators);

var _dynamicJscssLoader = __webpack_require__(1);

var _dynamicJscssLoader2 = _interopRequireDefault(_dynamicJscssLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                          
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


var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

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

_deepFreeze2.default.freeze(Constants);

var ComponentLoaderStore = function () {
  ComponentLoaderStore.getConstants = function getConstants() {
    return Constants;
  };

  function ComponentLoaderStore(dynamicJsCssLoader) {
    _classCallCheck(this, ComponentLoaderStore);

    _validators2.default.validateType(dynamicJsCssLoader, _dynamicJscssLoader2.default, 'dynamicJsCssLoader');
    this.dynamicJsCssLoader = dynamicJsCssLoader;

    riot.observable(this);
    this._components = new Set();
    riot.state.componentLoaderState = {};
    this.state = riot.state.componentLoaderState;
    this._bound = false;
    this.bindEvents();
  }

  ComponentLoaderStore.prototype.bindEvents = function bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.loadDynamicComponent, this._onLoadDynamicComponent);
      this.on(Constants.WELLKNOWN_EVENTS.in.unloadDynamicComponent, this._onUnloadDymanicComponent);

      this.on(Constants.WELLKNOWN_EVENTS.in.addDynamicComponent, this._onAddDynamicComponent);
      this.on(Constants.WELLKNOWN_EVENTS.in.addDynamicComponents, this._onAddDynamicComponents);

      this.on(Constants.WELLKNOWN_EVENTS.in.pluginRegistered, this._onPluginRegistered);
      this.on(Constants.WELLKNOWN_EVENTS.in.pluginUnregistered, this._onPluginUnregistered);

      this._bound = !this._bound;
    }
  };

  ComponentLoaderStore.prototype.unbindEvents = function unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.loadDynamicComponent, this._onLoadDynamicComponent);
      this.off(Constants.WELLKNOWN_EVENTS.in.unloadDynamicComponent, this._onUnloadDymanicComponent);

      this.off(Constants.WELLKNOWN_EVENTS.in.addDynamicComponent, this._onAddDynamicComponent);
      this.off(Constants.WELLKNOWN_EVENTS.in.addDynamicComponents, this._onAddDynamicComponents);

      this.off(Constants.WELLKNOWN_EVENTS.in.pluginRegistered, this._onPluginRegistered);
      this.off(Constants.WELLKNOWN_EVENTS.in.pluginUnregistered, this._onPluginUnregistered);

      this._bound = !this._bound;
    }
  };

  ComponentLoaderStore.prototype._commitToState = function _commitToState() {

    var componentsArray = Array.from(this._components);

    this.state.components = new Map(componentsArray.map(function (i) {
      return [i.key, i];
    }));
    this.trigger(Constants.WELLKNOWN_EVENTS.out.componentLoaderStoreStateUpdated);
  };

  ComponentLoaderStore.prototype._addComponent = function _addComponent(component) {

    if (this._findComponent(component.key) == null) {
      this._components.add(component);
      this._commitToState();
    }
  };

  ComponentLoaderStore.prototype._findComponent = function _findComponent(key) {

    for (var _iterator = this._components, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var item = _ref;

      if (item.key === key) {
        return item;
      }
    }
    return null;
  };

  ComponentLoaderStore.prototype._onPluginRegistered = function _onPluginRegistered(registration) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.pluginRegistered, registration);
    var component = this._findComponent(registration.name);

    if (component) {
      for (var _iterator2 = component.trigger.onLoad, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var triggerItem = _ref2;

        riot.control.trigger(triggerItem.event, triggerItem.data);
      }
      component.state.loaded = true;
      this.trigger(Constants.WELLKNOWN_EVENTS.out.componentLoaderStoreStateUpdated);
    }
  };

  ComponentLoaderStore.prototype._onPluginUnregistered = function _onPluginUnregistered(registration) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.pluginUnregistered, registration);
    var component = this._findComponent(registration.name);

    if (component) {
      for (var _iterator3 = component.trigger.onUnload, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var triggerItem = _ref3;

        riot.control.trigger(triggerItem.event, triggerItem.data);
      }
      component.state.loaded = false;
      this.trigger(Constants.WELLKNOWN_EVENTS.out.componentLoaderStoreStateUpdated);
    }
  };

  ComponentLoaderStore.prototype._onAddDynamicComponent = function _onAddDynamicComponent(component) {

    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.addDynamicComponent, component);
    var comp = this._findComponent(component.key);

    if (comp == null) {
      this._addComponent(component);

      if (this._allLoadedCompleteCheck() === true) {
        // need to trigger a load complete just on a simple add so that auto route loading can work
        riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.allComponentsLoadComplete);
      }
    }
  };

  ComponentLoaderStore.prototype._onAddDynamicComponents = function _onAddDynamicComponents(components, ack) {

    if (components) {
      console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.addDynamicComponents, components);
      for (var _iterator4 = components, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) break;
          _ref4 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();
          if (_i4.done) break;
          _ref4 = _i4.value;
        }

        var component = _ref4;

        var comp = this._findComponent(component.key);

        if (comp === null) {
          this._addComponent(component);
        }
      }
    }
    riot.control.trigger(ack.evt, ack);
  };

  ComponentLoaderStore.prototype._onLoadDynamicComponent = function _onLoadDynamicComponent(key) {

    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.loadDynamicComponent, key);
    var component = this._findComponent(key);

    if (component != null && component.state.loaded !== true) {
      this.dynamicJsCssLoader.loadExternalJsCss(component);
    }
  };

  ComponentLoaderStore.prototype._onUnloadDymanicComponent = function _onUnloadDymanicComponent(key) {

    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.unloadDynamicComponent, key);
    var component = this._findComponent(key);

    if (component != null && component.state.loaded === true) {
      // need to cleanup the routes and stores before we can unload the JS.
      // 1. plugin-registration-store first.

      riot.control.trigger(riot.EVT.pluginRegistrationStore.in.pluginUnregistration, {
        'name': key
      });
    }
  };

  ComponentLoaderStore.prototype._allLoadedCompleteCheck = function _allLoadedCompleteCheck() {

    var result = true;

    for (var _iterator5 = this._components, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
      var _ref5;

      if (_isArray5) {
        if (_i5 >= _iterator5.length) break;
        _ref5 = _iterator5[_i5++];
      } else {
        _i5 = _iterator5.next();
        if (_i5.done) break;
        _ref5 = _i5.value;
      }

      var item = _ref5;

      if (item.state.loaded === true && item.state.loadedComplete === false) {
        result = false;
        break;
      }
    }
    return result;
  };

  return ComponentLoaderStore;
}();

exports.default = ComponentLoaderStore;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepFreeze = __webpack_require__(0);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by Herb on 9/27/2016.
                                                                                                                                                           */


var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'progress-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    inprogressDone: Constants.NAMESPACE + 'inprogress-done',
    inprogressStart: Constants.NAMESPACE + 'inprogress-start'
  },
  out: {
    progressStart: Constants.NAMESPACE + 'progress-start',
    progressCount: Constants.NAMESPACE + 'progress-count',
    progressDone: Constants.NAMESPACE + 'progress-done'
  }
};
_deepFreeze2.default.freeze(Constants);

var ProgressStore = function () {
  ProgressStore.getConstants = function getConstants() {
    return Constants;
  };

  function ProgressStore() {
    _classCallCheck(this, ProgressStore);

    riot.observable(this);
    this._count = 0;
    this._bound = false;
    this.bindEvents();
  }

  ProgressStore.prototype.bindEvents = function bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.inprogressStart, this._onInProgressStart);
      this.on(Constants.WELLKNOWN_EVENTS.in.inprogressDone, this._onInProgressDone);
      this._bound = !this._bound;
    }
  };

  ProgressStore.prototype.unbindEvents = function unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.inprogressStart, this._onInProgressStart);
      this.off(Constants.WELLKNOWN_EVENTS.in.inprogressDone, this._onInProgressDone);
      this._bound = !this._bound;
    }
  };

  ProgressStore.prototype._onInProgressStart = function _onInProgressStart() {
    if (this._count === 0) {
      this.trigger(Constants.WELLKNOWN_EVENTS.out.progressStart);
    }
    ++this._count;
    this.trigger(Constants.WELLKNOWN_EVENTS.out.progressCount, this._count);
  };

  ProgressStore.prototype._onInProgressDone = function _onInProgressDone() {
    if (this.count === 0) {
      // very bad.
      console.error(Constants.WELLKNOWN_EVENTS.in.inprogressDone, 'someone has their inprogress_done mismatched with thier inprogress_start');
    }
    if (this._count > 0) {
      --this._count;
    }
    this.trigger(Constants.WELLKNOWN_EVENTS.out.progressCount, this._count);
    if (this._count === 0) {
      this.trigger(Constants.WELLKNOWN_EVENTS.out.progressDone);
    }
  };

  return ProgressStore;
}();

exports.default = ProgressStore;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepFreeze = __webpack_require__(0);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'riotcontrol-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    riotContolAddStore: Constants.NAMESPACE + 'add-store',
    riotContolRemoveStore: Constants.NAMESPACE + 'remove-store'
  },
  out: {}
};
_deepFreeze2.default.freeze(Constants);

var RiotControlStore = function () {
  RiotControlStore.getConstants = function getConstants() {
    return Constants;
  };

  function RiotControlStore() {
    _classCallCheck(this, RiotControlStore);

    riot.observable(this);
    this._bound = false;
    this._stores = {};
    this.bindEvents();
  }

  RiotControlStore.prototype.bindEvents = function bindEvents() {
    if (this._bound === false) {
      this.on(riot.EVT.riotControlStore.in.riotContolAddStore, this._onAdd);
      this.on(riot.EVT.riotControlStore.in.riotContolRemoveStore, this._onRemove);
      this._bound = !this._bound;
    }
  };

  RiotControlStore.prototype.unbindEvents = function unbindEvents() {
    if (this._bound === true) {
      this.off(riot.EVT.riotControlStore.in.riotContolAddStore, this._onAdd);
      this.off(riot.EVT.riotControlStore.in.riotContolRemoveStore, this._onRemove);
      this._bound = !this._bound;
    }
  };

  RiotControlStore.prototype._onAdd = function _onAdd(name, store) {
    this._stores[name] = store;
    console.log(riot.EVT.riotControlStore.in.riotContolAddStore, store);
    riot.control.addStore(store);
  };

  RiotControlStore.prototype._onRemove = function _onRemove(name) {
    console.log(riot.EVT.riotControlStore.in.riotContolRemoveStore, name);
    var store = this._stores[name];

    while (riot.control._stores.indexOf(store) !== -1) {
      riot.control._stores.splice(riot.control._stores.indexOf(store), 1);
    }
  };

  return RiotControlStore;
}();

exports.default = RiotControlStore;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepFreeze = __webpack_require__(0);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'route-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    routeCatchallReset: 'route-catchall-reset',
    routeDispatch: 'riot-route-dispatch',
    contributeCatchAllRoute: 'contribute-catchall-route',
    riotRouteAddView: 'riot-route-add-view',
    riotRouteRemoveView: 'riot-route-remove-view',
    riotRouteLoadView: 'riot-route-load-view'
  },
  out: {
    riotRouteDispatchAck: 'riot-route-dispatch-ack'
  }
};
_deepFreeze2.default.freeze(Constants);

var RouteStore = function () {
  RouteStore.getConstants = function getConstants() {
    return Constants;
  };

  function RouteStore() {
    _classCallCheck(this, RouteStore);

    riot.observable(this);
    this._bound = false;
    this.postResetRoute = null;
    this.bindEvents();
  }

  RouteStore.prototype.bindEvents = function bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.contributeCatchAllRoute, this._onContributeCatchAllRoute);
      this.on(Constants.WELLKNOWN_EVENTS.in.routeDispatch, this._onRouteDispatch);
      this.on(Constants.WELLKNOWN_EVENTS.in.routeCatchallReset, this._onRouteCatchallReset);
      this.on(Constants.WELLKNOWN_EVENTS.in.riotRouteAddView, this._onRiotRouteAddView);
      this.on(Constants.WELLKNOWN_EVENTS.in.riotRouteRemoveView, this._onRiotRouteRemoveView);
      this.on(Constants.WELLKNOWN_EVENTS.in.riotRouteLoadView, this._onRiotRouteLoadView);
      this._bound = !this._bound;
    }
  };

  RouteStore.prototype.unbindEvents = function unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.contributeCatchAllRoute, this._onContributeCatchAllRoute);
      this.off(Constants.WELLKNOWN_EVENTS.in.routeDispatch, this._onRouteDispatch);
      this.off(Constants.WELLKNOWN_EVENTS.in.routeCatchallReset, this._onRouteCatchallReset);
      this.off(Constants.WELLKNOWN_EVENTS.in.riotRouteAddView, this._onRiotRouteAddView);
      this.off(Constants.WELLKNOWN_EVENTS.in.riotRouteRemoveView, this._onRiotRouteRemoveView);
      this.off(Constants.WELLKNOWN_EVENTS.in.riotRouteLoadView, this._onRiotRouteLoadView);
      this._bound = !this._bound;
    }
  };

  RouteStore.prototype._onContributeCatchAllRoute = function _onContributeCatchAllRoute(r) {
    var _this = this;

    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.contributeCatchAllRoute, r);
    if (riot.state.componentLoaderState && riot.state.componentLoaderState.components) {
      var _loop = function _loop() {
        if (_isArray) {
          if (_i >= _iterator.length) return 'break';
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) return 'break';
          _ref = _i.value;
        }

        var item = _ref;

        var component = item[1];

        if (component.state.loaded === false) {
          r(component.routeLoad.route, function () {
            console.log('catchall route handler of:', component.routeLoad.route);

            var path = riot.route.currentPath();

            _this.postResetRoute = path;
            riot.control.trigger(riot.EVT.componentLoaderStore.in.loadDynamicComponent, component.key);
          });
        }
      };

      for (var _iterator = riot.state.componentLoaderState.components, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        var _ret = _loop();

        if (_ret === 'break') break;
      }
    }

    r('/..', function () {
      console.log('route handler of /  ');
      riot.control.trigger(Constants.WELLKNOWN_EVENTS.in.routeDispatch, riot.state.route.defaultRoute);
    });
    if (this.postResetRoute != null) {
      var postResetRoute = this.postResetRoute;

      this.postResetRoute = null;
      riot.control.trigger('riot-route-dispatch', postResetRoute, true);
    }
  };

  RouteStore.prototype._onRouteDispatch = function _onRouteDispatch(route, force) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.routeDispatch, route);
    var current = riot.route.currentPath();

    var same = current === route;

    if (!same) {
      same = '/' + current === route;
    }
    if (!same) {
      riot.route(route);
    } else {
      if (force) {
        riot.route.exec();
      }
    }

    riot.routeState.route = route;
    this.trigger(Constants.WELLKNOWN_EVENTS.out.routeDispatchAck, route);
  };

  RouteStore.prototype._onRouteCatchallReset = function _onRouteCatchallReset() {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.routeCatchallReset);
    riot.router.resetCatchAll();
  };

  RouteStore.prototype._onRiotRouteAddView = function _onRiotRouteAddView(view) {
    console.log(Constants.NAME, 'riot-route-add-view', view);
    var s = this._viewsSet;

    s.add(view);
    riot.routeState.views = Array.from(s);
  };

  RouteStore.prototype._onRiotRouteRemoveView = function _onRiotRouteRemoveView(view) {
    console.log(Constants.NAME, 'riot-route-remove-view', view);
    var s = this._viewsSet;

    s.delete(view);
    riot.routeState.views = Array.from(s);
  };

  RouteStore.prototype._onRiotRouteLoadView = function _onRiotRouteLoadView(view) {
    console.log(Constants.NAME, 'riot-route-load-view', view);
    riot.router.loadView(view);
  };

  return RouteStore;
}();

exports.default = RouteStore;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepFreeze = __webpack_require__(0);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'router';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {},
  out: {}
};

_deepFreeze2.default.freeze(Constants);

var Router = function () {
  Router.getConstants = function getConstants() {
    return Constants;
  };

  function Router() {
    _classCallCheck(this, Router);

    // we need this to easily check the current route from every component
    riot.routeState.view = '';
    this.r = riot.route.create();
    this.resetCatchAll();
  }

  Router.prototype.resetCatchAll = function resetCatchAll() {
    this.r.stop();
    var mySet = riot.state.registeredPlugins;

    for (var _iterator = mySet, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var item = _ref;

      if (item.registrants && item.registrants.routeContributer) {
        item.registrants.routeContributer.contributeRoutes(this.r);
      }
    }
    this._contributeCatchAllRoute(this.r);
  };

  Router.prototype._contributeCatchAllRoute = function _contributeCatchAllRoute(r) {
    var _this = this;

    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.contributeCatchAllRoute, r);
    if (riot.state.componentLoaderState && riot.state.componentLoaderState.components) {
      var _loop = function _loop() {
        if (_isArray2) {
          if (_i2 >= _iterator2.length) return 'break';
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) return 'break';
          _ref2 = _i2.value;
        }

        var item = _ref2;

        var component = item[1];

        if (component.state.loaded === false) {
          r(component.routeLoad.route, function () {
            console.log('catchall route handler of:', component.routeLoad.route);

            var path = riot.route.currentPath();

            _this.postResetRoute = path;
            riot.control.trigger(riot.EVT.componentLoaderStore.in.loadDynamicComponent, component.key);
          });
        }
      };

      for (var _iterator2 = riot.state.componentLoaderState.components, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        var _ret = _loop();

        if (_ret === 'break') break;
      }
    }

    r('/..', function () {
      console.log('route handler of /  ');
      riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, riot.state.route.defaultRoute);
    });
    if (this.postResetRoute != null) {
      var postResetRoute = this.postResetRoute;

      this.postResetRoute = null;
      riot.control.trigger('riot-route-dispatch', postResetRoute, true);
    }
  };

  Router.prototype.loadView = function loadView(view) {
    if (this._currentView) {
      this._currentView.unmount(true);
    }
    riot.routeState.view = view;
    this._currentView = riot.mount('#riot-app', view)[0];
  };

  return Router;
}();

exports.default = Router;
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepFreeze = __webpack_require__(0);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _routeStore = __webpack_require__(5);

var _routeStore2 = _interopRequireDefault(_routeStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RSWKE = _routeStore2.default.getConstants().WELLKNOWN_EVENTS;

var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'error-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    errorCatchAll: Constants.NAMESPACE + 'catch-all:'
  },
  out: {
    routeDispatch: RSWKE.in.routeDispatch
  }
};
_deepFreeze2.default.freeze(Constants);

var ErrorStore = function () {
  ErrorStore.getConstants = function getConstants() {
    return Constants;
  };

  function ErrorStore() {
    _classCallCheck(this, ErrorStore);

    riot.observable(this);
    this._bound = false;
    this._error = {};
    this.bindEvents();
  }

  ErrorStore.prototype.bindEvents = function bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.errorCatchAll, this._onError);
      this._bound = !this._bound;
    }
  };

  ErrorStore.prototype.unbindEvents = function unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.errorCatchAll, this._onError);
      this._bound = !this._bound;
    }
  };

  ErrorStore.prototype._onError = function _onError(error) {
    console.log(this.name, Constants.WELLKNOWN_EVENTS.in.errorCatchAll, error);
    this._error = error;
    riot.state.error = error;
    riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.routeDispatch, '/error');
  };

  return ErrorStore;
}();

exports.default = ErrorStore;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(22);

var _deepFreeze = __webpack_require__(0);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _progressStore = __webpack_require__(3);

var _progressStore2 = _interopRequireDefault(_progressStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by Herb on 9/27/2016.
                                                                                                                                                           */


var PSWKE = _progressStore2.default.getConstants().WELLKNOWN_EVENTS;

var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'fetch-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    fetch: Constants.NAMESPACE + 'fetch'
  },
  out: {
    inprogressDone: PSWKE.in.inprogressDone,
    inprogressStart: PSWKE.in.inprogressStart
  }
};
_deepFreeze2.default.freeze(Constants);

var FetchStore = function () {
  FetchStore.getConstants = function getConstants() {
    return Constants;
  };

  function FetchStore() {
    _classCallCheck(this, FetchStore);

    riot.observable(this);
    this._bound = false;
    this.bindEvents();
  }

  FetchStore.prototype.bindEvents = function bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.fetch, this._onFetch);
      this._bound = !this._bound;
    }
  };

  FetchStore.prototype.unbindEvents = function unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.fetch, this._onFetch);
      this._bound = !this._bound;
    }
  };

  FetchStore.prototype._onFetch = function _onFetch(input, init, trigger) {
    var jsonFixup = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    console.log(Constants.WELLKNOWN_EVENTS.in.fetch, input, init, trigger, jsonFixup);

    // we are a json shop

    riot.control.trigger(riot.EVT.fetchStore.out.inprogressStart);
    if (jsonFixup === true) {
      if (!init) {
        init = {};
      }

      if (!init.credentials) {
        init.credentials = 'include';
      }

      if (!init.headers) {
        init.headers = {};
      }

      if (!init.headers['Content-Type']) {
        init.headers['Content-Type'] = 'application/json';
      }
      if (!init.headers['Accept']) {
        init.headers['Accept'] = 'application/json';
      }

      if (init.body) {
        var type = _typeof(init.body);

        if (type === 'object') {
          init.body = JSON.stringify(init.body);
        }
      }
    }

    var myTrigger = JSON.parse(JSON.stringify(trigger));

    fetch(input, init).then(function (response) {
      riot.control.trigger(riot.EVT.fetchStore.out.inprogressDone);
      var result = { response: response };

      if (response.status === 204) {
        result.error = 'Fire the person that returns this 204 garbage!';
        riot.control.trigger(myTrigger.name, result, myTrigger);
      }
      if (response.ok) {
        if (init.method === 'HEAD') {
          riot.control.trigger(myTrigger.name, result, myTrigger);
        } else {
          response.json().then(function (data) {
            console.log(data);
            result.json = data;
            result.error = null;
            riot.control.trigger(myTrigger.name, result, myTrigger);
          });
        }
      } else {
        riot.control.trigger(myTrigger.name, result, myTrigger);
      }
    }).catch(function (ex) {
      console.log('fetch failed', ex);
      self.error = ex;
      // todo: event out error to mytrigger
      riot.control.trigger(riot.EVT.fetchStore.out.inprogressDone);
    });
  };

  return FetchStore;
}();

exports.default = FetchStore;
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepFreeze = __webpack_require__(0);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by Herb on 9/27/2016.
                                                                                                                                                           */


var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'localstorage-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    localstorageSet: Constants.NAMESPACE + 'set',
    localstorageGet: Constants.NAMESPACE + 'get',
    localstorageRemove: Constants.NAMESPACE + 'remove',
    localstorageClear: Constants.NAMESPACE + 'clear'
  },
  out: {}
};
_deepFreeze2.default.freeze(Constants);

var LocalStorageStore = function () {
  LocalStorageStore.getConstants = function getConstants() {
    return Constants;
  };

  function LocalStorageStore() {
    _classCallCheck(this, LocalStorageStore);

    riot.observable(this);
    this._bound = false;
    this.bindEvents();
  }

  LocalStorageStore.prototype.bindEvents = function bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.localstorageSet, this._onSet);
      this.on(Constants.WELLKNOWN_EVENTS.in.localstorageGet, this._onGet);
      this.on(Constants.WELLKNOWN_EVENTS.in.localstorageRemove, this._onRemove);
      this.on(Constants.WELLKNOWN_EVENTS.in.localstorageClear, this._onClear);
      this._bound = !this._bound;
    }
  };

  LocalStorageStore.prototype.unbindEvents = function unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.localstorageSet, this._onSet);
      this.off(Constants.WELLKNOWN_EVENTS.in.localstorageGet, this._onGet);
      this.off(Constants.WELLKNOWN_EVENTS.in.localstorageRemove, this._onRemove);
      this.off(Constants.WELLKNOWN_EVENTS.in.localstorageClear, this._onClear);
      this._bound = !this._bound;
    }
  };
  /*
  {
      key:[string:required],
      data: [Object],
      trigger:[optional]{
          event:[string],
          riotControl:bool  // do a riotcontrol.trigger or just an observable trigger.
      }
  }
  */


  LocalStorageStore.prototype._onSet = function _onSet(query) {
    console.log(Constants.WELLKNOWN_EVENTS.in.localstorageSet, query);
    localStorage.setItem(query.key, JSON.stringify(query.data));
    if (query.trigger) {
      this.trigger(query.trigger); // in case you want an ack
    }
  };
  /*
     {
         key:'myKey',
         trigger:{
                 event:[string],
                 riotControl:bool  // do a riotcontrol.trigger or just an observable trigger.
          }
     }
  */


  LocalStorageStore.prototype._onGet = function _onGet(query) {
    console.log(Constants.WELLKNOWN_EVENTS.in.localstorageGet, query);
    var stored = localStorage.getItem(query.key);
    var data = null;

    if (stored && stored !== 'undefined') {
      data = JSON.parse(stored);
    }
    if (query.trigger.riotControl === true) {
      riot.control.trigger(query.trigger.event, data);
    } else {
      this.trigger(query.trigger.event, data);
    }
  };
  /*
   {
   key:'myKey'
   }
   */


  LocalStorageStore.prototype._onRemove = function _onRemove(query) {
    console.log(Constants.WELLKNOWN_EVENTS.in.localstorageRemove, query);
    localStorage.removeItem(query.key);
  };

  LocalStorageStore.prototype._onClear = function _onClear() {
    console.log(Constants.WELLKNOWN_EVENTS.in.localstorageClear);
    localStorage.clear();
  };

  return LocalStorageStore;
}();

exports.default = LocalStorageStore;
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepFreeze = __webpack_require__(0);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _validators = __webpack_require__(14);

var _validators2 = _interopRequireDefault(_validators);

var _riotcontrolStore = __webpack_require__(4);

var _riotcontrolStore2 = _interopRequireDefault(_riotcontrolStore);

__webpack_require__(6);

var _dynamicJscssLoader = __webpack_require__(1);

var _dynamicJscssLoader2 = _interopRequireDefault(_dynamicJscssLoader);

var _componentLoaderStore = __webpack_require__(2);

var _componentLoaderStore2 = _interopRequireDefault(_componentLoaderStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/*
var registerRecord = {
  name:'riotjs-partial-spa',
  views:[
    {view:'my-component-page'},
    {view:'typicode-user-detail'}
  ],
  stores:[
    {store: new TypicodeUserStore()}
  ],
  postLoadEvents:[
    {event:'typicode-init',data:{}}
  ],
  preUnloadEvents:[
    {event:'typicode-uninit',data:{}}
  ]
};
riot.control.trigger('plugin-registration',registerRecord);

*/


var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'plugin-registration-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    pluginRegistration: 'plugin-registration',
    pluginUnregistration: 'plugin-unregistration'
  },
  out: {
    pluginRegistered: 'plugin-registered',
    pluginUnregistered: 'plugin-unregistered'
  }
};
_deepFreeze2.default.freeze(Constants);

var PluginRegistrationStore = function () {
  PluginRegistrationStore.getConstants = function getConstants() {
    return Constants;
  };

  function PluginRegistrationStore(riotControlStore, dynamicJsCssLoader, componentLoaderStore) {
    _classCallCheck(this, PluginRegistrationStore);

    _validators2.default.validateType(riotControlStore, _riotcontrolStore2.default, 'riotControlStore');
    _validators2.default.validateType(dynamicJsCssLoader, _dynamicJscssLoader2.default, 'dynamicJsCssLoader');
    _validators2.default.validateType(componentLoaderStore, _componentLoaderStore2.default, 'componentLoaderStore');

    riot.observable(this);
    this.riotControlStore = riotControlStore;
    this.dynamicJsCssLoader = dynamicJsCssLoader;
    this.componentLoaderStore = componentLoaderStore;

    this._bound = false;
    this.bindEvents();
    riot.state.registeredPlugins = new Set();
  }

  PluginRegistrationStore.prototype.bindEvents = function bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.pluginRegistration, this._registerPlugin);
      this.on(Constants.WELLKNOWN_EVENTS.in.pluginUnregistration, this._unregisterPlugin);
      this._bound = !this._bound;
    }
  };

  PluginRegistrationStore.prototype.unbindEvents = function unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.pluginRegistration, this._registerPlugin);
      this.off(Constants.WELLKNOWN_EVENTS.in.pluginUnregistration, this._unregisterPlugin);
      this._bound = !this._bound;
    }
  };

  PluginRegistrationStore.prototype._findRegistration = function _findRegistration(registrationName) {

    var mySet = riot.state.registeredPlugins;

    for (var _iterator = mySet, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var item = _ref;

      if (item.name === registrationName) {
        return item;
      }
    }
    return null;
  };

  PluginRegistrationStore.prototype._removeRegistration = function _removeRegistration(registrationName) {

    var mySet = riot.state.registeredPlugins;

    for (var _iterator2 = mySet, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var item = _ref2;

      if (item.name === registrationName) {
        mySet.delete(item);
        break;
      }
    }
    return null;
  };

  PluginRegistrationStore.prototype._registerPlugin = function _registerPlugin(registration) {

    var foundRegistration = this._findRegistration(registration.name);

    if (foundRegistration === null) {

      // 1. Add the registration record
      riot.state.registeredPlugins.add(registration);

      // 2. Ready up the stores
      for (var i = 0; i < registration.stores.length; i++) {

        // 2.1 Tell the stores to START listening.  Doing a bind, which may not be neccessary
        //    but it has to match the unbind that I am doing later in the unregister.
        //    It is required to be implemented, even if it is a noop.
        registration.stores[i].store.bind();

        // 2.2 Add the stores
        registration.stores[i].name = registration.name + '-store-' + i; // need this for my own tracking
        this.riotControlStore._onAdd(registration.stores[i].name, registration.stores[i].store);
      }

      // 3. fire post load events
      //    NOTE: we do NOT fire unload events as they are async and these stores have to go
      for (var _i3 = 0; _i3 < registration.postLoadEvents.length; _i3++) {
        riot.control.trigger(registration.postLoadEvents[_i3].event, registration.postLoadEvents[_i3].data);
      }

      // 4. Rebuild the routes.
      riot.router.resetCatchAll(); // this rebuilds the routes, without the above nulled one

      // FINALLY. Tell the world that things have changed.
      riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.pluginRegistered, registration);
    } else {
      console.error(Constants.NAME, registration, 'plugin already registered!');
    }
  };

  PluginRegistrationStore.prototype._unregisterPlugin = function _unregisterPlugin(registration) {

    var foundRegistration = this._findRegistration(registration.name);

    if (foundRegistration === null) {
      console.error(Constants.NAME, registration, 'plugin already unregistered!');
    } else {
      // 0. We do NOT fire unregister events as the stores will be gone before any event can reach them

      // 1. Tell the router to drop all routes for this component.
      var component = this.componentLoaderStore._findComponent(foundRegistration.name);

      if (component && foundRegistration.registrants && foundRegistration.registrants.routeContributer) {
        component.state.loaded = false;
        foundRegistration.registrants.routeContributer = null; // get rid of the contributer.
        riot.router.resetCatchAll(); // this rebuilds the routes, without the above nulled one
      }

      // 2. Shutdown the stores
      for (var i = 0; i < foundRegistration.stores.length; i++) {

        // 2.1. Tell the store to STOP listening.
        foundRegistration.stores[i].store.unbind(); // stop listening

        // 2.2. Remove the store.
        this.riotControlStore._onRemove(foundRegistration.stores[i].name);
      }

      // 3. Unload the JSCSS stuff.
      this.dynamicJsCssLoader.unloadExternalJsCss(component);

      // 4. Remove the registration record
      this._removeRegistration(foundRegistration.name);

      // FINALLY. Tell the world that things have changed.
      riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.pluginUnregistered, registration);
    }
  };

  return PluginRegistrationStore;
}();

exports.default = PluginRegistrationStore;
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepFreeze = __webpack_require__(0);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'riotcontrol-dispatch-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    dispatch: Constants.NAMESPACE + 'dispatch'
  },
  out: {}
};
_deepFreeze2.default.freeze(Constants);

var RiotControlDispatchStore = function () {
  RiotControlDispatchStore.getConstants = function getConstants() {
    return Constants;
  };

  function RiotControlDispatchStore() {
    _classCallCheck(this, RiotControlDispatchStore);

    riot.observable(this);
    this._bound = false;
    this.bindEvents();
  }

  RiotControlDispatchStore.prototype.bindEvents = function bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.dispatch, this._onDispatch);
      this._bound = !this._bound;
    }
  };

  RiotControlDispatchStore.prototype.bindEvents = function bindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.dispatch, this._onDispatch);
      this._bound = !this._bound;
    }
  };

  RiotControlDispatchStore.prototype._onDispatch = function _onDispatch(event, data) {
    console.log(Constants.WELLKNOWN_EVENTS.in.dispatch, event, data);
    this.trigger(event, data);
  };

  return RiotControlDispatchStore;
}();

exports.default = RiotControlDispatchStore;
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepFreeze = __webpack_require__(0);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _router = __webpack_require__(6);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'startup-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    start: Constants.NAMESPACE + 'start',
    fetchConfig: Constants.NAMESPACE + 'fetch-config',
    fetchConfigResult: Constants.NAMESPACE + 'fetch-config-result',
    fetchConfigResult2: Constants.NAMESPACE + 'fetch-config-result2',
    componentsAdded: Constants.NAMESPACE + 'components-added'

  },
  out: {}
};

_deepFreeze2.default.freeze(Constants);

var StartupStore = function () {
  StartupStore.getConstants = function getConstants() {
    return Constants;
  };

  function StartupStore() {
    _classCallCheck(this, StartupStore);

    riot.observable(this);
    this._bound = false;
    this._startupComplete = false;
    this._done = false;
    this.bindEvents();
  }

  StartupStore.prototype.bindEvents = function bindEvents() {

    if (this._bound === false) {
      // ------------------------------------------------------------
      this.on(Constants.WELLKNOWN_EVENTS.in.start, this._onStart);

      // ------------------------------------------------------------
      this.on(Constants.WELLKNOWN_EVENTS.in.fetchConfig, this._onFetchConfig);

      // ------------------------------------------------------------
      this.on(Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2, this._onFetchConfigResult2);

      // ------------------------------------------------------------
      this.on(Constants.WELLKNOWN_EVENTS.in.fetchConfigResult, this._onFetchConfigResult);

      // ------------------------------------------------------------
      this.on(Constants.WELLKNOWN_EVENTS.in.componentsAdded, this._onComponentsAdded);

      this._bound = !this._bound;
    }
  };

  StartupStore.prototype.unbindEvents = function unbindEvents() {

    if (this._bound === true) {
      // ------------------------------------------------------------
      this.off(Constants.WELLKNOWN_EVENTS.in.start, this._onStart);

      // ------------------------------------------------------------
      this.off(Constants.WELLKNOWN_EVENTS.in.fetchConfig, this._onFetchConfig);

      // ------------------------------------------------------------
      this.off(Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2, this._onFetchConfigResult2);

      // ------------------------------------------------------------
      this.off(Constants.WELLKNOWN_EVENTS.in.fetchConfigResult, this._onFetchConfigResult);

      // ------------------------------------------------------------
      this.off(Constants.WELLKNOWN_EVENTS.in.componentsAdded, this._onComponentsAdded);

      this._bound = !this._bound;
    }
  };

  StartupStore.prototype._onComponentsAdded = function _onComponentsAdded(ack) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.componentsAdded, ack);
    riot.control.trigger(ack.ack.evt, ack.ack);
  };

  StartupStore.prototype._onFetchConfigResult = function _onFetchConfigResult(result, myTrigger) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfigResult, result, myTrigger);
    if (result.error || !result.response.ok) {
      riot.control.trigger(riot.EVT.errorStore.in.errorCatchAll, { code: 'startup-config1234' });
    } else {
      riot.control.trigger(riot.EVT.componentLoaderStore.in.addDynamicComponents, result.json.components, { evt: Constants.WELLKNOWN_EVENTS.in.componentsAdded,
        ack: myTrigger.ack });
    }
  };

  StartupStore.prototype._onFetchConfigResult2 = function _onFetchConfigResult2(result, myTrigger) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2, result, myTrigger);
  };

  StartupStore.prototype._onFetchConfig = function _onFetchConfig(path, ack) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfig, path);
    var url = path;
    var trigger = {
      name: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult,
      ack: ack
    };
    var trigger2 = {
      name: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2,
      ack: ack
    };

    riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, { method: 'HEAD' }, trigger2);
    riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, null, trigger);
  };

  StartupStore.prototype._onStart = function _onStart(nextTag) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.start, this._done, nextTag);
    if (this._done) {
      return;
    }

    if (!nextTag) {
      nextTag = 'app';
    }
    if (nextTag === 'app') {
      this._done = true;
      // only when the nextTag is 'app' do we engage the router.
      // 'app' is last
      riot.router = new _router2.default();
      riot.mount(nextTag);
      riot.route.start(true);
    } else {
      riot.mount(nextTag);
    }
  };

  return StartupStore;
}();

exports.default = StartupStore;
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }

  Validator.validateType = function validateType(obj, type, name) {
    if (!obj) {
      throw new Error(name + ': is NULL');
    }
    if (!(obj instanceof type)) {
      throw new Error(name + ': is NOT of type:' + type.name);
    }
  };

  return Validator;
}();

exports.default = Validator;
module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RiotRouteExtension = function RiotRouteExtension() {
  _classCallCheck(this, RiotRouteExtension);

  var self = this;

  self.name = 'RiotRouteExtension';
  self.namespace = self.name + ':';
  self.currentPath = '';

  self._defaultParser = function (path) {
    self.currentPath = path;
    return path.split(/[/?#]/);
  };
  self._getCurrentPath = function () {
    return self.currentPath;
  };
  riot.route.parser(self._defaultParser, null);
  riot.route.currentPath = self._getCurrentPath;
};

exports.default = RiotRouteExtension;
module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _progressStore = __webpack_require__(3);

var _progressStore2 = _interopRequireDefault(_progressStore);

var _fetchStore = __webpack_require__(8);

var _fetchStore2 = _interopRequireDefault(_fetchStore);

var _componentLoaderStore = __webpack_require__(2);

var _componentLoaderStore2 = _interopRequireDefault(_componentLoaderStore);

var _localstorageStore = __webpack_require__(9);

var _localstorageStore2 = _interopRequireDefault(_localstorageStore);

var _errorStore = __webpack_require__(7);

var _errorStore2 = _interopRequireDefault(_errorStore);

var _routeStore = __webpack_require__(5);

var _routeStore2 = _interopRequireDefault(_routeStore);

var _riotcontrolStore = __webpack_require__(4);

var _riotcontrolStore2 = _interopRequireDefault(_riotcontrolStore);

var _riotcontrolDispatchStore = __webpack_require__(11);

var _riotcontrolDispatchStore2 = _interopRequireDefault(_riotcontrolDispatchStore);

var _pluginRegistrationStore = __webpack_require__(10);

var _pluginRegistrationStore2 = _interopRequireDefault(_pluginRegistrationStore);

var _startupStore = __webpack_require__(12);

var _startupStore2 = _interopRequireDefault(_startupStore);

var _router = __webpack_require__(6);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MasterEventTable = function MasterEventTable() {
  _classCallCheck(this, MasterEventTable);

  riot.EVT = {};

  riot.EVT.progressStore = _progressStore2.default.getConstants().WELLKNOWN_EVENTS;
  riot.EVT.routeStore = _routeStore2.default.getConstants().WELLKNOWN_EVENTS;
  riot.EVT.componentLoaderStore = _componentLoaderStore2.default.getConstants().WELLKNOWN_EVENTS;
  riot.EVT.errorStore = _errorStore2.default.getConstants().WELLKNOWN_EVENTS;
  riot.EVT.fetchStore = _fetchStore2.default.getConstants().WELLKNOWN_EVENTS;
  riot.EVT.localStorageStore = _localstorageStore2.default.getConstants().WELLKNOWN_EVENTS;
  riot.EVT.riotControlStore = _riotcontrolStore2.default.getConstants().WELLKNOWN_EVENTS;
  riot.EVT.riotControlDispatchStore = _riotcontrolDispatchStore2.default.getConstants().WELLKNOWN_EVENTS;
  riot.EVT.pluginRegistrationStore = _pluginRegistrationStore2.default.getConstants().WELLKNOWN_EVENTS;
  riot.EVT.startupStore = _startupStore2.default.getConstants().WELLKNOWN_EVENTS;
  riot.EVT.router = _router2.default.getConstants().WELLKNOWN_EVENTS;
};

exports.default = MasterEventTable;
module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RandomString = function RandomString() {
  _classCallCheck(this, RandomString);

  var self = this;

  self.name = 'RandomString';
  self.namespace = self.name + ':';
  self.generateRandomString = function (length) {
    if (length && length > 16) {
      length = 16;
    } else {
      length = 16;
    }

    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  self.hashString = function (str) {
    var hash = 5381;
    var i = str.length;

    while (i) {
      hash = hash * 33 ^ str.charCodeAt(--i);
    }
    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
    * integers. Since we want the results to be always positive, convert the
    * signed int to an unsigned by doing an unsigned bitshift. */
    return hash >>> 0;
  };
  self.randomHash = function (length) {
    return self.hashString(self.generateRandomString(length));
  };
};

exports.default = RandomString;
module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(13);
riot.tag2('startup', '', '', '', function (opts) {
  var self = this;
  if (self.opts.config) {
    self.config = self.opts.config;
  }
  self.nextTag = 'app';
  if (self.opts.nextTag) {
    self.nextTag = self.opts.nextTag;
  }
  self.loaded = false;
  self.on('mount', function () {
    riot.control.on('startup-tag-fetch-config-ack', self.onStartupTagFetchConfigAck);
    riot.control.trigger(riot.EVT.startupStore.in.fetchConfig, self.config, { evt: 'startup-tag-fetch-config-ack' });
  });

  self.on('unmount', function () {
    riot.control.off('startup-tag-fetch-config-ack', self.onStartupTagFetchConfigAck);
  });
  self.onStartupTagFetchConfigAck = function () {
    if (!self.loaded) {
      self.loaded = true;
      riot.control.off('startup-tag-fetch-config-ack', self.onStartupTagFetchConfigAck);
      riot.control.trigger(riot.EVT.startupStore.in.start, self.nextTag);
    }
  };
});

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_19__;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(13);

var _riotRoute = __webpack_require__(19);

var _riotRoute2 = _interopRequireDefault(_riotRoute);

var _riotcontrol = __webpack_require__(20);

var _riotcontrol2 = _interopRequireDefault(_riotcontrol);

var _randomString = __webpack_require__(17);

var _randomString2 = _interopRequireDefault(_randomString);

var _riotRouteExtension = __webpack_require__(15);

var _riotRouteExtension2 = _interopRequireDefault(_riotRouteExtension);

var _progressStore = __webpack_require__(3);

var _progressStore2 = _interopRequireDefault(_progressStore);

var _dynamicJscssLoader = __webpack_require__(1);

var _dynamicJscssLoader2 = _interopRequireDefault(_dynamicJscssLoader);

var _componentLoaderStore = __webpack_require__(2);

var _componentLoaderStore2 = _interopRequireDefault(_componentLoaderStore);

var _errorStore = __webpack_require__(7);

var _errorStore2 = _interopRequireDefault(_errorStore);

var _fetchStore = __webpack_require__(8);

var _fetchStore2 = _interopRequireDefault(_fetchStore);

var _localstorageStore = __webpack_require__(9);

var _localstorageStore2 = _interopRequireDefault(_localstorageStore);

var _riotcontrolStore = __webpack_require__(4);

var _riotcontrolStore2 = _interopRequireDefault(_riotcontrolStore);

var _routeStore = __webpack_require__(5);

var _routeStore2 = _interopRequireDefault(_routeStore);

var _pluginRegistrationStore = __webpack_require__(10);

var _pluginRegistrationStore2 = _interopRequireDefault(_pluginRegistrationStore);

var _startupStore = __webpack_require__(12);

var _startupStore2 = _interopRequireDefault(_startupStore);

var _riotcontrolDispatchStore = __webpack_require__(11);

var _riotcontrolDispatchStore2 = _interopRequireDefault(_riotcontrolDispatchStore);

var _masterEventTable = __webpack_require__(16);

var _masterEventTable2 = _interopRequireDefault(_masterEventTable);

__webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var P7HostCore = function () {
  function P7HostCore() {
    _classCallCheck(this, P7HostCore);

    this._masterEventTable = new _masterEventTable2.default();
    this._name = 'P7HostCore';
    window.riot = riot; // TODO: ask Zeke about this
    riot.route = _riotRoute2.default;
    riot.control = _riotcontrol2.default;
    riot.state = {};
  }

  P7HostCore.prototype.Initialize = function Initialize() {

    riot.routeState = {};

    var randomString = new _randomString2.default();
    var hash = randomString.randomHash();

    riot.state = {
      _internal: {
        hash: hash
      },
      error: { code: 'unknown' },
      route: {
        defaultRoute: 'main/home'
      }
    };
    this._riotRouteExtension = new _riotRouteExtension2.default();

    this._progressStore = new _progressStore2.default();
    this._dynamicJsCssLoader = new _dynamicJscssLoader2.default();
    this._componentLoaderStore = new _componentLoaderStore2.default(this._dynamicJsCssLoader);
    this._errorStore = new _errorStore2.default();
    this._fetchStore = new _fetchStore2.default();
    this._localStorageStore = new _localstorageStore2.default();
    this._riotControlStore = new _riotcontrolStore2.default();
    this._routeStore = new _routeStore2.default();
    this._pluginRegistrationStore = new _pluginRegistrationStore2.default(this._riotControlStore, this._dynamicJsCssLoader, this._componentLoaderStore);
    this._riotControlDispatchStore = new _riotcontrolDispatchStore2.default();
    this._startupStore = new _startupStore2.default();

    riot.control.addStore(this._progressStore);
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
  };

  _createClass(P7HostCore, [{
    key: 'name',
    get: function get() {
      return this._name;
    }
  }]);

  return P7HostCore;
}();

exports.default = P7HostCore;
module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=P7HostCore.js.map