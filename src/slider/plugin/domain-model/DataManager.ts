class DataManager implements SliderModelDataManager {
    private _steps: number;
    private _scale: SliderScale;
    private _stepSize: number;
    private _pointSteps: number[];
    private _scaleType: 'string-array' | 'number-range';

    constructor(config: {
        stepSize: number;
        scale: SliderScale;
        steps: number;
        pointSteps: number[];
    }) {
        const {
            scale,
            steps,
            stepSize,
            pointSteps,
        } = config;

        this._scale = scale;
        this._steps = steps;
        this._stepSize = stepSize;
        this._pointSteps = pointSteps;
        this._scaleType = typeof scale[0] === 'string' ? 'string-array' : 'number-range';
    }

    public get stepSize(): number {
        return this._stepSize;
    }

    public set stepSize(step: number) {
        this._stepSize = step;
    }

    public get pointSteps(): number[] {
        return this._pointSteps;
    }

    public set pointSteps(steps: number[]) {
        this._pointSteps = steps;
    }

    public get scale(): SliderScale {
        return this._scale;
    }

    public set scale(scale: SliderScale) {
        this._scale = scale;
    }

    public get steps(): number {
        return this._steps;
    }

    public set steps(steps: number) {
        this._steps = steps;
    }

    public get scaleType(): 'string-array' | 'number-range' {
        return this._scaleType;
    }

    public set scaleType(type: 'string-array' | 'number-range') {
        this._scaleType = type;
    }
}

export default DataManager;
