import {DeepFreeze, StoreBase} from '../../lib/P7HostCore.js';

class Constants {}
Constants.NAME = 'sidebar-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    sidebarAddItem: Constants.NAMESPACE + 'sidebar-add-item',
    sidebarRemoveItem: Constants.NAMESPACE + 'sidebar-remove-item'
  },
  out: {

  }
};
DeepFreeze.freeze(Constants);

export default class SidebarStore extends StoreBase {

  constructor() {
    super();
    riot.observable(this);
    this.state = riot.state.sidebar;
    this.itemsSet = new Set();

    this._loadFromState();
    this.riotHandlers = [
      {event: Constants.WELLKNOWN_EVENTS.in.sidebarAddItem, handler: this._onSidebarAddItem},
      {event: Constants.WELLKNOWN_EVENTS.in.sidebarRemoveItem, handler: this._onSidebarRemoveItem}
    ];
    this.bindEvents();
  }
  static get constants() {
    return Constants;
  }
  _commitToState() {
    this.state.items = Array.from(this.itemsSet);
    this.trigger(riot.EVT.routeStore.out.riotRouteDispatchAck);
  }

  _loadFromState() {
    for (let item of this.state.items) {
      this.itemsSet.add(item);
    }
  }

  _findItem(item) {
    for (let t of this.state.items) {
      if (t.title === item.title && t.view === item.view) {
        return t;
      }
    }
    return null;
  }

  _deleteItem(item) {
    for (let t of this.state.items) {
      if (t.title === item.title) {
        this.itemsSet.delete(t);
        break;
      }
    }
  }

  _onSidebarAddItem(item) {
    var t = this._findItem(item);

    if (t == null) {
      this.itemsSet.add(item);
      this._commitToState();
    }
  }

  _onSidebarRemoveItem(item) {
    this._deleteItem(item);
    this._commitToState();
  }

}
