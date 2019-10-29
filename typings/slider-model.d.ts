type SliderModelStateData = {
    readonly mode: 'single',
    readonly pointPosition: number;
    readonly pointValue: number | string;
} | {
    readonly mode: 'range',
    readonly pointPosition: CoupleNum;
    readonly pointValue: CoupleNum | CoupleStr;
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
    getValue(): number | string | CoupleNum | CoupleStr;
}