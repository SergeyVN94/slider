interface SliderModelDataManager {
    scale: SliderScale;
    pointPositions: number[];
    step: number;
    range: number;
}

interface SliderDataManagerConfig {
    readonly scale: SliderScale;
    readonly range: number;
    readonly step: number;
    readonly start?: number[];
}
