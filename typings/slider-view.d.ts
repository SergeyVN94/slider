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

interface SliderViewSelectEventCallback {
    (stateData: SliderViewStateData): void;
}

interface ISliderView {
    onSelect(callback: SliderViewSelectEventCallback): void;
    update(points: SliderModelPointsState): void;
    showTooltips(state?: boolean): boolean | void;
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