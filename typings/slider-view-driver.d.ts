type SliderStateData = {
    mode: 'single';
    position: number;
} | {
    mode: 'range';
    positionMin: number; 
    positionMax: number;
}

interface SliderCallbackMouseEvent {
    (event: MouseEvent, stateData: SliderStateData): void;
}

interface OnMouseEvent {
    (callback: SliderCallbackMouseEvent): void;
}

interface SliderViewDriver {
    _callback: SliderCallbackMouseEvent;
    onMouseEvent: OnMouseEvent;
    readonly _slider: JQuery;
}

interface SliderViewDriverConfig {
    readonly mode: SliderMode;
}