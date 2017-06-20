import 'riot';
import './css/index.css';
import TypicodeUserStore 			from 	'./stores/typicode-user-store.js';
import RouteContributer 		from 	'./route-contributer.js';

let rcs = new RouteContributer();
let registerRecord = {
  name: 'typicode-component',
  stores: [
		{store: new TypicodeUserStore()}
  ],
  registrants: {
    routeContributer: rcs
  },
  postLoadEvents: [
		{event: 'typicode-init', data: {}}
  ]
};

if (window.RandomString) {
  let randomString = new window.RandomString();
  let hash = randomString.randomHash();

  window.hash = hash;
}

riot.control.trigger('plugin-registration', registerRecord);

