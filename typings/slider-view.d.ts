type SliderPointState = {
    readonly position: number;
    readonly value?: string;
    readonly name?: string;
};

type SliderViewStateData = {
    readonly targetPosition: number;
    readonly points: SliderPointState[];
    readonly pointSelected: 'min' | 'max' | null;
}

interface SliderCallbackMouseEvent {
    (stateData: SliderViewStateData): void;
}

interface ISliderView {
    onMouseMove(callback: SliderCallbackMouseEvent): void;
    update(points: SliderModelPointsState): void;
    showValue(state?: boolean): boolean | void;
}

type SliderViewName = 'horizontal' | 'vertical';

interface SliderViewConfig {
    readonly viewName: SliderViewName;
    readonly selectMode: SliderMode;
    readonly showValue: boolean;
    readonly prettify?: PrettifyFunc;
    readonly showBgLine: boolean;
    readonly showScale: boolean;
    readonly scale: SliderScale;
}