type SliderModelPointsState = SliderPointState[];

interface SliderModelConfig {
    readonly selectMode: SliderMode;
    readonly scale: SliderScale;
    readonly step: number;
}

type HandlerSliderModelUpdate = (points: SliderModelPointsState) => void;

interface SliderModel {
    step: number;
    value: string[] | number[];
    setState(state: SliderViewState): void;
    onUpdate(callback: HandlerSliderModelUpdate): void;
}
