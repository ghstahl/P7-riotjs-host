 export default class StoreBase {
   constructor() {
     this._bound = false;
     this.riotHandlers = [];
   }
   static bindHandler(element, index, array) {
     this.on(element.event, element.handler);
   }
   static unbindHandler(element, index, array) {
     this.off(element.event, element.handler);
   }
   bindEvents() {
     if (this._bound === false) {
       this.riotHandlers.forEach(StoreBase.bindHandler, this);
       this._bound = !this._bound;
     }
   }
   unbindEvents() {
     if (this._bound === true) {
       this.riotHandlers.forEach(StoreBase.unbindHandler, this);
       this._bound = !this._bound;
     }
   }
}
