interface ISliderView {
    readonly _slider: JQuery;
    readonly _setting: SliderViewSetting;
}

interface SliderViewConfig {
    readonly orientation?: 'horizontal' | 'vertical';
    readonly selectMode?: 'single' | 'range';
    readonly showValue?: boolean;
}

type sliderMode = 'single' | 'range';

interface SliderViewSetting {
    orientation: 'horizontal' | 'vertical';
    selectMode: sliderMode;
    showValue: boolean;
}