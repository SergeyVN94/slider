interface OnSliderMouseEvent {
    (callback: SliderCallbackMouseEvent): void;
}

interface SliderViewDriver {
    getState(event: JQuery.Event): SliderStateData;
    update(state: SliderModelStateData): void;
}

interface SliderViewDriverConfig {
    readonly selectMode: SliderMode;
    readonly showValue: boolean;
}

interface SliderViewDriverSetting {
    selectMode: SliderMode;
    showValue: boolean;
}