// https://github.com/substack/deep-freeze

export default class DeepFreeze {
  static freeze(o) {
    Object.freeze(o);
    Object.getOwnPropertyNames(o).forEach(function (prop) {
      if (o.hasOwnProperty(prop) &&
          o[prop] !== null &&
          (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
          !Object.isFrozen(o[prop])) {
        DeepFreeze.freeze(o[prop]);
      }
    }
    );
    return o;
  }
}

