export class SliderModelDataManager implements ISliderModelDataManager {
    private _rangeOfValues: number;
    private _scale: SliderScale;
    private _step: number;
    private _pointPosition: number | [number, number];

    constructor(config: SliderModelDataConfig) {
        this._scale = config.scale;
        this._rangeOfValues = config.rangeOfValues;
        this._step = config.step;
        this._pointPosition = 0;
    }

    public getStep(): number {
        return this._step;
    }

    public setStep(step: number): void {
        this._step = step;
    }

    public getPointPosition(): number | [number, number] {
        return this._pointPosition;
    }

    public setPointPosition(position: number | [number, number]): void {
        this._pointPosition = position;
    }

    public getScale(): SliderScale {
        return this._scale;
    }

    public setScale(scale: SliderScale): void {
        this._scale = scale;
    }

    public getRangeOfValues(): number {
        return this._rangeOfValues;
    }

    public setRangeOfValues(rangeOfValues: number): void {
        this._rangeOfValues = rangeOfValues;
    }
}