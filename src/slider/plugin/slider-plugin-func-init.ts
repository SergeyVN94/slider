import { Slider } from './slider';

const initSlider: SliderPluginFunctionInit = function(this: JQuery, params: SliderConfig): void {
    const slider: Slider = new Slider(this, params);
    this.get()[0].slider = slider;
};

export { initSlider };
