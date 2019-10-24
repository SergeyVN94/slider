interface ISliderView {
    readonly _slider: JQuery;
    readonly _setting: SliderViewSetting;
}

interface SliderViewConfig {
    readonly orientation?: SliderOrientation;
    readonly selectMode?: SliderMode;
    readonly showValue?: boolean;
}

interface SliderViewSetting {
    orientation: SliderOrientation;
    selectMode: SliderMode;
    showValue: boolean;
}