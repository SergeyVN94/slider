class DataManager implements SliderModelDataManager {
    private _range: number;
    private _scale: SliderScale;
    private _step: number;
    private _pointPositions: number[];

    constructor(config: SliderDataManagerConfig) {
        this._scale = config.scale;
        this._range = config.range;
        this._step = config.step;
        this._pointPositions = [];
    }

    public get step(): number {
        return this._step;
    }

    public set step(step: number) {
        this._step = step;
    }

    public get pointPositions(): number[] {
        return this._pointPositions;
    }

    public set pointPositions(positions: number[]) {
        this._pointPositions = positions;
    }

    public get scale(): SliderScale {
        return this._scale;
    }

    public set scale(scale: SliderScale) {
        this._scale = scale;
    }

    public get range(): number {
        return this._range;
    }

    public set range(rangeOfValues: number) {
        this._range = rangeOfValues;
    }
}

export default DataManager;
