import {Slider} from './slider';

export const initSlider: SliderPluginFunctionInit = function(this: JQuery, params: SliderConfig): void {
    const slider: ISlider = new Slider(params);
    this.get()[0].slider = slider;
}