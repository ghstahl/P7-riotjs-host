
const userCache = 'typicodeUserCache';

class Constants {}
Constants.NAME = 'download-manager-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    downloadManagerFetchResult: 'download-manager-fetch-result',
    downloadManagerFetch: 'download-manager-fetch',
    typicodeUserFetch: 'download-manager-fetch'
  },
  out: {
    downloadManagerChanged: 'download-managers-changed',
    typicodeUserChanged: 'download-manager-changed'
  }
};
window.P7HostCore.DeepFreeze.freeze(Constants);

export default class DownloadManagerStore extends window.P7HostCore.StoreBase {

  constructor() {
    super();
    riot.observable(this); // Riot provides our event emitter.
    this.name = 'TypicodeUserStore';
    riot.EVT.downloadManagerStore = Constants.WELLKNOWN_EVENTS;
    this.fetchException = null;
    this.riotHandlers = [
      {event: Constants.WELLKNOWN_EVENTS.in.downloadManagerFetch, handler: this._onDownloadManagerFetch},
      {event: Constants.WELLKNOWN_EVENTS.in.downloadManagerFetchResult, handler: this._onDownloadManagerFetchResult}
    ];
    this.bindEvents();

    riot.state.downloadManagerState = {};
    this.state = riot.state.downloadManagerState;
  }

  static get constants() {
    return Constants;
  }
  _onDownloadManagerFetch(query) {
    console.log(Constants.WELLKNOWN_EVENTS.in.downloadManagerFetch);
    let url = 'download-manager.json';
    let myAck = {
      evt: Constants.WELLKNOWN_EVENTS.in.downloadManagerFetchResult
    };

    if (query) {
      myAck.query = query;
    }

    riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, null, myAck);
  }
  _onDownloadManagerFetchResult(result, ack) {
    console.log(Constants.WELLKNOWN_EVENTS.in.downloadManagerFetchResult, result, ack);
    if (result.error == null && result.response.ok && result.json) {
          // good
      let data = result.json;

      this.state.data = data;
      let url = 'local://download/init-download';

      data.forEach(function (element) {
        riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, element, null);
      });

      this.trigger(Constants.WELLKNOWN_EVENTS.out.downloadManagerChanged);

    } else {
      this.state.data = [];
    }
  }
  _onTypicodeUserFetch(query) {
    console.log(riot.EVT.typicodeUserStore.in.typicodeUserFetch);
    let restoredSession = JSON.parse(localStorage.getItem(userCache));
    let blah = riot.Cookies.get('blah-blah-blah');
    let id = parseInt(query.id, 10);  // query.id is a string

    if (restoredSession) {
      let result = restoredSession.filter(function (obj) {
        let found = obj.id === id;

        return found;
      });

      if (result && result.length > 0) {
        this.trigger(riot.EVT.typicodeUserStore.out.typicodeUserChanged, result[0]);
      }
    } else {
            // need to fetch.
      let myQuery = {
        type: 'riotControlTrigger',
        evt: riot.EVT.typicodeUserStore.in.typicodeUserFetch,
        query: query,
        blah: blah
      };

      riot.control.trigger(riot.EVT.typicodeUserStore.in.typicodeUsersFetch, myQuery);
    }
  }
  /**
     * Reset tag attributes to hide the errors and cleaning the results list
     */
  _resetData() {
    this.fetchException = null;
  };

}

