/**
 * Created by Herb on 9/27/2016.
 */
import DeepFreeze from './deep-freeze.js';
import 'whatwg-fetch';
import ProgressStore from './progress-store.js';

const PSWKE = ProgressStore.getConstants().WELLKNOWN_EVENTS;

class Constants {}
Constants.NAME = 'fetch-store';
Constants.NAMESPACE = Constants.NAME+':';
Constants.WELLKNOWN_EVENTS = {
    in:{
        fetch : Constants.NAMESPACE +'fetch'
    },
    out:{
        inprogressDone:PSWKE.in.inprogressDone,
        inprogressStart:PSWKE.in.inprogressStart
    }
};
DeepFreeze.freeze(Constants);

class FetchStore{
    static getConstants(){
        return Constants;
    }
    constructor(){
        riot.observable(this);
        this._bound = false;
        this.bindEvents();
    }

    bindEvents(){
        if(this._bound == true){
            return;
        }
        this.on(Constants.WELLKNOWN_EVENTS.in.fetch, this._onFetch);
        this._bound = true;
    }
    unbindEvents(){
        if(this._bound == false){
            return;
        }
        this.off(Constants.WELLKNOWN_EVENTS.in.fetch, this._onFetch);
        this._bound = false;
    }

    _onFetch(input,init,trigger,jsonFixup = true) {
        console.log(Constants.WELLKNOWN_EVENTS.in.fetch,input,init,trigger,jsonFixup);

        // we are a json shop

        riot.control.trigger(riot.EVT.fetchStore.out.inprogressStart);
        if(jsonFixup == true){
            if(!init){
                init = {}
            }

            if(!init.credentials){
                init.credentials = 'include'
            }

            if(!init.headers){
                init.headers = {}
            }

            if(!init.headers['Content-Type']){
                init.headers['Content-Type'] = 'application/json'
            }
            if(!init.headers['Accept']){
                init.headers['Accept'] = 'application/json'
            }

            if(init.body){
                let type = typeof(init.body)
                if(type === 'object'){
                    init.body = JSON.stringify(init.body)
                }
            }
        }

        let myTrigger = JSON.parse(JSON.stringify(trigger));

        fetch(input,init).then(function (response) {
            riot.control.trigger(riot.EVT.fetchStore.out.inprogressDone);
            let result = {response:response};
            if(response.status == 204){
                result.error = 'Fire the person that returns this 204 garbage!';
                riot.control.trigger(myTrigger.name,result,myTrigger);
            }
            if(response.ok){
                if(init.method == 'HEAD'){
                    riot.control.trigger(myTrigger.name,result,myTrigger);
                }else{
                    response.json().then((data)=>{
                        console.log(data);
                        result.json = data;
                        result.error = null;
                        riot.control.trigger(myTrigger.name,result,myTrigger);
                    });
                }
            }else{
                riot.control.trigger(myTrigger.name,result,myTrigger);
            }
        }).catch(function(ex) {
            console.log('fetch failed', ex)
            self.error = ex;
            //todo: event out error to mytrigger
            riot.control.trigger(riot.EVT.fetchStore.out.inprogressDone);
        });
    }
}
export default FetchStore;


 



