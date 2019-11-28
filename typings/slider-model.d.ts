type SliderModelPointsState = SliderPointState[];

interface SliderModelConfig {
    readonly selectMode: SliderMode;
    readonly start?: number | [number, number];
    readonly scale: SliderScale;
    readonly step: number;
}

type SliderModelUpdateEventCallback = (points: SliderModelPointsState) => void;

interface SliderModel {
    setState(state: SliderViewState): void;
    onChangeState(callback: SliderModelUpdateEventCallback): void;
    setStateThroughValue(value: number[] | string[]): void;
    getValue(): string[];
    step(value?: number): number | void;
}
