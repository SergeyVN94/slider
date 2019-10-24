interface OnMouseEvent {
    (callback: SliderCallbackMouseEvent): void;
}

interface SliderViewDriver {
    onMouseMove: OnMouseEvent;
}

interface SliderViewDriverConfig {
    readonly selectMode: SliderMode;
    readonly showValue: boolean;
}

interface SliderViewDriverSetting {
    selectMode: SliderMode;
    showValue: boolean;
}