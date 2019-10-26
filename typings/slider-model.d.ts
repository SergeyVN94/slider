type SliderModelStateData = {
    readonly mode: SliderMode;
    readonly position: number | [number, number];
    readonly value: number | [number, number] | string | [string, string];
}

interface SliderModelConfig {
    readonly selectMode: SliderMode;
    readonly start?: number | [number, number];
    readonly scale: SliderScale;
    readonly step: number;
}

interface ISliderModel {
    setState(state: SliderStateData): void;
    getState(): SliderModelStateData;
    setStateThroughValue(value: number | [number, number]): void;
    setStateThroughIndex(index: number | [number, number]): void;
}