import DataManager from './DataManager';
import {
    getModelValues,
    setModelValues,
    getPointStates,
} from './lib';
import DriverScaleNumberRange from './scale-drivers/DriverScaleNumberRange';
import DriverScaleStringArray from './scale-drivers/DriverScaleStringArray';
import Core from './Core';

class Model implements SliderModel, SliderModelStateManager {
    private readonly _dataManager: SliderModelDataManager;
    private readonly _updateEventCallbackList: HandlerSliderModelUpdate[];
    private readonly _scaleDriver: SliderScaleDriver;
    private readonly _core: SliderModelCore;

    constructor(config: {
        scale: [number, number] | string[];
        start: number[] | string[];
        step: number;
    }) {
        const {
            scale,
            start,
            step: stepSize,
        } = config;

        if (typeof scale[0] === 'number') {
            this._scaleDriver = new DriverScaleNumberRange();
        } else {
            this._scaleDriver = new DriverScaleStringArray();
        }

        this._dataManager = new DataManager({
            scale,
            pointSteps: [],
            stepSize,
            steps: this._scaleDriver.getAllSteps(scale, stepSize),
        });

        this._core = new Core();

        const pointSteps: number[] = [];
        start.forEach((startValue: string | number): void => {
            pointSteps.push(
                this._scaleDriver.valueToStep(startValue, this._dataManager)
            );
        });

        this._dataManager.pointSteps = pointSteps;

        this._updateEventCallbackList = [];
    }

    public update(state: SliderViewState): void {
        this._core.updatePointSteps(state, this._dataManager);
        this._toggleUpdateEvent();
    }

    public onUpdate(callback: HandlerSliderModelUpdate): void {
        this._updateEventCallbackList.push(callback);
    }

    public get step(): number {
        return this._dataManager.stepSize;
    }

    public set step(newStepSize: number) {
        const values = getModelValues(this._dataManager, this._scaleDriver);
        const { scale } = this._dataManager;

        if (this._scaleDriver.isCorrectStepSize(scale, newStepSize)) {
            this._dataManager.stepSize = newStepSize;
            this._dataManager.steps = this._scaleDriver.getAllSteps(scale, newStepSize);
            this.value = values;
            this._toggleUpdateEvent();
        }
    }

    public get value(): string[] | number[] {
        return getModelValues(this._dataManager, this._scaleDriver);
    }

    public set value(values: string[] | number[]) {
        setModelValues(values, this._dataManager, this._scaleDriver);
        this._toggleUpdateEvent();
    }

    public getPointStates(): SliderPointState[] {
        return getPointStates(this._dataManager, this._scaleDriver);
    }

    private _toggleUpdateEvent(): void {
        const pointStates = getPointStates(this._dataManager, this._scaleDriver);

        this._updateEventCallbackList.forEach((callback) => {
            callback(pointStates);
        });
    }
}

export default Model;
