export default class RiotControlHelpers {

  static bindHandler(element, index, array) {
    this.on(element.event, element.handler);
  }
  static unbindHandler(element, index, array) {
    this.off(element.event, element.handler);
  }
  bindEvents() {
    if (this._bound === false) {
      this.riotHandlers.forEach(RiotControlHelpers.bindHandler, this);
      this._bound = !this._bound;
    }
  }
  unbindEvents() {
    if (this._bound === true) {
      this.riotHandlers.forEach(RiotControlHelpers.unbindHandler, this);
      this._bound = !this._bound;
    }
  }
}
