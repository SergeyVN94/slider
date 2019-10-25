type SliderModelStateData = {
    readonly mode: SliderMode;
    readonly position: number | [number, number];
    readonly value: number | [number, number] | string | [string, string];
}

interface SliderModelConfig {
    readonly mode: SliderMode;
    readonly minMax: [number, number] | [string, string];
    readonly step?: number;
    readonly customValues?: number[] | string[];
}

interface ISliderModel {
    setState(state: SliderStateData): void;
    getState(): SliderModelStateData;
    setStateThroughValue(value: number | [number, number] | string | [string, string]): void;
    setStateThroughIndex(index: number | [number, number]): void;
}