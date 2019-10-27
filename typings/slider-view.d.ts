type SliderStateData = {
    readonly targetPosition: number;
    readonly pointPosition: number | [number, number];
}

interface SliderCallbackMouseEvent {
    (stateData: SliderStateData): void;
}

interface ISliderView {
    onMouseMove(callback: SliderCallbackMouseEvent): void;
    update(state: SliderModelStateData): void;
}

type SliderViewName = 'horizontal' | 'vertical';

interface SliderViewConfig {
    readonly viewName: SliderViewName;
    readonly selectMode: SliderMode;
    readonly showValue: boolean;
}