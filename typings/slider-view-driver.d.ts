interface OnSliderMouseEvent {
    (callback: SliderCallbackMouseEvent): void;
}

interface SliderViewDriver {
    onMouseMove: OnSliderMouseEvent;
}

interface SliderViewDriverConfig {
    readonly selectMode: SliderMode;
    readonly showValue: boolean;
}

interface SliderViewDriverSetting {
    selectMode: SliderMode;
    showValue: boolean;
}