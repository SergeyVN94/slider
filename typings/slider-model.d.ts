type SliderModelPointsState = SliderPointState[];

interface SliderModelConfig {
    readonly selectMode: SliderMode;
    readonly start?: number | [number, number];
    readonly scale: SliderScale;
    readonly step: number;
}

interface SliderModelCallback {
    (points: SliderModelPointsState): void;
}

interface ISliderModel {
    setState(state: SliderViewStateData): void;
    onChangeState(callback: SliderModelCallback): void;
    setStateThroughValue(value: number[] | string[]): void;
    getValue(): string[];
    step(value?: number): number | void;
}