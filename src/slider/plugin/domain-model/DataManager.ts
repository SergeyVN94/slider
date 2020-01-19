class DataManager implements SliderModelDataManager {
    private _steps: number;
    private _scale: SliderScale;
    private _stepSize: number;
    private _pointSteps: number[];
    private _scaleType: string | number;

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
        this._scaleType = typeof scale[0];
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
        this._scaleType = typeof scale[0];
    }

    public get steps(): number {
        return this._steps;
    }

    public set steps(steps: number) {
        this._steps = steps;
    }

    public get scaleType(): number | string {
        return this._scaleType;
    }
}

export default DataManager;
