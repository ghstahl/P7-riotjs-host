/**
 * Created by Herb on 9/27/2016.
 */
import DeepFreeze from '../utils/deep-freeze.js';
import StoreBase from './store-base.js';

class Constants {}
Constants.NAME = 'progress-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    inprogressDone: Constants.NAMESPACE + 'inprogress-done',
    inprogressStart: Constants.NAMESPACE + 'inprogress-start'
  },
  out: {
    progressStart: Constants.NAMESPACE + 'progress-start',
    progressCount: Constants.NAMESPACE + 'progress-count',
    progressDone: Constants.NAMESPACE + 'progress-done'
  }
};
DeepFreeze.freeze(Constants);

export default class ProgressStore extends StoreBase {
  static get constants() {
    return Constants;
  }
  constructor() {
    super();
    riot.observable(this);
    this._count = 0;
    this.riotHandlers = [
      {event: Constants.WELLKNOWN_EVENTS.in.inprogressStart, handler: this._onInProgressStart},
      {event: Constants.WELLKNOWN_EVENTS.in.inprogressDone, handler: this._onInProgressDone}
    ];
    this.bindEvents();
  }

  _onInProgressStart() {
    if (this._count === 0) {
      this.trigger(Constants.WELLKNOWN_EVENTS.out.progressStart);
    }
    ++this._count;
    this.trigger(Constants.WELLKNOWN_EVENTS.out.progressCount, this._count);
  }
  _onInProgressDone() {
    if (this.count === 0) {
            // very bad.
      console.error(Constants.WELLKNOWN_EVENTS.in.inprogressDone,
                'someone has their inprogress_done mismatched with thier inprogress_start');
    }
    if (this._count > 0) {
      --this._count;
    }
    this.trigger(Constants.WELLKNOWN_EVENTS.out.progressCount, this._count);
    if (this._count === 0) {
      this.trigger(Constants.WELLKNOWN_EVENTS.out.progressDone);
    }
  }

}

