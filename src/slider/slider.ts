import $ from 'jquery';
interface SliderConfig {
    readonly selector: string;
    orientation: string;
}

export interface ISlider {
    readonly _slider: JQuery;
    _config: SliderConfig;
}

export class Slider implements ISlider {
    readonly _slider: JQuery;
    _config: SliderConfig;

    constructor(options: SliderOptions) {
        this._config = {
            selector: options.selector,
            orientation: options.orientation || 'horizontal'
        };
        this._slider = $(options.selector);    
    }
}