type SliderModelStateData = {
    readonly pointPosition: number | [number, number];
    readonly pointValue: number | [number, number] | string | [string, string];
}

interface SliderModelConfig {
    readonly selectMode: SliderMode;
    readonly start?: number | [number, number];
    readonly scale: SliderScale;
    readonly step: number;
}

interface SliderModelCallback {
    (state: SliderModelStateData): void;
}

interface ISliderModel {
    setState(state: SliderStateData): void;
    onChangeState(callback: SliderModelCallback): void;
    setStateThroughValue(value: number | string): void;
    setStateThroughValues(value: [number, number] | [string, string]): void;
}