
var namespace = 'P7HostCore';
riot.EVT = {
	app:{
		out:{
			appMount: 'app-mount',
			appUnmount: 'app-unmount'
		}
	},
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


riot.EVT.progressStore ={
    in:{
        inprogressDone:namespace+'inprogress-done',
        inprogressStart:namespace+'inprogress-start'
    },
    out:{
        progressStart:namespace+'progress-start',
        progressCount:namespace+'progress-count',
        progressDone:namespace+'progress-done'
    }
};

riot.EVT.routeStore ={
	in:{
		routeCatchallReset:'route-catchall-reset',
		routeDispatch:'riot-route-dispatch'
	},
	out:{
	  	riotRouteDispatchAck:'riot-route-dispatch-ack'
	}
};
riot.EVT.dynamicJsCssLoaderStore ={
    in:{
    	loadExternalJsCss:namespace + 'load-external-jscss',
    	unloadExternalJsCss:namespace + 'unload-external-jscss'
    },
    out:{
    	loadExternalJsCssAck:namespace + 'load-external-jscss-ack',
    	unloadExternalJsCssAck:namespace + 'unload-external-jscss-ack'
    }
};

riot.EVT.componentLoaderStore = { 
  in : {
    addDynamicComponent: 'add-dynamic-component',
    addDynamicComponents: 'add-dynamic-components',
    loadDynamicComponent: 'load-dynamic-component',
    unloadDynamicComponent: 'unload-dynamic-component',
    componentLoadComplete: 'component-load-complete',
    componentUnloadComplete:'component-unload-complete'
     
  },
  out: {
    allComponentsLoadComplete: 'all-components-load-complete',
    componentLoaderStoreStateUpdated: 'component-loader-store-state-updated',
    loadExternalJsCss: riot.EVT.dynamicJsCssLoaderStore.in.loadExternalJsCss,
    unloadExternalJsCss: riot.EVT.dynamicJsCssLoaderStore.in.unloadExternalJsCss
   
  }
};
riot.EVT.errorStore ={
    in:{
      errorCatchAll:namespace+'error-catch-all:'
    },
    out:{
     
    }
};
riot.EVT.fetchStore ={
    in:{
        fetch:namespace +'fetch'
    },
    out:{
        inprogressDone:riot.EVT.progressStore.in.inprogressDone,
        inprogressStart:riot.EVT.progressStore.in.inprogressStart
    }
};

riot.EVT.localStorageStore ={
    in:{
        localstorageSet:'localstorage-set',
        localstorageGet:'localstorage-get',
        localstorageRemove:'localstorage-remove',
        localstorageClear:'localstorage-clear'
    },
    out:{}
};