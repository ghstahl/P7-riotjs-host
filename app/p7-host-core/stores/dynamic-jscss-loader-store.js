// http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml

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
import DeepFreeze from '../utils/deep-freeze.js';

class Constants {}
Constants.NAME = 'dynamic-jscss-loader-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    loadExternalJsCss: Constants.NAMESPACE + 'load-external-jscss'
  },
  out: {
    loadExternalJsCssAck: Constants.NAMESPACE + 'load-external-jscss-ack'
  }
};
DeepFreeze.freeze(Constants);

export default class DynamicJsCssLoaderStore {

  static getConstants() {
    return Constants;
  }

  constructor() {
    riot.observable(this);
    this._componentsAddedSet = new Set();
    this._bound = false;
    this.bindEvents();
  }

  bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.loadExternalJsCss,	this._onLoadExternalJsCss);
     
      this._bound = !this._bound;
    }
  }
  unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.loadExternalJsCss,	this._onLoadExternalJsCss);
      this._bound = !this._bound;
    }
  }
  _addComponent(component) {
    if (this._findComponent(component) == null) {
      let mySet = this._componentsAddedSet;

      mySet.add(component);

    }
  }

  _findComponent(component) {
    let mySet = this._componentsAddedSet;

    for (let item of mySet) {
      if (item.key === component.key) {return item;}
    }
    return null;
  }

  _deleteComponent(component) {
    let mySet = this._componentsAddedSet;

    for (let item of mySet) {
      if (item.key === component.key) {
        mySet.delete(item);
        break;
      }
    }
  }

  _onLoadExternalJsCss(component) {
    let addedCompoment = this._findComponent(component);

    if (addedCompoment == null) {
      this._loadExternal(component);
      this._addComponent(component);
      console.log('load-external-jscss', component);
      riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.loadExternalJsCssAck,
		{state: true, component: component});
    } else {
      console.error('file already added!', component);
      riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.loadExternalJsCssAck, {
        state: false,
        component: component,
        error: 'component already added!'});
    }
  }

  _removeExternalByFile(filename, filetype) {
    // determine element type to create nodelist from
    let targetelement = (filetype === 'js') ? 'script' : (filetype === 'css') ? 'link' : 'none';
    // determine corresponding attribute to test for
    let targetattr = (filetype === 'js') ? 'src' : (filetype === 'css') ? 'href' : 'none';
    let allsuspects = document.getElementsByTagName(targetelement);

    for (let i = allsuspects.length; i >= 0; i--) { // search backwards within nodelist for matching elements to remove
      if (allsuspects[i] 	&&
        allsuspects[i].getAttribute(targetattr) != null 	&&
        allsuspects[i].getAttribute(targetattr).indexOf(filename) !== -1) {
        allsuspects[i].parentNode.removeChild(allsuspects[i]); // remove element by calling parentNode.removeChild()
        break;
      }
    }

  }
  unloadExternalJsCss(component) {
    let addedCompoment = this._findComponent(component);

    if (addedCompoment != null) {
      let jsBundle = component.jsBundle;
      let cssBundle = component.cssBundle;

      if (jsBundle && jsBundle.path) {
        this._removeExternalByFile(jsBundle.path, 'js');
      }
      if (cssBundle && cssBundle.path) {
        this._removeExternalByFile(cssBundle.path, 'css');
      }
      this._deleteComponent(component);
    }
  }

  _loadExternal(component) {
    let jsBundle = component.jsBundle;
    let cssBundle = component.cssBundle;

    if (jsBundle && jsBundle.path) {
      let fileref = document.createElement('script');

      fileref.setAttribute('type', 'text/javascript');
      fileref.setAttribute('src', jsBundle.path);
      if (typeof fileref !== 'undefined') {
        document.getElementsByTagName('head')[0].appendChild(fileref);
      }
    }
    if (cssBundle && cssBundle.path) {
      let fileref = document.createElement('link');

      fileref.setAttribute('rel', 'stylesheet');
      fileref.setAttribute('type', 'text/css');
      fileref.setAttribute('href', cssBundle.path);
      if (typeof fileref !== 'undefined') {
        document.getElementsByTagName('head')[0].appendChild(fileref);
      }
    }

  }

}
