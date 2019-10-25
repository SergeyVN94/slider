type SliderModelStateData = {
    readonly mode: SliderMode;
    readonly position: number | [number, number];
    readonly value: number | [number, number] | string | [string, string];
}

interface SliderModelConfig {
    readonly selectMode: SliderMode;
    readonly minMax?: [number, number];
    readonly step?: number;
    readonly customValues?: number[] | string[];
    readonly value?: number | [number, number];
}

interface ISliderModel {
    setState(state: SliderStateData): void;
    getState(): SliderModelStateData;
    setStateThroughValue(value: number | [number, number] | string | [string, string]): void;
    setStateThroughIndex(index: number | [number, number]): void;
}