import 'riot';
import './css/index.css';
import DownloadManagerStore 			from 	'./stores/download-manager-store.js';
import RouteContributer 		from 	'./route-contributer.js';

let rcs = new RouteContributer();
let registerRecord = {
  name: 'download-manager',
  stores: [
		{store: new DownloadManagerStore()}
  ],
  registrants: {
    routeContributer: rcs
  },
  postLoadEvents: [
		{event: 'download-manager-init', data: {}}
  ]
};

if (window.RandomString) {
  let randomString = new window.RandomString();
  let hash = randomString.randomHash();

  window.hash = hash;
}

riot.control.trigger('plugin-registration', registerRecord);

