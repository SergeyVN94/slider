type SliderViewStateData = {
    readonly mode: 'single';
    readonly targetPosition: number;
    readonly pointPosition: number;
    readonly pointSelected?: 'min' | 'max' | null;
} | {
    readonly mode: 'range';
    readonly targetPosition: number;
    readonly pointPosition: CoupleNum;
    readonly pointSelected: 'min' | 'max' | null;
}

interface SliderCallbackMouseEvent {
    (stateData: SliderViewStateData): void;
}

interface ISliderView {
    onMouseMove(callback: SliderCallbackMouseEvent): void;
    update(state: SliderModelStateData): void;
    showValue(state?: boolean): boolean | void;
}

type SliderViewName = 'horizontal' | 'vertical';

interface SliderViewConfig {
    readonly viewName: SliderViewName;
    readonly selectMode: SliderMode;
    readonly showValue: boolean;
    readonly prettify?: PrettifyFunc;
}