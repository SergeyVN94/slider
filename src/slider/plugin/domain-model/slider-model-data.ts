export class SliderModelData implements ISliderModelData {
    private _step: number;
    private _value: number | [number, number];
    private _minMax: [number, number];
    private _customValues: number[] | string[];
    private _lengthValues: number;
    
    constructor(config: SliderModelDataConfig) {
        if (config.step <= 0) {
            throw "The step must be greater than zero";
        }

        this._step = config.step;
        this._value = config.value;
        this._minMax = config.minMax;
        this._customValues = config.customValues;
        this._lengthValues = config.lengthValues;
    }

    public getStep(): number {
        return this._step;
    }

    public setStep(step: number): void {
        if (step <= 0) {
            throw "The step must be greater than zero";
        }
        
        this._step = step;
    }

    public getValue(): number | [number, number] {
        return this._value;
    }

    public setValue(value: number | [number, number]): void {
        this._value = value;
    }

    public getMinMax(): [number, number] {
        return this._minMax;
    }

    public setMinMax(minMax: [number, number]): void {
        this._minMax = minMax;
    }

    public getCustomValues(): number[] | string[] {
        return this._customValues;
    }

    public setCustomValues(customValues: number[] | string[]): void {
        this._customValues = customValues;
    }

    public getLengthValues(): number {
        return this._lengthValues;
    }

    public setLengthValues(length: number): void {
        this._lengthValues = length;
    }
}