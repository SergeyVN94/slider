type SliderPointState = {
    readonly position: number;
    readonly value?: string;
    readonly name?: string;
};

type SliderViewState = {
    readonly targetPosition: number;
    readonly points: SliderPointState[];
    readonly pointSelected: 'min' | 'max' | null;
};

type SliderViewSelectEventCallback = (state: SliderViewState) => void;

interface SliderView {
    onSelect(callback: SliderViewSelectEventCallback): void;
    update(points: SliderModelPointsState): void;
    showTooltips(state?: boolean): boolean | void;
}

type SliderViewName = 'horizontal' | 'vertical';

interface SliderViewConfig {
    readonly $slider: JQuery;
    readonly viewName: SliderViewName;
    readonly selectMode: SliderMode;
    readonly showTooltips: boolean;
    readonly prettify: PrettifyFunc;
    readonly showBgLine: boolean;
}
