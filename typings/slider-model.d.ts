type SliderModelStateData = {
    readonly mode: 'single',
    readonly pointPosition: number;
    readonly pointValue: string;
} | {
    readonly mode: 'range',
    readonly pointPosition: CoupleNum;
    readonly pointValue: CoupleStr;
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
    setState(state: SliderViewStateData): void;
    onChangeState(callback: SliderModelCallback): void;
    setStateThroughValue(value: number | string): void;
    setStateThroughValues(value: [number, number] | [string, string]): void;
    getValue(): string | CoupleStr;
    step(value?: number): number | void;
}