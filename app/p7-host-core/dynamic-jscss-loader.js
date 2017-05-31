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
import DeepFreeze from './utils/deep-freeze.js';

class Constants {}
Constants.NAME = 'dynamic-jscss-loader';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {

  },
  out: {

  }
};
DeepFreeze.freeze(Constants);

export default class DynamicJsCssLoader {

  static get constants() {
    return Constants;
  }

  constructor() {
    riot.observable(this);
    this._componentsAddedSet = new Set();
    this._bound = false;
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

  loadExternalJsCss(component) {
    let addedCompoment = this._findComponent(component);

    if (addedCompoment == null) {
      this._loadExternalJsCss(component);
      this._addComponent(component);
      console.log('load-external-jscss', component);
    } else {
      console.error('file already added!', component);
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

  _loadExternalJsCss(component) {
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
