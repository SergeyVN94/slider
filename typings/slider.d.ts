interface SliderSetting {
    readonly selector: string;
    orientation: string;
}

interface ISlider {
    readonly _slider: JQuery;
    _config: SliderSetting;
}