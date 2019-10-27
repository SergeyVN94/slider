interface ISliderModelDataManager {
    getScale(): SliderScale;
    setScale(scale: SliderScale): void;

    getPointPosition(): number | [number, number];
    setPointPosition(position: number | [number, number]): void;

    getStep(): number;
    setStep(step: number): void;

    getRangeOfValues(): number;
    setRangeOfValues(rangeOfValues: number): void;
}


interface SliderModelDataConfig {
    readonly scale: SliderScale;
    readonly rangeOfValues: number;
    readonly step: number;
    readonly start?: number | [number, number];
}