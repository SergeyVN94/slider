type SliderStateData = {
    mode: 'single';
    targetValue: number;
    position: number;
} | {
    mode: 'range';
    targetValue: number;
    positionMin: number; 
    positionMax: number;
}

interface SliderCallbackMouseEvent {
    (stateData: SliderStateData): void;
}

interface ISliderView {
    onMouseMove(callback: SliderCallbackMouseEvent): void;
}

interface SliderViewConfig {
    readonly orientation?: SliderOrientation;
    readonly selectMode?: SliderMode;
    readonly showValue?: boolean;
}