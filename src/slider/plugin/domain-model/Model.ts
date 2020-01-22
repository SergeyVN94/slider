import DataManager from './DataManager';
import {
    getAllSteps,
    valueToStep,
    updatePointSteps,
    updateStepSize,
    getModelValues,
    setModelValues,
    getPointStates,
} from './lib';

class Model implements SliderModel {
    private readonly _dataManager: SliderModelDataManager;
    private readonly _updateEventCallbackList: HandlerSliderModelUpdate[];

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

        this._dataManager = new DataManager({
            scale,
            pointSteps: [],
            stepSize,
            steps: getAllSteps(scale, stepSize),
        });

        const pointSteps: number[] = [];
        start.forEach((startValue: string | number): void => {
            pointSteps.push(
                valueToStep(startValue, this._dataManager)
            );
        });

        this._dataManager.pointSteps = pointSteps;

        this._updateEventCallbackList = [];
    }

    public update(state: SliderViewState): void {
        updatePointSteps(state, this._dataManager);
        this._toggleUpdateEvent();
    }

    public onUpdate(callback: HandlerSliderModelUpdate): void {
        this._updateEventCallbackList.push(callback);
    }

    public get step(): number {
        return this._dataManager.stepSize;
    }

    public set step(step: number) {
        const values = getModelValues(this._dataManager);
        updateStepSize(step, this._dataManager);
        this._dataManager.steps = getAllSteps(
            this._dataManager.scale,
            this._dataManager.stepSize
        );
        this.value = values;
        this._toggleUpdateEvent();
    }

    public get value(): string[] | number[] {
        return getModelValues(this._dataManager);
    }

    public set value(values: string[] | number[]) {
        setModelValues(values, this._dataManager);
        this._toggleUpdateEvent();
    }

    public getPointStates(): SliderPointState[] {
        return getPointStates(this._dataManager);
    }

    private _toggleUpdateEvent(): void {
        const pointStates = getPointStates(this._dataManager);

        this._updateEventCallbackList.forEach((callback) => {
            callback(pointStates);
        });
    }
}

export default Model;
