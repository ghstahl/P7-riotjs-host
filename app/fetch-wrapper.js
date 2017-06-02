class Constants {}
Constants.FETCH = fetch;

export default class FetchWrapper {
  constructor() {
    let self = this;

    self._fetch = function (input, init) {
      return Constants.FETCH(input, init).then(response =>{

        return response;
      });
    };
    if (fetch) {
      window.fetch = self._fetch;
    }
  }

}

