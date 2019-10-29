interface OnSliderMouseEvent {
    (callback: SliderCallbackMouseEvent): void;
}

interface SliderViewDriver {
    getState(event: JQuery.Event): SliderViewStateData;
    update(state: SliderModelStateData): void;
    showValue(state?: boolean): boolean | void;
}

interface SliderViewDriverConfig {
    readonly selectMode: SliderMode;
    showValue: boolean;
    readonly prettify?: PrettifyFunc;
}

interface SliderViewDriverSetting {
    selectMode: SliderMode;
    showValue: boolean;
}