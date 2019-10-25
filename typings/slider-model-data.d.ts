interface ISliderModelData {
    getMinMax?(): [number, number];
    setMinMax?(minMax: [number, number]): void;

    getCustomValues?(): number[] | string[];
    setCustomValues?(values: number[] | string[]): void;

    getValue(): number | [number, number];
    setValue(value: number | [number, number]): void;

    getStep(): number;
    setStep(step: number): void;

    getLengthValues(): number;
    setLengthValues(length: number): void;
}


interface SliderModelDataConfig {
    minMax?: [number, number];
    step: number;
    customValues?: number[] | string[];
    value?: number | [number, number];
    lengthValues: number;
}