import $ from 'jquery';

export class SliderView implements ISliderView {
    readonly _slider: JQuery;
    readonly _setting: SliderViewSetting;

    constructor(slider: JQuery, config: SliderViewConfig) {
        this._slider = slider;
        this._setting = config as SliderViewSetting;
        console.log(this._setting);
        
    }
}