/**
 * Created by Herb on 9/27/2016.
 */
import DeepFreeze from './deep-freeze.js';
class Constants {}
Constants.NAME = 'progress-store';
Constants.NAMESPACE = Constants.NAME+':';
Constants.WELLKNOWN_EVENTS = {
    in:{
        inprogressDone:Constants.NAMESPACE+'inprogress-done',
        inprogressStart:Constants.NAMESPACE+'inprogress-start'
    },
    out:{
        progressStart:Constants.NAMESPACE+'progress-start',
        progressCount:Constants.NAMESPACE+'progress-count',
        progressDone:Constants.NAMESPACE+'progress-done'
    }
};
DeepFreeze.freeze(Constants);

class ProgressStore{
    static getConstants(){
        return Constants;
    }
    constructor(){
         riot.observable(this);
        this._count = 0;
        this._bound = false;
        this.bindEvents();
    }
    bindEvents(){
        if(this._bound == true){
            return;
        }
        this.on(Constants.WELLKNOWN_EVENTS.in.inprogressStart, this._onInProgressStart);
        this.on(Constants.WELLKNOWN_EVENTS.in.inprogressDone, this._onInProgressDone);
        this._bound = true;
    }
    unbindEvents(){
        if(this._bound == false){
            return;
        }
        this.off(Constants.WELLKNOWN_EVENTS.in.inprogressStart, this._onInProgressStart);
        this.off(Constants.WELLKNOWN_EVENTS.in.inprogressDone, this._onInProgressDone);
        this._bound = trfalseue;
    }
    _onInProgressStart() {
        if(this._count == 0){
            this.trigger(Constants.WELLKNOWN_EVENTS.out.progressStart)
        }
        ++this._count;
        this.trigger(Constants.WELLKNOWN_EVENTS.out.progressCount,this._count);
    }
    _onInProgressDone() {
        if(this.count == 0){
            // very bad.
            console.error(Constants.WELLKNOWN_EVENTS.in.inprogressDone,
                'someone has their inprogress_done mismatched with thier inprogress_start');
        }
        if(this._count > 0){
            --this._count;
        }
        this.trigger(Constants.WELLKNOWN_EVENTS.out.progressCount,this._count);
        if(this._count == 0){
            this.trigger(Constants.WELLKNOWN_EVENTS.out.progressDone)
        }
    }

}
export default ProgressStore;





