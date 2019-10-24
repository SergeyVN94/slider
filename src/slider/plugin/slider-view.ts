import $ from 'jquery';

export class SliderView implements ISliderView {
    readonly _slider: JQuery;
    readonly _setting: SliderViewSetting;

    constructor(slider: JQuery, config: SliderViewConfig) {
        this._slider = slider;
        this._setting = {
            orientation: config.orientation || 'horizontal',
            selectMode: config.selectMode || 'single',
            showValue: config.showValue === undefined ? true : config.showValue
        };
        console.log(this._setting);
        
    }
}