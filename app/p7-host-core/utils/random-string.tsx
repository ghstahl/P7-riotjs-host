export default class RandomString {
  constructor() {}

  generateRandomString(length:number) {
    if (length && length > 16) {
      length = 16;
    } else {
      length = 16;
    }

    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  hashString(str: string) {
    let hash = 5381;
    let i = str.length;

    while (i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
    }
/* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
* integers. Since we want the results to be always positive, convert the
* signed int to an unsigned by doing an unsigned bitshift. */
    return hash >>> 0;
  }

  randomHash(str: string) {
    return this.hashString(this.generateRandomString(length));
  }
}
