import DeepFreeze from '../p7-host-core/utils/deep-freeze.js';

export default class SidebarStore {

  constructor() {
    riot.observable(this);
    this.name = 'SidebarStore';
    this.namespace = this.name + ':';
    riot.EVT.sidebarStore = {
      in: {
        sidebarAddItem: this.namespace + 'sidebar-add-item',
        sidebarRemoveItem: this.namespace + 'sidebar-remove-item'
      },
      out: {
        riotRouteDispatchAck: riot.EVT.routeStore.out.riotRouteDispatchAck
      }
    };

    this.state = riot.state.sidebar;
    this.itemsSet = new Set();

    this._loadFromState();
    this._bound = false;
    this.bindEvents();
  }

  _commitToState() {
    this.state.items = Array.from(this.itemsSet);
    this.trigger(riot.EVT.sidebarStore.out.riotRouteDispatchAck);
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

  bindEvents() {
    if (this._bound === false) {
      this.on(riot.EVT.sidebarStore.in.sidebarAddItem, this._onSidebarAddItem);
      this.on(riot.EVT.sidebarStore.in.sidebarRemoveItem, this._onSidebarRemoveItem);
      this._bound = !this._bound;
    }
  }

  unbindEvents() {
    if (this._bound === true) {
      this.off(riot.EVT.sidebarStore.in.sidebarAddItem, this._onSidebarAddItem);
      this.off(riot.EVT.sidebarStore.in.sidebarRemoveItem, this._onSidebarRemoveItem);
      this._bound = !this._bound;
    }
  }
}
