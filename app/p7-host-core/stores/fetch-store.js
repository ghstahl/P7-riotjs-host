/**
 * Created by Herb on 9/27/2016.
 */
import 'whatwg-fetch';
import DeepFreeze from '../utils/deep-freeze.js';
import ProgressStore from './progress-store.js';
import StoreBase from './store-base.js';

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

export default class FetchStore extends StoreBase {
  static get constants() {
    return Constants;
  }
  constructor() {
    super();
    riot.observable(this);
    this.riotHandlers = [
      {event: Constants.WELLKNOWN_EVENTS.in.fetch, handler: this._onFetch}
    ];
    this.bindEvents();
  }

  _onLocalFetch(input, ack) {
    console.log(Constants.WELLKNOWN_EVENTS.in.fetch, '_onLocalFetch', input, ack, window.boundAsync);
    if (window.boundAsync) {
      let result = { response: {}};

      window.boundAsync.fetchLocal(input).then(function (data) {
        result.json = JSON.parse(data);
        console.log(result.json);
        result.error = null;
        result.response.ok = true;
        riot.control.trigger(ack.evt, result, ack);
      });
    }
  }

  _onFetch(input, init, ack, antiforgery = null, jsonFixup = true) {
    console.log(Constants.WELLKNOWN_EVENTS.in.fetch, input, init, ack, jsonFixup);

    if (window.location.protocol === 'localfolder:' && !input.startsWith('http')) {
      this._onLocalFetch(input, ack);
      return;
    }
    riot.control.trigger(riot.EVT.fetchStore.out.inprogressStart);
    if (jsonFixup === true) {
      if (!antiforgery) {
        antiforgery = {
          cookieName: 'XSRF-TOKEN',
          headerName: 'X-XSRF-TOKEN'
        };
      }
      let token = riot.Cookies.get(antiforgery.cookieName);

      if (!init) {
        init = {};
      }
      if (!init.headers) {
        init.headers = {};
      }

      if (token) {
        init.headers[antiforgery.headerName] = token;
      }

      if (!init.credentials) {
        init.credentials = 'include';
      }
      // we are a json shop
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

