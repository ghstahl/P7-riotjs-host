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
class DynamicJsCssLoaderStore{
	constructor(){
		var self = this;
		self.name = 'DynamicJsCssLoaderStore';
		self.namespace = self.name + ':';
		self._componentsAddedSet = new Set();
	}


	_addComponent(component){
		if(this._findComponent(component) == null){
			var mySet = this._componentsAddedSet;
			mySet.add(component)
			
		}
	}

	_findComponent(component){
	    var mySet = this._componentsAddedSet;
	    for (let item of mySet) {
	        if(item.key === component.key)
	          return item;
	    }
	    return null;
	  }

	_deleteComponent(component){
	    var mySet = this._componentsAddedSet;
	    for (let item of mySet) {
	        if(item.key === component.key){
	          mySet.delete(item);
	        	break;
	        }
	    }
	  }

	_safeLoadExternal(component){
		var addedCompoment = this._findComponent(component);
		if(addedCompoment == null){
			this._loadExternal(component);
			this._addComponent(component);
		    console.log('load-external-jscss',component);
		    riot.control.trigger(riot.EVT.dynamicJsCssLoaderStore.out.loadExternalJsCssAck, 
		    	{state:true,component:component});
	    }
	    else{
	    	console.error("file already added!",component);
		    riot.control.trigger(riot.EVT.dynamicJsCssLoaderStore.out.loadExternalJsCssAck, {
		    	state:false,
		    	component:component,
		    	error:"component already added!"});
	    }
	}
	_removeExternalByFile(filename,filetype){
		var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    	var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    	var allsuspects=document.getElementsByTagName(targetelement)
    	for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
		    if (	allsuspects[i] 
		    	&& 	allsuspects[i].getAttribute(targetattr)!=null 
		    	&& 	allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1){
		    	allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
				break;
	    	}     
	    }

	}
	_removeExternal(component){
		var addedCompoment = this._findComponent(component);
		if(addedCompoment == null){
			riot.control.trigger(riot.EVT.dynamicJsCssLoaderStore.out.unloadExternalJsCssAck, {
		    	state:false,
		    	component:component,
		    	error:"no entry found to remove!",});
		}else{
			var jsBundle = component.jsBundle;
			var cssBundle = component.cssBundle;
			if(jsBundle && jsBundle.path){
				this._removeExternalByFile(jsBundle.path,'js');
			}
			if(cssBundle && cssBundle.path){
				this._removeExternalByFile(cssBundle.path,'css');
			}
			
			this._deleteComponent(component);
			riot.control.trigger(riot.EVT.dynamicJsCssLoaderStore.out.unloadExternalJsCssAck, {
		    	state:true,
		    	component:component});

		}
	}

	_loadExternal(component){
		var jsBundle = component.jsBundle;
		var cssBundle = component.cssBundle;

		if(jsBundle && jsBundle.path){
	        var fileref=document.createElement('script');
	        fileref.setAttribute("type","text/javascript");
	        fileref.setAttribute("src", jsBundle.path);
	        if (typeof fileref!="undefined"){
	        	document.getElementsByTagName("head")[0].appendChild(fileref);
	    	}
		}
		if(cssBundle && cssBundle.path){
	        var fileref=document.createElement("link");
	        fileref.setAttribute("rel", "stylesheet");
	        fileref.setAttribute("type", "text/css");
	        fileref.setAttribute("href", cssBundle.path);
	        if (typeof fileref!="undefined"){
	        	document.getElementsByTagName("head")[0].appendChild(fileref);
	    	}
		}
	   
	}

  	bindEvents(){
  		var self = this;
  		riot.observable(self);
    	self.on(riot.EVT.dynamicJsCssLoaderStore.in.loadExternalJsCss,	self._safeLoadExternal);
    	self.on(riot.EVT.dynamicJsCssLoaderStore.in.unloadExternalJsCss,self._removeExternal);
    }
  
}
export default DynamicJsCssLoaderStore;