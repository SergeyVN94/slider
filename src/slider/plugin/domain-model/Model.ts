import DataManager from './DataManager';
import {
    getAllSteps,
    valueToStep,
    updateModel,
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
            step,
        } = config;

        const pointSteps: number[] = [];
        start.forEach((startValue: string | number): void => {
            pointSteps.push(
                valueToStep(startValue, this._dataManager)
            );
        });

        this._dataManager = new DataManager({
            scale,
            pointSteps,
            stepSize: step,
            steps: getAllSteps(scale, step),
        });
        this._updateEventCallbackList = [];
    }

    public update(state: SliderViewState): void {
        updateModel(state, this._dataManager);
        this._toggleUpdateEvent();
    }

    public onUpdate(callback: HandlerSliderModelUpdate): void {
        this._updateEventCallbackList.push(callback);
    }

    public get step(): number {
        return this._dataManager.stepSize;
    }

    public set step(step: number) {
        updateStepSize(step, this._dataManager);
    }

    public get value(): string[] | number[] {
        return getModelValues(this._dataManager);
    }

    public set value(values: string[] | number[]) {
        setModelValues(values, this._dataManager);
    }

    private _toggleUpdateEvent(): void {
        const pointStates = getPointStates(this._dataManager);

        this._updateEventCallbackList.forEach((callback) => {
            callback(pointStates);
        });
    }
}

export default Model;
