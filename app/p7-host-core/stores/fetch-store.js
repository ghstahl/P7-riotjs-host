/**
 * Created by Herb on 9/27/2016.
 */
import 'whatwg-fetch';
import DeepFreeze from '../utils/deep-freeze.js';
import ProgressStore from './progress-store.js';

const PSWKE = ProgressStore.constants.WELLKNOWN_EVENTS;

class Constants {}
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
DeepFreeze.freeze(Constants);

export default class FetchStore {
  static get constants() {
    return Constants;
  }
  constructor() {
    riot.observable(this);
    this._bound = false;
    this.bindEvents();
  }

  bindEvents() {
    if (this._bound === false) {
      this.on(Constants.WELLKNOWN_EVENTS.in.fetch, this._onFetch);
      this._bound = !this._bound;
    }

  }
  unbindEvents() {
    if (this._bound === true) {
      this.off(Constants.WELLKNOWN_EVENTS.in.fetch, this._onFetch);
      this._bound = !this._bound;
    }

  }

  _onFetch(input, init, ack, jsonFixup = true) {
    console.log(Constants.WELLKNOWN_EVENTS.in.fetch, input, init, ack, jsonFixup);

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
        let type = typeof (init.body);

        if (type === 'object') {
          init.body = JSON.stringify(init.body);
        }
      }
    }

 //   let myTrigger = JSON.parse(JSON.stringify(ack));

    fetch(input, init).then(function (response) {
      riot.control.trigger(riot.EVT.fetchStore.out.inprogressDone);
      let result = {response: response};

      if (response.status === 204) {
        result.error = 'Fire the person that returns this 204 garbage!';
        riot.control.trigger(ack.evt, result, ack);
      }
      if (response.ok) {
        if (init.method === 'HEAD') {
          riot.control.trigger(ack.evt, result, ack);
        } else {
          response.json().then((data)=>{
            console.log(data);
            result.json = data;
            result.error = null;
            riot.control.trigger(ack.evt, result, ack);
          });
        }
      } else {
        riot.control.trigger(ack.evt, result, ack);
      }
    }).catch(function (ex) {
      console.log('fetch failed', ex);
      self.error = ex;
            // todo: event out error to ack
      riot.control.trigger(riot.EVT.fetchStore.out.inprogressDone);
    });
  }
}

