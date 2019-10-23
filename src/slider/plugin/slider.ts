import $ from 'jquery';
import {SliderView} from './slider-view';
import {SliderPresenter} from './slider-presenter';

export class Slider implements ISlider {
    readonly _slider: JQuery;
    _setting: SliderSetting;
    readonly _presenter: ISliderPresenter;

    constructor(config: SliderConfig) {
        this._setting = {
            selector: config.selector || ''
        };

        this._slider = config.slider ? config.slider : $(config.selector);
        
        const view: ISliderView = new SliderView(this._slider, {
            orientation: config.orientation || 'horizontal',
            selectMode: config.selectMode || 'single',
            showValue: config.showValue || true
        });
        
        this._presenter = new SliderPresenter(view);
    }
}