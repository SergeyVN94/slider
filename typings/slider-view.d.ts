interface ISliderView {
    readonly _slider: JQuery;
    readonly _setting: SliderViewSetting;
}

interface SliderViewConfig {
    readonly orientation?: 'horizontal' | 'vertical';
    readonly selectMode?: 'single' | 'range';
    readonly showValue?: boolean;
}

interface SliderViewSetting {
    orientation: 'horizontal' | 'vertical';
    selectMode: 'single' | 'range';
    showValue: boolean;
}