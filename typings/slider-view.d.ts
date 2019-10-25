type SliderStateData = {
    readonly mode: SliderMode;
    readonly targetValue: number;
    readonly position: number | [number, number];
}

interface SliderCallbackMouseEvent {
    (stateData: SliderStateData): void;
}

interface ISliderView {
    onMouseMove(callback: SliderCallbackMouseEvent): void;
}

type SliderViewName = 'horizontal' | 'vertical';

interface SliderViewConfig {
    readonly viewName?: SliderViewName;
    readonly selectMode?: SliderMode;
    readonly showValue?: boolean;
}