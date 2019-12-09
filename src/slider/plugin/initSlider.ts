import Slider from './Slider';

const initSlider = function initSliderDomElement(this: JQuery, params: SliderConfig): void {
    const slider: Slider = new Slider(this, params);
    this.get()[0].slider = slider;
};

export default initSlider;
