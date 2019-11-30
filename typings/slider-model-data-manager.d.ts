interface SliderModelDataManager {
    getScale(): SliderScale;
    setScale(scale: SliderScale): void;

    getPointsPosition(): number[];
    setPointsPosition(positions: number[]): void;

    getStep(): number;
    setStep(step: number): void;

    getRange(): number;
    setRange(range: number): void;
}

interface SliderModelDataConfig {
    readonly scale: SliderScale;
    readonly range: number;
    readonly step: number;
    readonly start?: number[];
}
