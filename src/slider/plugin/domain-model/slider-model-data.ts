class SliderModelDataManager implements SliderModelDataManager {
    private _range: number;
    private _scale: SliderScale;
    private _step: number;
    private _pointsPosition: number[];

    constructor(config: SliderModelDataConfig) {
        this._scale = config.scale;
        this._range = config.range;
        this._step = config.step;
        this._pointsPosition = [];
    }

    public getStep(): number {
        return this._step;
    }

    public setStep(step: number): void {
        this._step = step;
    }

    public getPointsPosition(): number[] {
        return this._pointsPosition;
    }

    public setPointsPosition(positions: number[]): void {
        this._pointsPosition = positions;
    }

    public getScale(): SliderScale {
        return this._scale;
    }

    public setScale(scale: SliderScale): void {
        this._scale = scale;
    }

    public getRange(): number {
        return this._range;
    }

    public setRange(rangeOfValues: number): void {
        this._range = rangeOfValues;
    }
}

export { SliderModelDataManager };
