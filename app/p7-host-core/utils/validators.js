export default class Validator {
  static validateType(obj, type, name) {
    if (!obj) {
      throw new Error(name + ': is NULL');
    }
    if (!(obj instanceof type)) {
      throw new Error(name + ': is NOT of type:' + type.name);
    }
  }
}
