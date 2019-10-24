import $ from 'jquery';
import {SliderView} from './slider-view';
import {SliderPresenter} from './slider-presenter';

export class Slider implements ISlider {
    _setting: SliderSetting;
    readonly _presenter: ISliderPresenter;

    constructor(slider: JQuery, config: SliderConfig) {
        this._setting = {};
        
        const view: ISliderView = new SliderView(slider, {
            orientation: config.orientation,
            selectMode: config.selectMode,
            showValue: config.showValue
        });
        
        this._presenter = new SliderPresenter(view);
    }
}