import $ from 'jquery';

export class Slider implements ISlider {
    readonly _slider: JQuery;
    _config: SliderSetting;

    constructor(config: SliderConfig) {
        this._config = {
            selector: config.selector,
            orientation: config.orientation || 'horizontal'
        };
        this._slider = config.slider ? config.slider : $(config.selector);    
    }
}